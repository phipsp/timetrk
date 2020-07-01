<template>
  <v-app>
    <v-app-bar app color="primary" flat>
      <div class="align-center justify-center">
        <v-img alt="timetrk logo" contain src="./assets/logo.png" width="100" />
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col md cols="4">
            <list-header @createProject="createProject" />
            <v-divider />
            <project-list @projectSelected="projectSelected" v-bind:projects="projects" />
          </v-col>
          <v-divider inset vertical />
          <v-col>
            <v-row>
              <v-img alt="pomo" contain src="./assets/pomo.png" height="300" />
            </v-row>
            <v-divider />
            <v-row justify="center">
              <project-view
                v-bind:activeProject="activeProject"
                @updateProjectName="updateProjectName"
                @updatePlannedPomos="updatePlannedPomos"
                ref="projectView"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ProjectList from "./components/ProjectList.vue";
import ProjectView from "./components/ProjectView.vue";
import ListHeader from "./components/ListHeader.vue";

export default {
  name: "App",

  components: { ProjectList, ProjectView, ListHeader },

  data: () => ({
    projects: [
      { name: "Unnamed Chat App", id: 1, pomos: { planned: 1, done: 2 } },
      { name: "timetrk", id: 2, pomos: { planned: 4, done: 5 } },
      { name: "MotionDetectorBot", id: 3, pomos: { planned: 35, done: 7 } },
      { name: "Whatever", id: 4, pomos: { planned: 222, done: 2 } },
      { name: "bla", id: 5, pomos: { planned: 6, done: 1 } },
      { name: "blub", id: 6, pomos: { planned: 1, done: 3434 } }
    ],
    activeProject: {}
  }),
  computed: {
    activeProjectIndex() {
      return this.projects.findIndex(
        project => project.id == this.activeProject.id
      );
    }
  },
  methods: {
    projectSelected(project) {
      console.log("message from list", project);
      this.activeProject = project;
    },
    updateProjectName(newProjectName) {
      this.projects[this.activeProjectIndex].name = newProjectName;
    },
    updatePlannedPomos(plannedPomos) {
      this.projects[this.activeProjectIndex].pomos.planned = plannedPomos;
    },
    createProject() {
      var newId = this.projects.length + 1;
      var newProject = { name: "", id: newId, pomos: { planned: 0, done: 0 } };
      this.projects.push(newProject);
      this.activeProject = newProject;
      this.$refs.projectView.focusForm();
    }
  },
  created() {
    this.activeProject = this.projects[0];
  }
};
</script>
