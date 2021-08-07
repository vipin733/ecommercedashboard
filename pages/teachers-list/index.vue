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
                  <td>{{item.id}} </td>
                  <td>{{item.name}} </td>
                  <td>{{item.email}} </td>
                   <!-- <td>{{item.status ? 'Active': 'Deactivated'}} </td> -->
                  <td>{{item.created_at}} </td>
                  <td>
                    <!-- <nuxt-link :to="{path: '/teachers-list/details/'+item.id}" exact>View</nuxt-link> -->
                    <nuxt-link :to="{path: '/teachers-list/edit/'+item.id}" exact>Edit</nuxt-link>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </card>
      </div>
      <div class="col-12 text-center">
        <div v-if="this.table.data.length == 0">
          <h3> No teachers Found </h3>
        </div>
      </div>
      <div class="col-12 text-right">
        <button :disabled="(pagination && pagination.page == 1) || isFetching" class="btn btn-sm btn-primary" @click="getTeachers(10 , pagination.page - 1)">Previous</button>&nbsp&nbsp
        <button :disabled="(pagination && pagination.lastPage < 2) || (isFetching)" class="btn btn-sm btn-primary"
        @click="getTeachers(10 , pagination.page + 1)">Next</button>
      </div>
      
      
      

    </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Id", "Name", "Email", "Created At", "Action"];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table: {
        title: "Teachers List",
        subTitle: "This is list for Teachers list",
        columns: [...tableColumns],
        data: []
      },
      tableClass: "table-striped",
      pagination: null,
      isFetching: false
    }
  },

  methods:{
    async getTeachers(records , page) {
       if(this.isFetching){
        return
      }
      try {
        this.isFetching = true
        let res = await this.$axios.post('/teacher/list' , {
          records,
          page
        })
        this.table.data = res.data.datas
        this.pagination = res.data.pagination
        this.isFetching = false
      } catch (error) {
        this.isFetching = false
        console.log(error);
        
      }
    }
  },

  mounted() {
    this.getTeachers(10 , 1)
  }

};
</script>
<style>
</style>
