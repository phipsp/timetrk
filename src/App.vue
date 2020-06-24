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
            <project-list @newProjectSelected="newProjectSelected" />
          </v-col>
          <v-divider inset vertical />
          <v-col>
            <v-row>
              <v-img alt="pomo" contain src="./assets/pomo.png" height="400" />
            </v-row>
            <v-divider />
            <v-row justify="center">
              <project-view v-bind:activeProject="activeProject" />
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

export default {
  name: "App",

  components: { ProjectList, ProjectView },

  data: () => ({
    activeProject: "" // TODO: switch to object with name, done pomos, open pomos, etc..
  }),
  methods: {
    newProjectSelected(newProject) {
      console.log("message from list", newProject);
      this.activeProject = newProject;
    }
  }
};
</script>
