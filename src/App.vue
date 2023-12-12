<script>
import axios from "axios";
export default {
  data: function () {
    return {
      jobs: [],
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
