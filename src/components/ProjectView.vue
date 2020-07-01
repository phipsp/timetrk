<template>
  <div>
    <v-text-field
      v-model="activeProject.name"
      :counter="20"
      :rules="nameRules"
      label="Project Name"
      required
      @submit="updateProjectName(activeProject.name)"
      ref="form"
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
      type: Object,
      default: () => {}
    }
  },
  methods: {
    updateProjectName(newName) {
      this.$emit("updateProjectName", newName);
    },
    focusForm: function() {
      this.$refs.form.focus();
    }
  }
};
</script>

<style scoped>
</style>