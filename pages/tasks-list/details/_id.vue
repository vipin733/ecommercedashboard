<template>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12">
         <card class="card" title="Task Details">
          <div>
            <form @submit.prevent>

              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Title"
                            placeholder="Title"
                            v-model="task.title"
                            disabled>
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Max Marks"
                            placeholder="Max Marks"
                            v-model="task.max_marks"
                            disabled>
                  </fg-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Due Date"
                            placeholder="Due Date"
                           :value="_moment(task.due_date)"
                            disabled>
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                            label="Class Name"
                            placeholder="Class Name"
                            v-model="task.class_name"
                            disabled>
                  </fg-input>
                </div>
              </div>

              <div class="text-center">
                <p-button type="info"
                          round
                          @click.native.prevent="_push">
                    Students Submissions
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

import moment from 'moment'
export default {
 
  data() {
    return {
      task: {},
      tableClass: "table-striped",
      pagination: null ,
      isFetching: false
    };
  },

  mounted() {
    this.getTask()
  },

  methods: {
    async getTask(){
      try {
        let id    = this.$route.params.id
        let res   = await this.$axios.post('/task/detail', {id, type: 'task'})
        this.task = res.data.data
      } catch (error) {
        
      }
    },

    _push(){
      let id    = this.$route.params.id
      this.$router.push('/tasks-list/students/'+id)
    },

    _moment(datetime){
      return moment(datetime).format('MMM Do YY')
    }
  }
}
</script>
<style>
</style>
