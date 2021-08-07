<template>
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <card class="card-user">
          <div slot="image">
            <img src="@/assets/img/background.jpg" alt="...">
          </div>
          <div>
            <div class="author">
              <img class="avatar border-white" :src="this.imageUrl ? this.imageUrl : ' https://cameeto.s3.us-east-2.amazonaws.com/task/8/face-2.jpg'" alt="...">
               <input type="file" id="fileid"
                  ref="file" 
                  accept="image/x-png,image/gif,image/jpeg"
                  v-on:change="handleFileUpload()"
                >
              <h4 class="title">{{authUser.name}}
                <br>
                <a href="#">
                  <small>@{{authUser.username}}</small>
                </a>
              </h4>
            </div>
           
          </div>
          <hr>
          <div class="text-center">
            <div class="row">
              <div v-for="(info, index) in details" :key="index" :class="getClasses(index)">
                <h5>{{info.title}}
                  <br>
                  <small>{{info.subTitle}}</small>
                </h5>
              </div>
            </div>
          </div>
        </card>
          
      </div>
      <div class="col-xl-8 col-lg-7 col-md-6">
       <card class="card" title="Edit Profile">
        <div>
          <form @submit.prevent>

            <div class="row">
              <div class="col-md-6">
                <fg-input type="text"
                          label="Name"
                          :disabled="true"
                          placeholder="Name"
                          v-model="authUser.name">
                </fg-input>
              </div>
              <div class="col-md-6">
                <fg-input type="text"
                          label="Username"
                          :disabled="true"
                          placeholder="Username"
                          v-model="authUser.username">
                </fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <fg-input type="text"
                          label="Email"
                          :disabled="true"
                          placeholder="Email"
                          v-model="authUser.email"
                          >
                </fg-input>
              </div>
              <div class="col-md-6">
                <fg-input type="text"
                          label="Mobile"
                          :disabled="true"
                          placeholder="mobile"
                          v-model="authUser.mobile">
                </fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <fg-input type="text"
                          label="Organization Name"
                          :disabled="true"
                          placeholder="Organization Name"
                          v-model="profile.organization_name">
                </fg-input>
              </div>
              <div class="col-md-6">
                <fg-input type="number"
                  label="Alternate Mobile"
                  placeholder="alternate mobile"
                  name="mobile"
                  v-model="profile.contact_no"
                  v-validate="{ required: true, min: 10, max: 10, numeric: true }"
                  @input="onlyNumber('contact_no')"
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
            </div>

            <div class="row">

              <div class="col-md-6">
                <fg-input type="text"
                    label="Alternate Email"
                    :disabled="false"
                    placeholder="alternate email"
                    v-model="profile.email"
                    v-validate="'required|email'"
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

               <div class="col-md-6">
                <fg-input type="text"
                    label="Address"
                    :disabled="false"
                    placeholder="address"
                    v-model="profile.location">
                </fg-input>
              </div>

            </div>
            
            <div class="text-center">
              <p-button type="info"
                        round
                        @click.native.prevent="updateProfile">
                {{!this.isFetching ? 'Update Profile' : 'Updating...'}}
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
import EditProfileForm from "~/components/UserProfile/EditProfileForm.vue";
import UserCard from "~/components/UserProfile/UserCard.vue";
import MembersCard from "~/components/UserProfile/MembersCard.vue";
import ErrorsFunction from '~/components/lib/errors'

export default {
  components: {
    EditProfileForm,
    UserCard,
    MembersCard
  },

  async mounted(){
    try {

      let profileData = await this.$axios.post('/organization/profile/details')

      if(profileData.data.data){
        this.profile = profileData.data.data
      }

      this.imageUrl = this.authUser.avatar

       let res = await this.$axios.post('/dashboard/count' , {
          teachercount: 1,
          studentcount: 1,
          classcount: 1,
          taskcount: 1
      })

      this.details[0].title = res.data.data._studentcount
      this.details[1].title = res.data.data._teachercount
      this.details[2].title = res.data.data._classcount

      
    } catch (error) {
        console.log(error);
      
    }
  },

  data() {
    return {
      details: [
        {
          title: "0",
          subTitle: "Students"
        },
        {
          title: "0",
          subTitle: "Teachers"
        },
        {
          title: "0",
          subTitle: "Classes"
        }
      ],

      user: {
        company: "Paper Dashboard",
        username: "michael23",
        email: "",
        lastName: "Faker",
        address: "Melbourne, Australia",
        city: "melbourne",
        postalCode: "",
        aboutMe: `Oh so, your weak rhyme. You doubt I'll bother, reading into it.I'll probably won't, left to my own devicesBut that's the difference in our opinions.`
      },
      authUser: this.$auth.user,
      profile:{
        contact_no: '',
        email: '',
        location: '',
        organization_name:'',
        media: null
      },
      isFetching:false,
      imageUrl: null
      
    };
  },

  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    },

     handleFileUpload(){
       try {
          this.profile.media = this.$refs.file.files[0]
          this.imageUrl = URL.createObjectURL(this.profile.media)
       }
         
        catch (error) {
          console.log(error)
       }

     },

    async updateProfile() {

      try {
        let validate = await this.$validator.validateAll()
        if(!validate){
          return  
        }

        if(this.isFetching){
          return
        }

        this.isFetching = true

        let formData = new FormData();

        if(this.profile.media){
          formData.append('file', this.profile.media);
        }

        formData.append('contact_no', this.profile.contact_no);
        formData.append('email', this.profile.email);
        formData.append('location', this.profile.location);

        let _update = await this.$axios.post('/organization/profile/update' , formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
          }
        })

        this.$swal({
          title: "Success",
          icon: 'success',
          text: "Profile updated"
        })
        
        this.isFetching = false
        
      } catch (error) {
        console.log(error)
         this.$swal({
          title: "Oops!",
          icon: 'error',
          text: ErrorsFunction(error.response.data)
        })
        this.isFetching = false
      }

    },

    onlyNumber(_key) {
        
       if(this.profile[_key].length > 10){
          this.profile[_key] = this.profile[_key].slice(0, 10);
       }
    },
  }

};
</script>
<style>
</style>
