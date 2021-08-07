<template>
  <!--begin::Portlet-->
  <div  class="k-portlet">
    <div class="k-portlet__head k-portlet__head--lg">
      <div class="k-portlet__head-label">
        <h3 class="k-portlet__head-title"></h3>
      </div>
      <div class="k-portlet__head-toolbar">
        <div>
          <button type="button" class="btn btn-primary" @click="saveData()">
            <i class="la la-check"></i>
            {{ this.actionType }}
          </button>
        </div>
      </div>
    </div>
        <div class="form-group row">
          <div class="col-lg-6 col-md-6">
            <div class="form-group">
              <label>
                <span class="text-danger">*</span>Name
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter title here"
                v-validate="'required'"
                maxlength="50"
                :class="{
                  'form-control': true,
                  'is-invalid': errors.has('title')
                }"
                v-model="allData.name"
                @change="trimValue(allData.name, 'title')"
              />

               <span class="error" v-if="errors.has('title')">
                {{
                errors.first("title")
                }}
              </span>
                
             
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="form-group">
              <label>
                <span class="text-danger">*</span>Description
              </label>
              <textarea
                type="text"
                name="description"
                v-model="allData.description"
                placeholder="enter card description"
                v-validate="'required'"
                maxlength="150"
                @change="trimValue(allData.description, 'description')"
                :class="{
                  'form-control': true,
                }"
              />
               
            </div>
          </div>
          <!-- <div class="col-lg-6 col-md-6">
            <div class="form-group">
              <label>Select Issue</label>
              <Clients
                label="Issue"
                placeHolderLabel="Select Issue"
                :multiple="true"
                :propData="allData.issues"
                @updatedCategories="allData.issues = $event"
                inputId="issue_select"
                :dropdown="issuedata"
              ></Clients>
            </div>
          </div> -->
        </div>
      <!-- </div> -->
    <!-- </form> -->
    <!--end::Form-->
  </div>

  <!--end::Portlet-->
</template>

<script>
import Vue from "vue";

// import VeeValidate from "vee-validate";
// import swal from "sweetalert2";
// import VueTimepicker from 'vue2-timepicker'
// import Multiselect from 'vue-multiselect'
import moment from "moment";
// import errorsFunction from '../../../components/lib/errors.js'
// import PublishStatus from '../../lib/PublishStatus.js'
// import Versions from '../versionlist.vue'
// import Editor from "~/components/inputs/editor.vue";
// import DateTab from '../../inputs/startup-date.vue'
// import DateTab from "~/components/inputs/date";
// import { log } from "util";
// import Clients from "~/components/inputs/multiselect.vue";
// import Datepicker from "vuejs-datepicker";
// import MediaList from "../../inputs/image.vue";

// layout: "master",
  // import SeoTags from '../../inputs/seo.vue'
  // import MediaList from '../../inputs/image.vue'
  // import TimeTab from '../../inputs/time.vue'
  // import CategoryTab from '../../inputs/categories.vue'
  // import TagsTab from '../../inputs/tags.vue'
  // import LocationTab from '../../inputs/location.vue'
  // import SubmitForm from '../submitForm.vue'

//   Vue.use(VeeValidate);
export default {
  props: [
    "actionType",
    "blogData",
    "actionUrl",
    "collectionType",
    "clientdata",
    "campaigndata",
    "issuedata"
  ],
//   components: {
//     Editor,
//     // SeoTags,
//     // MediaList,
//     // Versions,
//     DateTab,
//     Clients,
//     Datepicker,
//     MediaList
//     // TimeTab,
//     // CategoryTab,
//     // TagsTab,
//     // LocationTab,
//     // SubmitForm
//   },
  mounted() {
    if (this.actionType == "update") {
      this.getEditData();
    } else {
      this.isFetching = false;
    }
  },

  data() {
    return {
      user: this.$auth.user,
      allData: {
        description: "",
        name: "",
        issues: []
      },
      versions: [],
      status: [
        {
          id: 1,
          name: "Active"
        },
        {
          id: 0,
          name: "Inactive"
        }
      ],
      //   status: PublishStatus,
      categories: [],
      tags: [],
      isFormSubmiting: false,
      isFetching: true,
      errorMessage: "",
      tabKey: 1
    };
  },

  methods: {
    updateClient() {
      if (this.clients && this.clients.length > 0) {
        this.allData.client_id = this.clients[0].id;
      }
      setTimeout(this.saveData(), 5000);
    },

    trimValue(str, modelName) {
      this.allData[modelName] = str.trim();
      return;
    },

    saveData() {
      
      this.$validator.validateAll().then(() => {
        if (!this.$validator.errors.items.length) {
          //  return
          var methodType =
            this.actionType == "update" ? this.$axios.patch : this.$axios.post;

          methodType("" + this.actionType, this.allData)
            .then(res => {
              // this.$swal('Success' , 'successfully' + this.actionType , 'success')
              this.$emit("success");
            })
            .catch(errors => {
              this.errorMessage = errorsFunction(errors.response.data)
                this.$swal.fire("Message", this.errorMessage, "error");
            });
        }
      });
    },

   


    // saveData(blogStatus) {
    //   if (this.isFormSubmiting) {
    //     return
    //   }
    //   this.allData.status = blogStatus
    //   this.$validator.validateAll().then(result => {
    //     if (result) {
    //       this.isFormSubmiting = true
    //       var methodType =
    //         this.actionType == 'edit' ? this.$axios.patch : this.$axios.post // checking if this component for edit payee then select axios method
    //       methodType(this.actionUrl, this.allData)
    //         .then(response => {
    //           this.isFormSubmiting = false
    //           this.$emit('success', true) // emiting parent component form success status
    //         })
    //         .catch(errors => {
    //           this.isFormSubmiting = false
    //         //   this.errorMessage = errorsFunction(errors.response)
    //           swal('error', this.errorMessage, 'error')
    //         })
    //     }
    //   })
    // },

    getEditData() {
      this.allData = { ...this.blogData };
      // this.allData = { ...this.allData , content: this.blogData.saved_content.content}
      // console.log(this.allData)

      // this.allData.title = this.blogData.saved_content.title
      // this.allData.content = this.blogData.saved_content.content
      // this.allData.highlights = this.blogData.saved_content.highlights
      // this.allData.highlights = this.blogData.saved_content.highlights
      // this.allData.highlights = this.blogData.saved_content.highlights
      // this.allData.highlights = this.blogData.saved_content.highlights

      // this.allData.author_name = this.blogData.saved_content.author_name
      // this.allData.featured_video = this.blogData.saved_content.featured_video
      // this.allData.categories = this.blogData.saved_content.categories
      // this.allData.status = this.blogData.saved_content.status
      // this.allData.featured_image = this.blogData.saved_content.featured_image

      // console.log(this.allData);

      // if (this.blogData.seos) {

      // } else {
      // this.allData.meta = {}
      // }

      // this.versions = this.blogData.versions

      this.isFetching = false;
    },

    updateForm(data) {
      this.allData = { ...data };
      // this.allData.content = data.content
      // this.allData.author_name = data.author_name
      // this.allData.is_featured = data.is_featured
      // this.allData.is_recommended = data.is_recommended
      // this.allData.date = data.date
      // this.allData.featured_video = data.featured_video
      // this.allData.categories = data.categories
      // this.allData.tags = data.tags
      // this.allData.status = data.status
      // this.allData.featured_image = data.featured_image
      // this.allData.meta = data.meta
    },

    saveLocation(loc) {
      this.allData.location = loc.location;
      this.allData.state = loc.state;
      this.allData.country = loc.country;
    },

    getFullscreen() {
      if (
        $("#panel-fullscreen")
          .children("i")
          .hasClass("fa fa-expand")
      ) {
        $("#panel-fullscreen")
          .children("i")
          .removeClass("fa fa-expand");
        $("#panel-fullscreen")
          .children("i")
          .addClass("fa fa-expand-arrows-alt");
      } else if (
        $("#panel-fullscreen")
          .children("i")
          .hasClass("fa fa-expand-arrows-alt")
      ) {
        $("#panel-fullscreen")
          .children("i")
          .removeClass("fa fa-expand-arrows-alt");
        $("#panel-fullscreen")
          .children("i")
          .addClass("fa fa-expand");
      }
      $("#panel-fullscreen")
        .closest(".panelFullscreenDiv")
        .toggleClass("panel-fullscreen");
    },

    successfullySubmitted(data) {
      this.$emit("success", true);
    }
  }
};
</script>

<style scoped>
.btn-secondary {
  color: #212529;
  background: transparent;
  border: 1px solid #e1e1ef;
}
.btn-secondary:focus,
.btn-secondary:active {
  color: #212529 !important;
}
</style>
