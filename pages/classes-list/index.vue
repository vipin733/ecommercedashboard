<template>
<div>
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
                  <td>{{item.title}} </td>
                  <td>{{item.duration}} min </td>
                  <td>{{customFormatter(item.start_date)}} </td>
                  <td>
                    <nuxt-link :to="{path: '/classes-list/sessions/'+item.id}" exact>
                     {{item.sessions_count ?  item.sessions_count  :  '0'}}
                    </nuxt-link>
                  </td>
                  
                  <td>
                    <nuxt-link :to="{path: '/classes-list/edit/'+item.id}" exact>Edit</nuxt-link>
                  </td>
                  <td v-if="item.session_id"
                  >
                  <button class="btn btn-primary" v-if="item.session_status == session_status.PendingSession" @click="createJoinUrl(item , index)">Start Session
                  </button>
                  <strong><a v-if="item.session_status == session_status.OngoingSession">Session Ongoing</a></strong>
                  <button class="btn btn-primary primary" v-if="item.session_status == session_status.PendingSession" type="button" 
                  data-toggle="modal" data-target="#myModal" 
                  @click="session_id = item.session_id  , session_url= item.custom_link , class_index = index">Add Custom Session URL</button>
                  </td>
                  <td v-else>No session scheduled for today</td>
                </tr>
              </tbody>
            </table>

          </div>
        </card>
        <div class="col-12 text-center">
          <div v-if="this.table.data.length == 0">
       <h3> No classes Found </h3>
        </div>
        </div>
        <div class="col-12 text-right">
          <button :disabled="(pagination && pagination.page == 1) || isFetching" class="btn btn-primary btn-sm" @click="getClases(10 , pagination.page - 1)">Previous</button>&nbsp&nbsp
    <button :disabled="(pagination && pagination.lastPage < 2 ) || (isFetching)" class="btn btn-primary btn-sm"
    @click="getClases(10 , pagination.page + 1)">Next</button>
        </div>
      </div>
      
    </div>

  <div class="modal" id="myModal" data-backdrop="false"  tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Custom URL</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input class="form-control" type="text" v-model="session_url" placeholder="Enter Custom URL...">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="updateCustomUrl()">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="closeModel">Close</button>
      </div>
    </div>
  </div>
</div>

</div>
</template>
<script>
// "Sessions", "Students", "Teacher" add later
import { PaperTable } from "@/components";
const tableColumns = ["Name", "Duration" , "Start Date" , "Sessions", "Action" , "Create Session Link"];
import moment from 'moment'
import SessionStatus from '../../components/lib/sessionStatus'


export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table: {
        title: "Class List",
        subTitle: "This is the list for Class",
        columns: [...tableColumns],
        data: []
      },
      tableClass: "table-striped",
      pagination: null,
      isFetching: false,
      session_url: '',
      session_id: '',
      class_index: '',
      session_status:SessionStatus
    }
  },

  methods:{
    async getClases(records , page) {
       if(this.isFetching){
        return
      }
      try {
        this.isFetching = true
        let res = await this.$axios.post('/class/organization/classes' , {
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
    },
     customFormatter(date) {
       if(!date){return ''}
      return moment(date).format('DD/MM/YYYY');
    },

    async updateCustomUrl(){

      try {

        let res = await this.$axios.post('/session/create/custom/link' ,{
            session_id: this.session_id,
            session_link:this.session_url
        })

        this.$refs.closeModel.click()

        this.table.data[this.class_index].custom_link = this.session_url

        this.session_id = ''

        this.session_url = ''

        this.class_index = ''

        this.$swal('Success', res.data.message, 'success')
        
      } catch (error) {

        console.log(error);
        
      }
    },

    async createJoinUrl(_class , index){ 
      try {

        let res = await this.$axios.post('/session/create/teacher/link' ,{
          session_id: _class.session_id
        })

        if(_class.custom_link){
          this.table.data[index].session_status = this.session_status.OngoingSession
          this.$swal('Success', 'You can start the session now', 'success')
          return
        }

        window.location = res.data.data

        // this.$router.push(res.data.data)
        // console.log(res.data);
        
      } catch (error) {

        console.log(error);
        
        
      }
        
        
      
    }
  },

  mounted() {
    this.getClases(10 , 1)
  }
};
</script>
<style>

</style>
