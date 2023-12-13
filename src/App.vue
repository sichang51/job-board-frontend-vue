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
      console.log(this.newJobParams);
      axios
        .post("/jobs.json", this.newJobParams, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("jobs create", response);
          this.jobs.push(response.data);
          this.newJobParams = {};
        })
        .catch((error) => {
          console.log("jobs create error", error.response);
        });
      console.log(this.newJobParams);
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>New Job</h1>
    <form @submit.prevent="createJob()">
      <span>Company Id:</span>
      <input type="number" v-model="newJobParams.company_id" />
      <br />
      <span>Title:</span>
      <input type="text" v-model="newJobParams.title" />
      <br />
      <span>Description:</span>
      <input type="text" v-model="newJobParams.description" />
      <br />
      <span>Url:</span>
      <input type="text" v-model="newJobParams.url" />
      <br />
      <span>Location:</span>
      <input type="text" v-model="newJobParams.location" />
      <br />
      <span>Active:</span>
      <input type="number" v-model="newJobParams.active" />
      <br />
      <span>Salary Range:</span>
      <input type="text" v-model="newJobParams.salary_range" />
      <br />
      <button type="submit">Create Job</button>
    </form>
    <h1>All Jobs</h1>
    <div v-for="job in jobs" v-bind:key="job.id">
      <h2>{{ job.title }}</h2>
      <p>Description: {{ job.description }}</p>
      <a :src="job.url">Link to listing</a>
      <p>Location: {{ job.location }}</p>
      <p>Salary: {{ job.salary_range }}</p>
    </div>
  </div>
</template>

<style></style>
