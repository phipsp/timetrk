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
            <list-header @create-project="createProject" />
            <v-divider />
            <project-list
              @project-selected="projectSelected"
              :projects="projects"
              :timedProjectId="timedProjectId"
            />
          </v-col>
          <v-divider inset vertical />
          <v-col class="d-flex align-center" v-if="!projects.length" style="height: 600px">
            <empty-project-list-view />
          </v-col>
          <v-col v-else>
            <v-row justify="center">
              <pomo-view
                :activeProject="activeProject"
                @update-done-pomos="updateDonePomos"
                @on-timer-started="onTimerStarted"
                @on-timer-finished="onTimerFinished"
                @on-timer-cancelled="onTimerFinished"
              />
            </v-row>
            <v-divider />
            <v-row justify="center">
              <project-view
                :activeProject="activeProject"
                @update-project-name="updateProjectName"
                @update-planned-pomos="updatePlannedPomos"
                @delete-project="deleteProject"
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
import ListHeader from "@/components/ListHeader.vue";
import ProjectList from "@/components/ProjectList.vue";
import ProjectView from "@/components/views/ProjectView.vue";
import PomoView from "@/components/views/PomoView.vue";
import EmptyProjectListView from "@/components/views/EmptyProjectListView.vue";
import Store from "./store.js";

const store = new Store({
  fileName: "data",
  defaultData: {
    projects: [
      { name: "MyFirstProject", id: 1, pomos: { planned: 1, done: 0 } },
    ],
  },
});

export default {
  name: "App",

  components: {
    ProjectList,
    ProjectView,
    ListHeader,
    PomoView,
    EmptyProjectListView,
  },

  data: () => ({
    projects: [],
    activeProject: {},
    timedProjectId: null,
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
      var newProject = { name: "", id: newId, pomos: { planned: 0, done: 0 } };
      this.projects.push(newProject);
      this.activeProject = newProject;
      this.$refs.projectView.focusForm();
    },
    deleteProject(activeProject) {
      const idx = this.projects.indexOf(activeProject);
      if (idx > -1) {
        this.projects.splice(idx, 1);
      }
      if (this.projects.length > 0) {
        this.activeProject = this.projects[this.projects.length - 1];
      } else {
        this.activeProject = {};
      }
    },
    onTimerStarted(timedProjectId) {
      this.timedProjectId = timedProjectId;
    },
    onTimerFinished() {
      this.timedProjectId = null;
    },
  },
  created() {
    require("electron").ipcRenderer.on("closing", () => {
      store.saveProjects(this.projects); //callback to save project data on window closing event of main process
    });

    this.projects = store.getProjects();
    this.activeProject = this.projects[0];
  },
};
</script>
