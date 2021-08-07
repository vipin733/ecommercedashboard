<template>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12">
        <card class="card" title="Update Student">
          <div>
            <form @submit.prevent>
              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Name"
                             name="name"
                            placeholder="Name"
                            v-model="user.name"
                            v-validate="'required'"
                            :class="{
                              '': true,
                              'is-invalid': errors.has('name')
                            }"
                            >
                   
                  </fg-input>
                   <span class="error" v-if="errors.has('name')">
                      {{errors.first("name")}}
                    </span>
                
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Email"
                            placeholder="Email"
                             v-validate="'required|email'"
                            v-model="user.email"
                            name="email"
                            :class="{
                              '': true,
                              'is-invalid': errors.has('email')
                            }"
                            >
                  </fg-input>
                  <span class="error" v-if="errors.has('email')">
                    {{errors.first("email")}}
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fg-input type="number"
                            label="Mobile"
                            name="mobile"
                            placeholder="Mobile"
                            v-validate="{ required: true, min: 10, max: 10, numeric: true }"
                            v-model="user.mobile"
                             @input="onlyNumber('mobile')"
                             :class="{
                              '': true,
                              'is-invalid': errors.has('mobile')
                            }"
                            >
                  </fg-input>
                   <span class="error" v-if="errors.has('mobile')">
                      enter a valid phone number with 10 digits
                      </span>
                </div>
                <div class="col-md-6">
                  <fg-input type="number"
                            name="contact_no"
                            label="Emergency Contact No"
                            v-validate="{ required: true, min: 10, max: 10, numeric: true }"
                            @input="onlyNumber('emergency_contact_no')"
                            placeholder="Emergency Contact No"
                            v-model="user.emergency_contact_no"
                             :class="{
                              '': true,
                              'is-invalid': errors.has('contact_no')
                            }"
                            >
                  </fg-input>
                    <span class="error" v-if="errors.has('contact_no')">
                      enter a valid Contact number with 10 digits
                      </span>
                </div>
              </div>


              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            name="FatherName"
                            label="Father Name"
                            placeholder="Father Name"
                            v-validate="'required'"
                            v-model="user.father_name"
                             :class="{
                              '': true,
                              'is-invalid': errors.has('FatherName')
                            }"
                            >

                      
                  </fg-input>
                  <span class="error" v-if="errors.has('FatherName')">
                      {{errors.first("FatherName")}}
                  </span>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                            name="MotherName"
                            label="Mother Name"
                            v-validate="'required'"
                            placeholder="Mother Name"
                            v-model="user.mother_name"
                             :class="{
                              '': true,
                              'is-invalid': errors.has('MotherName')
                            }"
                            >
                  </fg-input>
                   <span class="error" v-if="errors.has('MotherName')">
                      {{errors.first("MotherName")}}
                      </span>
                </div>
              </div>

              <div class="row">

                <div 
                  :key="dropdown"
                  class="col-md-6">
                  <label class="control-label">Class</label> 
                  <v-select v-model="user.class" label="name" 
                    placeholder="Please select a class"
                   :options="classes" 
                   @input="setSelected($event)" 
                   />
                </div>

                <div class="col-md-6">
                  <fg-input type="text"
                            label="Address"
                            name="Address"
                            placeholder="Address"
                            v-model="user.address"
                             :class="{
                              '': true,
                              'is-invalid': errors.has('Address')
                            }"
                            v-validate="'required'"

                            >
                     
                  </fg-input>

                   <span class="error" v-if="errors.has('Address')">
                      {{errors.first("Address")}}
                      </span>
                </div>

              </div>

              <br>
              <br>


              <div class="text-center">
                <p-button type="info"
                          round
                          @click.native.prevent="updateStudent">
                    {{this.isLoading ? 'Updating...': 'Update Student'}}
                </p-button>
              </div>
              <div class="clearfix"></div>
            </form>
          </div>
        </card>

      </div>
    </div>
</template>
<script>
import ErrorsFunction from '../../../components/lib/errors'

export default {

  data() {
    return {
      user: {
        mobile: "",
        name:"",
        email: "",
        class: null,
        emergency_contact_no: "",
        father_name: "",
        mother_name: "",
        class_id: "",
        address:""
      },
      classes: [],
      isLoading: false,
      dropdown:1
    }
  },
  methods: {
    
    async updateStudent() {
      try {
        if (this.isLoading) {
          return
        }

        let validate = await this.$validator.validateAll()
        if(!validate){
          return  
        }
         if(!this.user.class){
          this.$swal({
          title: "warning",
          icon: 'warning',
          text: "Please select a class"
        })
          return
        }
        this.user.class_id = this.user.class.id
        this.isLoading = true
        let res = await this.$axios.post('/student/update', this.user)
        this.$swal({
          title: "Success",
          icon: 'success',
          text: "Successfully Updated"
        })
        
        this.$router.push('/students-list')
      } catch (error) {
         this.$swal({
          title: "Oops!",
          icon: 'error',
          text: ErrorsFunction(error.response.data)
        })
        this.isLoading = false
      }
    },

    async classesDetail() {
      try {
        let res = await this.$axios.post('/student/detail' , {
          student_id: this.$router.currentRoute.params.id
        })

        this.user = res.data.data
        this.user.mobile = res.data.data.contact_no
        this.user.name = res.data.data.student_name

        if(res.data.data.class_id){

          this.user.class = this.classes.find(element => element.id  ==  res.data.data.class_id)          
        }          
      } catch (error) {
          console.log(error);
      }
    },
    onlyNumber(_key) {
        
       if(this.user[_key].length > 10){
          this.user[_key] = this.user[_key].slice(0, 10);
       }
    },

    setSelected($event) {
      this.dropdown++
    }
  },

  async  mounted(){

    let res = await this.$axios.post('/class/organization/classes')
    this.classes = res.data.datas
    this.classesDetail()
  }

};
</script>
<style>
</style>
