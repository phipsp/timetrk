<template>
  <div>
    <list-header />
    <v-divider />
    <v-list two-line>
      <v-list-item-group mandatory color="primary">
        <template v-for="(project, index) in projects">
          <v-list-item :key="project.name" @click="updateSelected(project.name)">
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
      projects: [
        { name: "Unnamed Chat App" },
        { name: "timetrk" },
        { name: "MotionDetectorBot" },
        { name: "Whatever" },
        { name: "bla" },
        { name: "blub" },
        { name: "filler" },
        { name: "content" },
        { name: "stuff" }
      ],
      selectedProject: ""
    };
  },
  components: {
    ListHeader
  },
  methods: {
    updateSelected(project) {
      this.selectedProject = project;
      console.log(this.selectedProject);
    }
  }
};
</script>

<style scoped>
</style>