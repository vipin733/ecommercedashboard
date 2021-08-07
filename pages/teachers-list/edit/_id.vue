<template>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12">
        <card class="card" title="Update Teacher">
          <div>
            <form @submit.prevent>
              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Name"
                            placeholder="Name"
                            v-model="user.name"
                            v-validate="'required'"
                            name="name"
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
                            name="email"
                            :class="{
                              '': true,
                              'is-invalid': errors.has('email')
                            }"
                            v-model="user.email">
                  </fg-input>
                   <span class="error" v-if="errors.has('email')">
                    {{errors.first("email")}}
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Mobile"
                            placeholder="Mobile"
                            name="mobile"
                            v-model="user.mobile"
                             v-validate="{ required: true, min: 10, max: 10, numeric: true }"
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
                  <label class="control-label">Class</label> 
                  <v-select v-model="user.class" label="name"  :options="classes"
                  placeholder="Please select a class" :key="dropdown"
                  @input="setSelected($event)" 
                  />
                </div>
              </div>
              <br>
              <div class="text-center">
                <p-button type="info"
                          round
                          @click.native.prevent="createTeacher">
                    {{this.isLoading ? 'Updating...': 'Update Teacher'}}
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
        class: {},
        class_id: "",
      },
      classes: [],
      isLoading: false,
      dropdown: 1
    }
  },
  methods: {
    
    async createTeacher() {
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
        let res = await this.$axios.post('/teacher/update', this.user)
        this.$swal({
          title: "Success",
          icon: 'success',
          text: "Successfully updated"
        })
        
        this.$router.push('/teachers-list')
      } catch (error) {
        console.log(error)
        this.$swal({
          title: "Oops!",
          icon: 'error',
          text: ErrorsFunction(error.response.data)
        })
        this.isLoading = false
      }
    },

    async classesList() {
      try {
        let res = await this.$axios.post('/class/organization/classes')
        this.classes = res.data.datas
      } catch (error) {
        
      }
    },
    async teacherDetail() {
      try {
        let res = await this.$axios.post('/teacher/detail' , {
          id: this.$router.currentRoute.params.id
        })

        this.user = res.data.data

        this.user.mobile = res.data.data.contact_no

        if(res.data.data.class_id){

          this.user.class = this.classes.find(element => element.id  ==  res.data.data.class_id)
        }          
      } catch (error) {
          console.log(error);
      }
    },

     setSelected($event) {
      this.dropdown++
    },

    onlyNumber(_key) {
        
       if(this.user[_key].length > 10){
          this.user[_key] = this.user[_key].slice(0, 10);
       }
    },
  },

  async mounted(){
    await this.classesList()
    await this.teacherDetail()
  }

};
</script>
<style>
</style>
