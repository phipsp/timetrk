<template>
  <div style="padding-top: 20px">
    <v-row justify="space-between">
      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="Project Name"
        required
        @submit="updateProjectName(name)"
        ref="form"
      ></v-text-field>
      <v-btn class="ma-2" text icon color="white" large @click="showDeleteProject = true">
        <v-icon color="primary" large>mdi-delete</v-icon>
      </v-btn>
      <v-dialog v-model="showDeleteProject" max-width="400px">
        <ProjectDeleteModal
          @cancel="cancel"
          @delete-project="deleteProject"
          :projectName="name"
        />
      </v-dialog>
    </v-row>
    <v-row style="padding-top: 20px">
      <v-col cols="6">
        <v-text-field
          v-model="pomos.planned"
          label="Planned"
          placeholder="#"
          outlined
          @submit="updatePlannedPomos(pomos.planned)"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="pomos.done"
          label="Done"
          placeholder="0"
          append-icon="mdi-check-circle-outline"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-progress-linear v-model="progress" height="10" rounded></v-progress-linear>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProjectDeleteModal from "@/components/modals/ProjectDeleteModal.vue";
export default {
  name: "ProjectView",
  components: { ProjectDeleteModal },
  data() {
    return {
      projectName: "",
      nameRules: [
        (v) => !!v || "Project name is required",
        (v) =>
          (v && v.length <= 20) ||
          "Project name must be less than 20 characters",
      ],
      showDeleteProject: false,
    };
  },
  computed: {
    ...mapState(['activeProject']),
    name: {
      get() { return this.activeProject.name; },
      set(val) { this.$store.commit('SET_ACTIVE_PROJECT_NAME', val); }
    },
    pomos: {
      get() { return this.activeProject.pomos; },
      set(val) { this.$store.commit('SET_ACTIVE_PROJECT_POMOS', val); }
    },
    progress() {
      if (this.pomos.planned > this.pomos.done) {
        return (
          (this.pomos.done / this.pomos.planned) *
          100
        ).toFixed(3);
      } else {
        return 100;
      }
    },
  },
  methods: {
    updateProjectName(newName) {
      this.$emit("update-project-name", newName);
    },
    updatePlannedPomos(plannedPomos) {
      this.$emit("update-planned-pomos", plannedPomos);
    },
    focusForm: function () {
      this.$refs.form.focus();
    },
    cancel() {
      this.showDeleteProject = false;
    },
    deleteProject() {
      this.$emit("delete-project", this.activeProject);
      this.showDeleteProject = false;
    },
  },
};
</script>

<style scoped>
container {
  width: 100%;
}
</style>
