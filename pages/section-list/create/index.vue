<template>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12">
        <card class="card" title="Create Section">
          <div>
            <form @submit.prevent>
              <div class="row">
                <div class="col-md-12">
                  <fg-input type="text"
                            label="Name"
                            placeholder="Name"
                            v-model="section.name"
                             v-validate="'required'"
                            :class="{
                              '': true,
                              'is-invalid': errors.has('name')
                            }"
                            name="name"
                            >
                  </fg-input>
                  <span class="error" v-if="errors.has('name')">
                      {{errors.first("name")}}
                  </span>
                </div>
              </div>

               <div class="row">
                <div class="col-md-12">
                  <fg-input type="text"
                            label="Description"
                            placeholder="Description"
                            v-model="section.description"
                            v-validate="'required'"
                            name="Description"
                            :class="{
                              '': true,
                              'is-invalid': errors.has('Description')
                            }">
                  </fg-input>
                   <span class="error" v-if="errors.has('Description')">
                      {{errors.first("Description")}}
                  </span>
                </div>
              </div>
              <br>
              <br>

              <div class="text-center">
                <p-button type="info"
                          round
                          @click.native.prevent="createSection">
                    {{ isLoading ? 'Creating...': 'Create Section' }}
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
      section: {
        name:"",
        description: ""
      },
      isLoading: false
    }
  },
  methods: {

    async createSection() {
      try {
        if (this.isLoading) {
          return
        }

        let validate = await this.$validator.validateAll()
        if(!validate){
          return  
        }
        this.isLoading = true
        let res = await this.$axios.post('section/create', this.section)
        this.$swal({
          title: "Success",
          icon: 'success',
          text: "Successfully created"
        })
        // console.log(this.$router)
        
        this.$router.push('/section-list')
      } catch (error) {
        console.log(error)
        
        this.$swal({
          title: "Oops!",
          icon: 'error',
          text: ErrorsFunction(error.response.data)
        })
        this.isLoading = false
      }
    }

  }

};
</script>
<style>
</style>
