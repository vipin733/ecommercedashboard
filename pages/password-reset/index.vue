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
                <td>{{item.student_id}} </td>
                <td>{{item.username}} </td>
                <td>{{item.status}}</td>
                <td>{{item.created_at}}</td>
                 <td>
                    <button  @click="updateStatus(index , item , status.Approve)" exact>Approve</button>
                    <button @click="updateStatus(index , item , status.Reject)" exact>Reject</button>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </card>
      <div class="col-12 text-center">
        <div v-if="this.table.data.length == 0">
          <h3> No data Found </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components"
const tableColumns = ["Id", "Name" , "Status", "Created At", "Action"]
import PasswordStatus from '~/components/lib/passwordStatus'
export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table: {
        title: "Password Reset",
        subTitle: "This is list for Password Reset request",
        columns: [...tableColumns],
        data: []
      },
      tableClass: "table-striped",
      status:PasswordStatus
    };
  },

  methods:{
    async getStudents() {
      try {
        let res = await this.$axios.post('/password/reset/students')
        this.table.data = res.data
      } catch (error) {
        
      }
    },
    async updateStatus(index , item , status){
        try {

            let res = await this.$axios.post('/update/password' , {
                user_id:item.student_id,
                status
            })
           
            // this.table.data = this.table.data.slice(index , 1)
            this.$delete(this.table.data, index)

            this.$swal({
                title: "Success",
                icon: 'success',
                text: "Request Submitted Successfully"
            })

            
        } catch (error) {
            console.log(error);
        }
        
    }
  },

  mounted() {
    this.getStudents()
  }
};
</script>
<style>
</style>
