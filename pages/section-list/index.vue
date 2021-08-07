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
                  <td>{{item.name}} </td>
                  <td>{{item.description}} </td>
                  <td>{{item.created_at}} </td>
                  <td> 
                    <!-- <nuxt-link :to="{path: '/section-list/details/'+item.id}" exact>View</nuxt-link> -->
                    <nuxt-link :to="{path: '/section-list/edit/'+item.id}" exact>Edit</nuxt-link>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </card>
        <div class="col-12 text-center">
          <div v-if="this.table.data.length == 0">
            <h3> No section Found </h3>
          </div>
        </div>
        <div class="col-12 text-right">
          <button :disabled="(pagination && pagination.page == 1) || isFetching" class="btn btn-primary btn-sm" @click="getSections(10 , pagination.page - 1)">Previous</button>&nbsp&nbsp
          <button :disabled="(pagination && pagination.lastPage < 2) || (isFetching)" class="btn btn-primary btn-sm"
          @click="getSections(10 , pagination.page + 1)">Next</button>
        </div>
      </div>

    </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Name", "Desciption" , "Created At", "Action"];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table: {
        title: "Section List",
        subTitle: "This is list for Section list",
        columns: [...tableColumns],
        data: []
      },
      tableClass: "table-striped",
      pagination: null,
      isFetching: false
    }
  },

  methods:{
    async getSections(records , page) {
       if(this.isFetching){
        return
      }
      try {
        this.isFetching = true
        let res = await this.$axios.post('/section/list' , {
          records,
          page
        })
        this.table.data = res.data.data
        this.pagination = res.data.pagination
        this.isFetching = false
      } catch (error) {
        this.isFetching = false
      }
      
    }
  },

  mounted() {
    this.getSections(10 , 1)
  }

};
</script>
<style>
</style>
