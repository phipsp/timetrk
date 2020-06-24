<template>
  <div>
    <list-header />
    <v-divider />
    <v-list two-line style="max-height: 500px" class="overflow-y-auto">
      <v-list-item-group mandatory color="primary">
        <template v-for="(project, index) in projects">
          <v-list-item :key="project.name" @click="updateSelected(project)">
            <v-list-item-content>
              <v-list-item-title v-text="project.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="index + 1 < projects.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import ListHeader from "./ListHeader.vue";
export default {
  name: "ProjectList",

  data() {
    return {
      selectedProject: {}
    };
  },
  components: {
    ListHeader
  },
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    updateSelected(project) {
      this.selectedProject = project;
      this.$emit("projectSelected", project);
    }
  }
};
</script>

<style scoped>
</style>