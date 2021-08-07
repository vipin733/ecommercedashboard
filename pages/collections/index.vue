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
                <td>{{item.id}}</td>
                <td>{{item.title}}</td>
                <td>{{item.status}}</td>
                <td>{{item.app_type}}</td>
                <td>{{item.created_at}}</td>
                <td>
                  <nuxt-link :to="{path: '/collections/'+item.id}" exact>View</nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Id", "Title", "Status",  'App Type', "Created at", "Actions"];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table: {
        title: "Collection List",
        subTitle: "This is the list for Collection",
        columns: [...tableColumns],
        data: []
      },
      tableClass: "table-striped"
    };
  },

  methods: {
    async getCollections() {
      try {
        let res = await this.$axios.post("/collection/list", {
          records: 10
        });
        this.table.data = res.data.datas;
      } catch (error) {}
    }
  },

  mounted() {
    if (this.$auth.user.role_id != 4) {
      this.$router.push("/");
    }
    this.getCollections();
  }
};
</script>
<style>
</style>
