<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      jobs: [],
      newJobParams: {},
    };
  },
  created: function () {
    this.indexJobs();
  },
  methods: {
    indexJobs: function () {
      axios.get("/jobs.json").then((response) => {
        console.log("jobs index", response);
        this.jobs = response.data;
      });
    },
    createJob: function () {
      axios
        .post("/jobs.json", this.newJobParams)
        .then((response) => {
          console.log("jobs create", response);
          this.jobs.push(response.data);
          this.newJobParams = {};
        })
        .catch((error) => {
          console.log("jobs create error", error.response);
        });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>All Jobs</h1>
    <div v-for="job in jobs" v-bind:key="job.id">
      <h2>{{ job.title }}</h2>
      <p>Description: {{ job.description }}</p>
      <a src="{{" job.url }}>Link to listing</a>
      <p>Location: {{ job.location }}</p>
      <p>Salary: {{ job.salary }}</p>
    </div>
  </div>
</template>

<style></style>
company_id, title, description, url, location, active, salary_range
