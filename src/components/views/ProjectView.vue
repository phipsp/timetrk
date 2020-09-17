<template>
  <div style="padding-top: 20px">
    <v-row justify="space-between">
      <v-text-field
        v-model="activeProject.name"
        :counter="20"
        :rules="nameRules"
        label="Project Name"
        required
        @submit="updateProjectName(activeProject.name)"
        ref="form"
      ></v-text-field>
      <v-btn class="ma-2" text icon color="white" large @click="showDeleteProject = true">
        <v-icon color="primary" large>mdi-delete</v-icon>
      </v-btn>
      <v-dialog v-model="showDeleteProject" max-width="400px">
        <ProjectDeleteModal
          @cancel="cancel"
          @delete-project="deleteProject"
          :projectName="activeProject.name"
        />
      </v-dialog>
    </v-row>
    <v-row style="padding-top: 20px">
      <v-col cols="6">
        <v-text-field
          v-model="activeProject.pomos.planned"
          label="Planned"
          placeholder="#"
          outlined
          @submit="updatePlannedPomos(activeProject.pomos.planned)"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="activeProject.pomos.done"
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
    progress() {
      if (this.activeProject.pomos.planned > this.activeProject.pomos.done) {
        return (
          (this.activeProject.pomos.done / this.activeProject.pomos.planned) *
          100
        ).toFixed(3);
      } else {
        return 100;
      }
    },
  },
  props: {
    activeProject: {
      type: Object,
      default: () => {},
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
