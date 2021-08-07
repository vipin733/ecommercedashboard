<template>
  <div class="k-content k-grid__item k-grid__item--fluid k-grid k-grid--hor" id="k_content">
    <div class="k-content__head k-grid__item">
      <div class="k-content__head-main">
        <h3 class="k-content__head-title">Policies</h3>
        <div class="k-content__head-breadcrumbs">
          <nuxt-link to="/clients" class="k-content__head-breadcrumb-home">
            <i class="flaticon2-shelter"></i>
          </nuxt-link>
          <span class="k-content__head-breadcrumb-separator"></span>
          <span class="k-content__head-breadcrumb-link">Add New</span>
        </div>
      </div>
      <div class="k-content__head-toolbar">
        <div class="k-content__head-wrapper"></div>
      </div>
    </div>
    <TeacherForm
     v-if="!isFetching"
      actionType="create"
      :propData="client"
      :issuedata="issues"
      v-on:formStatus="formStatusMethod($event)"
      v-on:success="successMethod($event)"
    />
  </div>
</template>

<script>
import axios from "axios";
import TeacherForm from "~/components/main/forms/teacher";
export default {
//   layout: "auth-master",
//   middleware: "userRoleMiddleware",
  components: {
    TeacherForm
  },
  mounted() {
    this.getClients();
  },

  data() {
    return {
      client: {},
      isFetching: true,
      issues: []
    };
  },

  methods: {
    formStatusMethod(status) {
      console.log(status);
    },

    successMethod(status) {
      this.$swal("Success", "Policy created successfully", "success");
      /* .then(
        resp => {
          this.$router.push({ name: "policies" });
        }
      ); */
      console.log(status);
    },
    async getClients() {
      this.isFetching = true;
    //   let issueData = await this.$axios.get("admin/issue/all");

    //   this.issues = issueData.data.datas;

      this.isFetching = false;
    }
  }
};
</script>
