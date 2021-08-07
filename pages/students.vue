<template>
    <div class="row">

      <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <paper-table type="hover" :data="students"
                :columns="tableColumns">
            </paper-table>
          </div>
        </card>
      </div>

    </div>
</template>
<script>
import { PaperTable } from "@/components";
// import axios from '@nuxtjs/axios'
// const tableColumns = ["Id", "Name", "UserName", "Email", "Mobile"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout"
  },
  {
    id: 2,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas"
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux"
  },
  {
    id: 4,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park"
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  }
];

export default {
  components: {
    PaperTable
  },

   data() {
    return {
       tableColumns : ["Name", "UserName", "Email", "Mobile"],
       students: []
    };
  },

  async mounted() {
      let _response = await this.$axios.post("student/list")

      this.students = _response.data
      
  },
 
};
</script>
<style>
</style>
