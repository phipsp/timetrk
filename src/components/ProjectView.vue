<template>
  <div>
    <v-text-field
      v-model="activeProject"
      :counter="20"
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
          (v && v.length <= 20) ||
          "Project name must be less than 20 characters"
      ]
    };
  },
  props: {
    activeProject: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
</style>