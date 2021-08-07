<template>
    <div class="row">
        <div class="col-12">
            <card :title="table.title" :subTitle="table.subTitle">
            <div slot="raw-content" class="table-responsive">
                
                <table class="table" :class="tableClass">
                  <thead>
                    <slot name="columns">
                      <th v-for="column in table.columns" :key="column">{{column}}</th>
                    </slot>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in table.data" :key="index">
                        <td>
                            <nuxt-link :to="{path: '/students-list/details/'+item.student_id}" exact>{{item.student_name}}</nuxt-link>
                        </td>
                        <td>{{item.email}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.status}}</td>
                        <td>
                            <nuxt-link :to="{path: `/tasks-list/submissions?student_id=${item.student_id}&task_id=${$route.params.id}`}" exact>{{item.submissions_count}}</nuxt-link>
                        </td>
                        <td>{{item.created_at}} </td>
                    </tr>
                  </tbody>
                </table>

            </div>
            </card>
        </div>
        <div class="col-12 text-center">
          <div v-if="this.table.data.length == 0">
            <h3> No data Found </h3>
          </div>
        </div>

        <div class="col-12 text-right">
          <button v-if="pagination && pagination.lastPage != 1" :disabled="(pagination && pagination.page == 1) || isFetching" class="btn btn-primary btn-sm" @click="getTasks(10 , pagination.page - 1)">Previous</button>
          <button v-if=" pagination && pagination.lastPage != 1" :disabled="(pagination && pagination.lastPage < 2) || (isFetching)" class="btn btn-primary btn-sm"
          @click="getTasks(10 , pagination.page + 1)">Next</button>
        </div>
      </div>
</template>
<script>
import { PaperTable } from "@/components"
const tableColumns = ["Name", "Email", "Username", "Status",  "Submissions Count", "Created At"];
import moment from 'moment'

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table: {
        title: "Student List",
        subTitle: "This is list for Student list",
        columns: [...tableColumns],
        data: []
      },
      tableClass: "table-striped",
      pagination: null ,
      isFetching: false,
      task_id: this.$route.params.id
    };
  },

  methods:{
    async getStudents(records , page) {
        if(this.isFetching){
            return
        }
        try {
            let id = this.$route.params.id
            this.isFetching = true
            let res = await this.$axios.post('/student/taskwise' ,{
                records , page, task_id: id
            })
            this.table.data = res.data.datas
            this.pagination = res.data.pagination
            this.isFetching = false
        } catch (error) {
            this.isFetching = false
        }
    },

    formatDate(date){
      if(date){
        return moment(date).format('MMMM Do YYYY')
      }
    },

  },

  mounted() {
    this.getStudents(10 ,1)
  }
};
</script>
<style>
</style>
