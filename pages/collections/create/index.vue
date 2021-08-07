<template>
  <div class="row">
    <div class="col-xl-12 col-lg-12 col-md-12">
      <card class="card" title="Create">
        <div>
          <form @submit.prevent>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <fg-input type="text" label="Title" placeholder="Title" v-model="data.title"></fg-input>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Description</label>
                  <quill-editor
                    ref="myQuillEditor"
                    v-model="data.description"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                  />
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group" v-if="!show_image">
                <label class="control-label">Image</label>
                <input
                  aria-describedby="addon-right addon-left"
                  class="form-control"
                  type="file"
                  accept="image/*"
                  @change="onFileChange"
                />
              </div>

              <div class="form-group" v-else>
                <img :src="show_image" alt="">
                 <p-button
                  type="info"
                  round
                  @click.native.prevent="show_image = null; data.file = null;"
                >Remove</p-button>
              </div>

            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label class="control-label">Published ?</label>
                <input
                  aria-describedby="addon-right addon-left"
                  class="form-control"
                  v-model="data.status"
                  type="checkbox"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label class="control-label">Cameeto ?</label>
                <input
                  aria-describedby="addon-right addon-left"
                  class="form-control"
                  v-model="data.is_cameeto"
                  type="checkbox"
                />
              </div>
            </div>

            <div class="text-center">
              <p-button
                type="info"
                round
                @click.native.prevent="createCollection"
              >{{this.isLoading ? 'Creating...': 'Create Blog'}}</p-button>
            </div>

            <div class="clearfix"></div>
          </form>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import appType from '~/components/lib/AppType'

export default {
  data() {
    return {
      data: {
        title: "",
        description: "",
         is_cameeto: true,
        status: false
      },
      editorOption: {
        // Some Quill options...
      },
      show_image: null,
      file: null,
      file_name: null,
      isLoading: false
    };
  },
  methods: {
    async createCollection(status) {
      try {
        if (this.isLoading) {
          return;
        }
        this.data.status = this.data.status ? 2 : 1
        this.data.app_type = this.data.is_cameeto ? appType.Cameeto : appType.CraftingCode

        this.isLoading = true
        
        let formData = new FormData()
        formData.append('title', this.data.title)
        formData.append('description', this.data.description)
        formData.append('status', this.data.status)
        formData.append('app_type', this.data.app_type)


        if (this.file) {
          formData.append('file', this.file, this.file_name)
        }

        let res = await this.$axios.post("/collection/create", formData);
        this.$swal({
          title: "Success",
          icon: "success",
          text: "Successfully created"
        });

        this.$router.push("/collections");
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "Oops!",
          icon: "error",
          text: "Server error"
        });
        this.isLoading = false;
      }
    },

    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files
      let vim = this
      for (let i = 0; i < files.length; i++) {
        ;(function(file) {
          let name = file.name
          let reader = new FileReader()
          vim.file = file
          vim.file_name = name
          reader.onload = function(data) {
            vim.show_image = data.target.result
          }
          reader.readAsDataURL(file)
        })(files[i])
      }
    },

    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.data.description = html;
    }
  },

  mounted() {
    if (this.$auth.user.role_id != 4) {
      this.$router.push("/");
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>
<style>
</style>
