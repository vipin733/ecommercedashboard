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
                      <!-- <td>{{item.id}} </td> -->
                      <td>
                        <nuxt-link :to="{path: '/tasks-list/details/'+item.id}" exact>{{item.title}}</nuxt-link>
                      </td>
                      <td>{{item.class_name}}</td>
                      <td>{{formatDate(item.due_date)}} </td>
                       <td>
                        <nuxt-link :to="{path: '/tasks-list/students/'+item.id}" exact>Submissions</nuxt-link>
                      </td>
                      <!-- <td>--</td> -->
                      <!-- <td>{{item.status ? 'Active' : 'Deactivated'}}</td> -->
                      <td>{{formatDate(item.created_at)}}</td>
                      <td>
                        <!-- <nuxt-link :to="{path: '/tasks-list/details/'+item.id}" exact>View</nuxt-link> -->
                        <nuxt-link :to="{path: '/tasks-list/edit/'+item.id}" exact>Edit</nuxt-link>
                      </td>
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
const tableColumns = ["Name", "Class", "Due Date", 'Submissions', "Created At", "Action"];
import moment from 'moment'

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table: {
        title: "Task List",
        subTitle: "This is list for Task list",
        columns: [...tableColumns],
        data: []
      },
      tableClass: "table-striped",
      pagination: null ,
      isFetching: false
    };
  },

  methods:{
    async getTasks(records , page) {
      if(this.isFetching){
        return
      }
      try {
        this.isFetching = true
        let res = await this.$axios.post('/task/organization/tasks' ,{
          records , page
        })
        this.table.data = res.data.datas
        this.pagination = res.data.pagination
        this.isFetching = false

      } catch (error) {
        this.isFetching = false
        console.log(error);
        
      }
    },
    formatDate(date){
      if(date){
        return moment(date).format('MMMM Do YYYY')
      }
    },
  },

  mounted() {
    this.getTasks(10 ,1)
  }
};
</script>
<style>
</style>
