<script>
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      newJobParams: {},
    };
  },
  created: function () {},
  methods: {},

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
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h1>New Jobs</h1>
    <div>
      Company Id:
      <input />
      Company Id:
      <input />
      Company Id:
      <input />
      Company Id:
      <input />
      Company Id:
      <input />
      Company Id:
      <input />
      Company Id:
      <input />
    </div>
  </div>
</template>

<style></style>
company_id, title, description, url, location, active, salary_range
