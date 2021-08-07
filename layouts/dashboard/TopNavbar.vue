<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="showHideCreate()">
            <nuxt-link :to="route_name + '/create'" class="btn btn-primary mt-4">
              <i class="ti-panel"></i> &nbsp; Create New
            </nuxt-link>
          </li>
          <drop-down class="nav-item"
                     title="Actions"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" @click="logoutUser()">Logout</a>
            <!-- <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a> -->
          </drop-down>
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p>
                Settings
              </p>
            </a>
          </li> -->
        </ul>
      </div>
    </div></nav>
</template>
<script>
import axios from 'axios'
export default {
  computed: {
    routeName() {
     
      
      // let length = this.$route.name.length
      // this.route_name = this.$route.name.slice(0  , length - 1)
      //  console.log(this.route_name)
       this.route_name = this.$route.name
     
       
      return this.capitalizeFirstLetter(this.$route.name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      route_name: '',
      routes: ['teachers-list', 'students-list', 'section-list', 'classes-list', 'tasks-list', 'collections']
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      if (string)
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async logoutUser(){
      try {
        // this.$auth.reset()
        await this.$auth.logout('logout')

        // this.$router.push({
        //   path: '/login'
        // })
        
      } catch (error) {
        console.log(error);
        
        
      }

    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showHideCreate(){
      if( this.routes.includes(this.$route.name)){
        return true
      }

      return false
    }
  }
};
</script>
<style>
</style>
