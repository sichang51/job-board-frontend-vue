<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      jobs: [],
      newJobParams: {},
      currentJob: {},
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
    showJob: function (job) {
      this.currentJob = job;
      document.querySelector("#job-details").showModal();
    },
    destroyJob: function (job) {
      axios.delete(`/jobs/${job.id}.json`).then((response) => {
        console.log("jobs destroy", response);
        var index = this.jobs.indexOf(job);
        this.jobs.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>New Job</h1>
    <div>
      Company Id:
      <input type="integer" v-model="newJobParams.company_id" />
      Title:
      <input type="text" v-model="newJobParams.title" />
      Description:
      <input type="text" v-model="newJobParams.description" />
      Url:
      <input type="text" v-model="newJobParams.url" />
      Location:
      <input type="text" v-model="newJobParams.location" />
      Active:
      <input v-model="newJobParams.active" />
      Salary Range:
      <input type="text" v-model="newJobParams.salary_range" />
      <button v-on:click="createJob()">Create Job</button>
    </div>
    <h1>All Jobs</h1>
    <div v-for="job in jobs" v-bind:key="job.id">
      <h2>{{ job.title }}</h2>
      <p>Description: {{ job.description }}</p>
      <a :src="job.url">Link to listing</a>
      <p>Location: {{ job.location }}</p>
      <p>Salary: {{ job.salary_range }}</p>
      <button v-on:click="showJob(job)">More Info</button>
    </div>
    <dialog id="job-details">
      <form method="dialog">
        <h1>Job Info</h1>
        <p>Title: {{ currentJob.title }}</p>
        <p>Description: {{ currentJob.description }}</p>
        <p>URL: {{ currentJob.url }}</p>
        <p>Location: {{ currentJob.location }}</p>
        <p>Salary Range: {{ currentJob.salary_range }}</p>
        <button v-on:click="destroyJob(currentJob)">Destroy Job</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
