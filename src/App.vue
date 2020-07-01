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
              <v-img alt="pomo" contain src="./assets/pomo.png" height="400" />
            </v-row>
            <v-divider />
            <v-row justify="center">
              <project-view
                v-bind:activeProject="activeProject"
                @updateProjectName="updateProjectName"
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
      { name: "Unnamed Chat App", id: 1 },
      { name: "timetrk", id: 2 },
      { name: "MotionDetectorBot", id: 3 },
      { name: "Whatever", id: 4 },
      { name: "bla", id: 5 },
      { name: "blub", id: 6 },
      { name: "filler", id: 7 },
      { name: "content", id: 8 },
      { name: "stuff", id: 9 }
    ],
    activeProject: {}
  }),
  methods: {
    projectSelected(project) {
      console.log("message from list", project);
      this.activeProject = project;
    },
    updateProjectName(newProjectName) {
      var index = this.projects.findIndex(
        project => project.id == this.activeProject.id
      );
      this.projects[index].name = newProjectName;
    },
    createProject() {
      var newId = this.projects.length + 1;
      var newProject = { name: "", id: newId };
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
