<template>
  <div>
    <v-list two-line style="max-height: 500px" class="overflow-y-auto">
      <v-list-item-group mandatory color="primary">
        <template v-for="(project, index) in projects">
          <v-list-item :key="project.id + 'A'" @click="updateSelected(project)">
            <!-- TODO: Find better solution for key than + A -->
            <v-badge
              color="green"
              dot
              inline
              left
              :value="timedProjectId === project.id"
            >
              <v-list-item-content>
                <v-list-item-title> {{ project.name }}</v-list-item-title>
              </v-list-item-content>
            </v-badge>
          </v-list-item>
          <v-divider
            v-if="index + 1 < projects.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',

  data() {
    return {
      selectedProject: {},
    };
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    timedProjectId: {
      type: Number,
      default: () => -1,
    },
  },
  methods: {
    updateSelected(project) {
      this.selectedProject = project;
      this.$emit('projectSelected', project);
    },
  },
};
</script>

<style scoped></style>
