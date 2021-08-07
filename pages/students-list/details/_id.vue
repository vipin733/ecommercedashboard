<template>
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6">
        
        <card class="card-user">
          <div slot="image">
            <img src="@/assets/img/background.jpg" alt="...">
          </div>
          <div>
            <div class="author">
              <img class="avatar border-white" :src="getAvatar(user.avatar)" alt="...">
              <h4 class="title">{{user.name}}
                <br>
                <a href="#">
                  <small>@{{user.username}}</small>
                </a>
              </h4>
            </div>
            <p class="description text-center">
              "I like the way you work it
              <br> No diggity
              <br> I wanna bag it up"
            </p>
          </div>
          <hr>
          <div class="text-center">
            <div class="row">

              <div :class="getClasses(0)">
                <h5>Task
                  <br>
                  <small>0</small>
                </h5>
              </div>

              <div :class="getClasses(1)">
                <h5>Classes
                  <br>
                  <small>0</small>
                </h5>
              </div>

              <div :class="getClasses(2)">
                <h5>Grade
                  <br>
                  <small>0</small>
                </h5>
              </div>

            </div>
          </div>
        </card>

      </div>
      <div class="col-xl-8 col-lg-7 col-md-6">
        <card class="card" title="Edit Profile">
          <div>
            <form @submit.prevent v-if="user.userProfile">

              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Name"
                            placeholder="Name"
                            v-model="user.name"
                            :aria-disabled="true">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Email"
                            placeholder="Email"
                            v-model="user.email">
                  </fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Mobile"
                            placeholder="Mobile"
                            v-model="user.mobile">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Username"
                            placeholder="Username"
                            v-model="user.username">
                  </fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Address"
                            placeholder="Address"
                            v-model="user.userProfile.address">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Emergency Contact No"
                            placeholder="Emergency Contact No"
                            v-model="user.userProfile.emergency_contact_no">
                  </fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Father name"
                            placeholder="Father name"
                            v-model="user.userProfile.father_name">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Mother name"
                            placeholder="Mother name"
                            v-model="user.userProfile.mother_name">
                  </fg-input>
                </div>
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
export default {

  components: {
    EditProfileForm,
    UserCard,
    MembersCard
  },

  data() {
    return {
      user: {
       
      }
    }
  },

  methods: {
    async getStudent(){
      try {
        let id    = this.$route.params.id
        let res   = await this.$axios.post('/student/organization/profile', {id})
        
        this.user = res.data.data
      } catch (error) {
        
      }
    },

    getAvatar(url) {
      if (url) {
        return url.file_path
      }
      return "@/assets/img/faces/face-2.jpg";
    },

    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    }

  },

  mounted(){
    this.getStudent()
  }

};
</script>
<style>
</style>
