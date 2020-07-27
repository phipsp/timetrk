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
            <project-list
              @projectSelected="projectSelected"
              v-bind:projects="projects"
              :timedProjectId="timedProjectId"
            />
          </v-col>
          <v-divider inset vertical />
          <v-col>
            <v-row justify="center">
              <!-- <v-img alt="pomo" contain src="./assets/pomo.png" height="400" /> -->
              <pomo-view
                :activeProject="activeProject"
                @update-done-pomos="updateDonePomos"
                @on-timer-started="onTimerStarted"
              />
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
import ProjectList from './components/ProjectList.vue';
import ProjectView from './components/ProjectView.vue';
import ListHeader from './components/ListHeader.vue';
import PomoView from './components/PomoView.vue';
import Store from './store.js';

const store = new Store({
  fileName: 'data',
  defaultData: {
    projects: [
      { name: 'MyFirstProject', id: 1, pomos: { planned: 1, done: 0 } },
    ],
  },
});

export default {
  name: 'App',

  components: { ProjectList, ProjectView, ListHeader, PomoView },

  data: () => ({
    projects: [],
    activeProject: {},
    timedProjectId: -1,
  }),
  computed: {
    activeProjectIndex() {
      return this.projects.findIndex(
        (project) => project.id == this.activeProject.id
      );
    },
  },
  methods: {
    projectSelected(project) {
      this.activeProject = project;
    },
    updateProjectName(newProjectName) {
      this.projects[this.activeProjectIndex].name = newProjectName;
    },
    updatePlannedPomos(plannedPomos) {
      this.projects[this.activeProjectIndex].pomos.planned = plannedPomos;
    },
    updateDonePomos() {
      this.projects[this.activeProjectIndex].pomos.done++;
    },
    createProject() {
      var newId = this.projects.length + 1;
      var newProject = { name: '', id: newId, pomos: { planned: 0, done: 0 } };
      this.projects.push(newProject);
      this.activeProject = newProject;
      this.$refs.projectView.focusForm();
    },
    onTimerStarted(timedProjectId) {
      this.timedProjectId = timedProjectId;
    },
  },
  created() {
    require('electron').ipcRenderer.on('closing', () => {
      store.saveProjects(this.projects); //callback to save project data on window closing event of main process
    });

    this.projects = store.getProjects();
    this.activeProject = this.projects[0];
  },
};
</script>
