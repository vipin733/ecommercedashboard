<template>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12">
        <card class="card" title="Create Teacher">
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
                      Enter a valid phone number with 10 digits
                  </span>
                </div>
                <div class="col-md-6">
                  <label class="control-label">Class</label> 
                  <v-select v-model="user.class" label="name"  :options="classes"
                  placeholder="Please select a class"
                  />
                </div>
              </div>
              <div class="text-right">
                <button class="btn btn-primary" type="info"
                          round
                          @click.native.prevent="createTeacher">
                    {{this.isLoading ? 'Creating...': 'Create Teacher'}}
                </button>
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
        class_id: "",
        
      },
      classes: [],
      isLoading: false
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
        let res = await this.$axios.post('/teacher/create', this.user)
        this.$swal({
          title: "Success",
          icon: 'success',
          text: "Successfully created"
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
     onlyNumber(_key) {
        
       if(this.user[_key].length > 10){
          this.user[_key] = this.user[_key].slice(0, 10);
       }
    },
  },

  mounted(){
    this.classesList()
  }

};
</script>
<style>
</style>
