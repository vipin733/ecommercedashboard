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
                            <nuxt-link :to="{path: '/tasks-list/details/'+item.student_id}" exact>{{item.student_name}}</nuxt-link>
                        </td>
                        <td>{{item.student_email}}</td>
                        <td>{{item.student_username}}</td>
                        <td v-if="item.marks">
                            {{item.marks}}
                        </td>
                        <td v-else>
                            <button  v-if="submissionStatus.Submitted == item.status" 
                            :disabled="isFetching" @click="_publishMark(item.id)">Published Marks</button>

                        </td>
                        <td>{{item.description}}</td>
                        <td>{{formatDate(item.created_at)}} </td>
                        <td>
                            <a :href="item.file" target="_blank">File</a>
                        </td>

                        <td v-if="submissionStatus.Submitted == item.status">
                            <button  :disabled="isFetching" @click="_warningReject(item.id)">Reject</button>
                        </td>

                        <td v-if="submissionStatus.Rejected == item.status">
                            Rejected
                        </td>

                        <td v-if="submissionStatus.Approved == item.status">
                            Approved
                        </td>
                    </tr>
                  </tbody>
                </table>

            </div>
            </card>
        </div>
        <button v-if="pagination && pagination.lastPage != 1" :disabled="(pagination && pagination.page == 1) || isFetching" style="float:right" class="primary" @click="getTasks(10 , pagination.page - 1)">Previous</button>
    <button v-if=" pagination && pagination.lastPage != 1" :disabled="(pagination && pagination.page == pagination.lastPage) || (isFetching)" style="float:right" class="primary"
    @click="getTasks(10 , pagination.page + 1)">Next</button>
    </div>
</template>
<script>
import { PaperTable } from "@/components"
const tableColumns = ["Name", "Email", "Username", "Marks",  "Description", "Submitted At", "File", "Action"];
import moment from 'moment'
import submissionStatus from '../../../components/lib/submissionStatus'
import swal from 'sweetalert'
export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table: {
        title: "Student Submisions List",
        subTitle: "This is list for Student Submisions list",
        columns: [...tableColumns],
        data: []
      },
      tableClass: "table-striped",
      pagination: null ,
      isFetching: false,
      submissionStatus: submissionStatus,
    };
  },

  methods:{
    async getStudents(records , page) {
        if(this.isFetching){
            return
        }
        try {
            let task_id = this.$route.query.task_id
            let student_id = this.$route.query.student_id
            this.isFetching = true
            let res = await this.$axios.post('/student/submissions' ,{
                records , page, task_id, student_id
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

    _warningReject(submission_id){
        swal({
            title: "Are you sure?",
            text: "Are you sure want to reject this submission!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this._changeStatus(submission_id)
            }
        })

    },

    async _changeStatus(submission_id){
        try {
            this.isFetching = true
            let task_id = this.$route.query.task_id
            let student_id = this.$route.query.student_id
            let res = await this.$axios.post('/student/submission/status/change', {
                task_id, student_id, submission_id
            })
            swal("Succes! successfully rejected!", {
                icon: "success",
            })
            this.isFetching = false
            this.getStudents(10 ,1)
        } catch (error) {
            this.isFetching = false
        }
    },

    _publishMark(submission_id){
        swal("Enter marks:", {
            content: "input",
        }).then((value) => {
            if (value) {
                this._publisinghMark(value, submission_id)
            }
        })
    },

   async  _publisinghMark(marks, submission_id){
        try {
            this.isFetching = true
            let task_id = this.$route.query.task_id
            let student_id = this.$route.query.student_id

            let data = {
                submission_id,
                marks,
                status: 3
            }
            let res = await this.$axios.post('/submission/update', {
                datas : [data]
            })
            swal("Succes! successfully marks published !", {
                icon: "success",
            })
            this.isFetching = false
            this.getStudents(10 ,1)
        } catch (error) {
            this.isFetching = false
        }
    }

  },

  mounted() {
    this.getStudents(10 ,1)
  }
};
</script>
<style>
</style>
