<template>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12">
        <card class="card" title="Create Task">
          <div>
            <form @submit.prevent>
              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Title"
                            placeholder="Title"
                            v-model="task.title"
                            v-validate="'required'"
                            :class="{
                              '': true,
                              'is-invalid': errors.has('title')
                            }"
                            name="title"
                            >
                  </fg-input>
                   <span class="error" v-if="errors.has('title')">
                      {{errors.first("title")}}
                  </span>
                </div>
                <div class="col-md-6">
                  <fg-input type="number"
                            label="Max Marks"
                            placeholder="Max Marks"
                            v-model="task.max_marks"
                            v-validate="'required'"
                             :class="{
                              '': true,
                              'is-invalid': errors.has('max_marks')
                            }"
                            name="max_marks"
                            >
                  </fg-input>
                  <span class="error" v-if="errors.has('max_marks')">
                      {{errors.first("max_marks")}}
                  </span>
                </div>
              </div>

              <div class="row">
                
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="control-label">
                      Due Date
                    </label> 
                    <Datepicker  v-model="task.due_date"  :format="customFormatter" 
                    :disabled-dates="disabledDates" input-class="form-control" 
                    key="end_date" placeholder="End Date" :required="true"/>
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="control-label">Class</label> 
                  <v-select v-model="task.class" label="name"  :options="classes"
                    placeholder="please select a class"
                  />
                </div>

              </div>
              
              <div class="form-group">
                <label for="">Upload Document</label>
                <input type="file" id="fileid"
                  ref="file" 
                  v-on:change="handleFileUpload()"
                >
                <button class="btn btn-primary btn-sm" v-if="task.media" @click="removeMedia()">Remove</button>
              </div>
                <!-- accept=".csv" -->

  
              <div class="text-right">
                <button class="btn btn-primary" type="info"
                          round
                          @click.native.prevent="createTask">
                    {{this.isLoading ? 'Creating...': 'Create Task'}}
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
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import ErrorsFunction from '../../../components/lib/errors'

export default {
 components: {
    Datepicker
  },
  data() {
    return {
      task: {
        title: "",
        description:"",
        max_marks: "",
        due_date:  moment().format('YYYY-MM-DD') + "T00:00:00.000Z",
        class: null,
        file: "",
        status: 1,
        media: null
      },
       classes: [],
      isLoading: false,
       disabledDates: {
        to: new Date()
      },
    };
  },

  mounted() {
    this.classesList()
  },

  methods: {
    async createTask() {
      try {
        if (this.isLoading) {
          return
        }
        let validate = await this.$validator.validateAll()

         if(!validate){
          return  
        }
          if(!this.task.class){
          this.$swal({
          title: "warning",
          icon: 'warning',
          text: "Please select a class"
        })
          return
        }

        this.task.class_id = this.task.class.id
        let formData = new FormData();

        if(this.task.media){
          formData.append('file', this.task.media);
        }

        formData.append('class_id', this.task.class.id);
        formData.append('title', this.task.title)
        formData.append('max_marks', this.task.max_marks)
        formData.append('due_date', JSON.stringify(this.task.due_date))
        
        this.isLoading = true
        let res = await this.$axios.post('/task/create', 
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        this.$swal({
          title: "Success",
          icon: 'success',
          text: "Successfully created"
        })

        this.isLoading = false
        
        this.$router.push('/tasks-list')
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
        console.log(error);
        
      }
    },

    async removeMedia(){

      this.task.media = null 
      this.$refs.file.value = ''

    },

     handleFileUpload(){
       try {
          this.task.media = this.$refs.file.files[0]
          
       }
         
        catch (error) {
          console.log(error)
       }

     },

    customFormatter(date) {
      return moment(date).format('DD/MM/YYYY');
    },


  }

};
</script>
<style>
</style>
