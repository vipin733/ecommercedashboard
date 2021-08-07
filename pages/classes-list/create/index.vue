<template>
  <div  class="row">
    <div class="col-xl-12 col-lg-12 col-md-12">
      <card class="card" title="Create Class">
        <div>
          <form @submit.prevent>
            <div class="row">
              <div class="col-md-6">
                <fg-input
                  type="text"
                  label="Name"
                  placeholder="Name"
                  v-model="data.name"
                  name="name"
                  v-validate="'required'"
                  :class="{
                    '': true,
                    'is-invalid': errors.has('name'),
                  }"
                >
                </fg-input>
                <span class="error" v-if="errors.has('name')">
                  {{ errors.first("name") }}
                </span>
              </div>
              <div class="col-md-6">
                <fg-input
                  type="number"
                  label="Duration"
                  placeholder="duration"
                  v-model="data.duration"
                  name="duration"
                  @input="onlyPositiveNumber('duration')"
                  min="1"
                  :key="duration_key"
                  v-validate="'required'"
                  :class="{
                    '': true,
                    'is-invalid': errors.has('duration'),
                  }"
                >
                </fg-input>
                <span class="error" v-if="errors.has('duration')">
                  {{ errors.first("duration") }}
                </span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <fg-input
                  type="number"
                  label="Max Attendee"
                  placeholder="Max Attendee"
                  v-model="data.max_attendee"
                  name="max_attendee"
                  v-validate="'required'"
                  :class="{
                    '': true,
                    'is-invalid': errors.has('max_attendee'),
                  }"
                >
                </fg-input>
                <span class="error" v-if="errors.has('max_attendee')">
                  {{ errors.first("max_attendee") }}
                </span>
              </div>

              <div class="col-md-6">
                <label class="control-label">Section</label>
                <v-select
                  v-model="data.section"
                  label="name"
                  :options="sections"
                  placeholder="Select Section"
                />
              </div>

            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">
                    Start Date
                  </label>
                  <Datepicker
                    v-model="data.start_date"
                    :format="customFormatter"
                    :disabled-dates="disabledDates"
                    @selected="sessionDiasble('min' , $event)"
                    input-class="form-control"
                    key="start_date"
                    placeholder="Start Date"
                    :required="true"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">
                    End Date
                  </label>
                  <Datepicker
                    v-model="data.end_date"
                    :format="customFormatter"
                    :disabled-dates="disabledEndDate"
                    @selected="sessionDiasble('max' , $event)"
                    input-class="form-control"
                    key="end_date"
                    placeholder="End Date"
                    :required="true"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label class="control-label"> Start Time</label>
                <flat-pickr
                  v-model="data.start_time"
                  class="form-control"
                  key="start_time"
                  placeholder="End Date"
                  :required="true"
                  :config="start_time_config"
                />
              </div>

              <div class="col-md-6">
                  <label class="control-label mt-4">
                    &nbsp;
                  </label>
                  <input
                    aria-describedby="addon-right addon-left"
                    class=""
                    v-model="data.is_recording"
                    type="checkbox"
                  /> Auto Recording?
              </div>
            </div>

            <!-- <div class="row">

                <div class="col-md-6">
                  <div class="form-group">
                    <label class="control-label">
                      Is One Time Class ?
                     </label> 
                      <input aria-describedby="addon-right addon-left"  class="form-control"  v-model="data.is_one_time"  type="checkbox">
                   
                  </div>
                </div>

                <div class="col-md-6" v-if="data.is_one_time">
                  <div class="form-group">
                    <label class="control-label">
                      Sessions Dates
                    </label> 
                    <Datepicker   :config="session_date_config"  
                     :disabled-dates="disabledDates" input-class="form-control"
                      key="session_dates" placeholder="End Date"
                      :required="true"/>
                  </div>
                </div>

              </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">
                    Is One Time Class ?
                  </label>
                  <input
                    aria-describedby="addon-right addon-left"
                    class="form-control"
                    v-model="data.is_one_time"
                    type="checkbox"
                    @change="updateSessionDate()"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">
                    Auto Recording?
                  </label>
                  <input
                    aria-describedby="addon-right addon-left"
                    class="form-control"
                    v-model="data.is_recording"
                    type="checkbox"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">
                    Allow Webcam to Students?
                  </label>
                  <input
                    aria-describedby="addon-right addon-left"
                    class="form-control"
                    v-model="data.allow_webcam"
                    type="checkbox"
                  />
                </div>
              </div>

              <div class="col-md-6" v-if="!data.is_one_time">
                <div class="form-group">
                  <label class="control-label">
                    Sessions Dates
                  </label>
                  <flatPickr
                    v-model="session_dates"
                    :config="config"
                    class="form-control"
                    placeholder="Select date"
                  ></flatPickr>
                <Datepicker v-model="session_date" 
                      :format="customFormatter"
                      :disabled-dates="disabledDates" input-class="form-control"
                      key="session_dates" placeholder="Session Date"
                       @selected="addSessionDate($event)"
                      :required="true"/> -->

              

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label mt-4">
                    &nbsp;
                  </label>
                  <input
                    aria-describedby="addon-right addon-left"
                    v-model="data.is_one_time"
                    type="checkbox"
                    @change="updateSessionDate()"
                  /> Is One Time Class ?
                </div>
              </div>

              <div class="col-md-6" v-if="!data.is_one_time">
                <div class="form-group">
                  <label class="control-label">
                    Sessions Dates
                  </label>
                  <flatPickr
                    v-model="session_dates"
                    :config="config"
                    class="form-control"
                    placeholder="Select date"
                  ></flatPickr>
                </div>
              </div>

              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">
                    Auto Recording?
                  </label>
                  <input
                    aria-describedby="addon-right addon-left"
                    class="form-control"
                    v-model="data.is_recording"
                    type="checkbox"
                  />
                </div>
              </div> -->

              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label mt-4">
                    &nbsp;
                  </label>
                  <input
                    aria-describedby="addon-right addon-left"
                    v-model="data.allow_webcam"
                    type="checkbox"
                  /> Allow Webcam to Students?
                </div>
              </div>
            </div>
               
             
        
            <div v-if="!data.is_one_time && data.dates.length > 0" :key="dateKey">
              <h2>Session Dates</h2>
              <!-- {{ data.dates }} -->
              <div v-for="(data, index) in data.dates" :key="index">
                <p>
                  {{ formatDate(data) }}
                  <button class="btn btn-warning" type="warning" @click="removeDate(index)">Remove Date</button>
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    rows="5"
                    class="form-control border-input"
                    placeholder="description"
                    v-model="data.description"
                  >
                  </textarea>
                </div>
              </div>
            </div>

            <div class="text-right">
              <button class="btn btn-primary" type="info" round @click.native.prevent="createClass">
                {{ this.isLoading ? "Creating..." : "Create Class" }}
              </button>
            </div>

            <div class="clearfix"></div>
          </form>
        </div>
      </card>
    </div>
  </div>

</template>
<script>
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import ErrorsFunction from "../../../components/lib/errors";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  components: {
    Datepicker,
    flatPickr,
  },

  watch: {
    session_dates: function(newVal, oldVal) {
      this.data.dates = newVal.split(",");
    },
  },

  data() {
    return {
      config: {
        mode: "multiple",
        wrap: true, // set wrap to true only when using 'input-group'
        conjunction: ",",
        dateFormat: "Y-m-d",
        minDate: new Date() ,
        maxDate: new Date() 
      },
      data: {
        name: "",
        description: "",
        duration: "",
        start_date: moment().format("YYYY-MM-DD") + "T00:00:00.000Z",
        end_date: moment().format("YYYY-MM-DD") + "T00:00:00.000Z",
        start_time: "00:00",
        section_id: "",
        max_attendee: "",
        section: null,
        is_one_time: true,
        dates: [],
        is_recording: false,
        allow_webcam: false,
      },
      sections: [],
      disabledDates: {
        from: new Date(),
        to:new Date(Date.now() - 864e5)
      },
       disabledEndDate: {
        to: new Date(Date.now() - 864e5),
      },
      start_time_config: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
      },
      session_dates: "",

      session_date_config: {
        mode: "multiple",
        dateFormat: "Y-m-d",
        conjunction: " :: ",
        // defaultDate: []
      },
      isLoading: false,
      dateKey: 1,
      duration_key: 1000
    };
  },
  methods: {
    async createClass() {
      try {
        if (this.isLoading) {
          return;
        }
        let validate = await this.$validator.validateAll();
        if (!validate) {
          // this.$('html, body').animate({
          //     scrollTop: $("#upper_div").offset().top
          // }, 2000);
          // Jquery issue scroll
          return;
        }

        if (!this.data.section) {
          this.$swal({
            title: "warning",
            icon: "warning",
            text: "Please select a section",
          });
          return;
        }

        if (!this.data.is_one_time && this.data.dates.length == 0) {
          this.$swal({
            title: "warning",
            icon: "warning",
            text: "Please select session dates",
          });
          return;
        }

        this.data.section_id = this.data.section.id;
        this.isLoading = true;
        let res = await this.$axios.post("/class/create", this.data);
        this.$swal({
          title: "Success",
          icon: "success",
          text: "Successfully created",
        });

        this.$router.push("/classes-list");
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "Oops!",
          icon: "error",
          text: ErrorsFunction(error.response.data),
        });
        this.isLoading = false;
      }
    },

    customFormatter(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    async _getSections() {
      try {
        let res = await this.$axios.post("/section/list");
        this.sections = res.data.data;
      } catch (error) {}
    },
    addSessionDate($event) {
      if (!$event) {
        return;
      }

      if (this.data.dates.includes($event)) {
        return;
      } else {
        this.data.dates.push($event);
      }
    },
    formatDate(date) {
      if (date) {
        return moment(date).format("MMMM Do YYYY");
      }
    },
    removeDate(index) {
      this.$delete(this.data.dates, index);
    },
    updateSessionDate() {
      this.data.dates = [];
      this.session_dates = ''
      this.dateKey++
    },

    async sessionDiasble(type , $event){
      await this.updateSessionDate()
      if(type == 'min'){
        this.config.minDate = new Date($event)
      }
      else{
        this.config.maxDate = new Date($event)
        this.disabledDates.from =  new Date($event)
        if(this.data.start_date > $event){
          this.data.start_date = $event
          this.config.minDate = new Date($event)
        }
      }
    },
    onlyPositiveNumber(_key){

      if(this.data[_key] == ''){
        this.duration_key--
         this.$swal({
            title: "warning",
            icon: "warning",
            text: "Please enter a valid duration",
          });
      }
      
      if(this.data[_key] <= 0){
          this.data[_key] = '';
           this.$swal({
            title: "warning",
            icon: "warning",
            text: "Please enter a valid duration",
          });
      } 
    }
  },

  mounted() {
    this._getSections();
    this.data.start_time = moment().format('HH:mm')
  },
};
</script>
<style></style>
