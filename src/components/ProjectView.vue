<template>
  <div>
    <v-text-field
      v-model="projectName"
      :counter="15"
      :rules="nameRules"
      label="Project Name"
      required
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "ProjectView",
  data() {
    return {
      projectName: "",
      nameRules: [
        v => !!v || "Project name is required",
        v =>
          (v && v.length <= 15) ||
          "Project name must be less than 15 characters"
      ]
    };
  }
};
</script>

<style scoped>
</style>