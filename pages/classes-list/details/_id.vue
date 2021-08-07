<template>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12">
        <card class="card" title="Classes List">
          <div>
            <form @submit.prevent>
              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Name"
                            placeholder="Name"
                            v-model="user.name">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            v-model="user.email">
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
  }
};
</script>
<style>
</style>
