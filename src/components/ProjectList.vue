<template>
  <div>
    <v-list outlined="true" two-line="true" max-width="250px">
      <v-subheader>Projects</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(project, i) in projects" :key="i">
          <!-- <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>-->
          <v-list-item-content>
            <v-list-item-title v-text="project.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "ProjectList",

  data() {
    return {
      projects: [
        { name: "Unnamed Chat App" },
        { name: "timetrk" },
        { name: "MotionDetectorBot" },
        { name: "Whatever" }
      ]
    };
  }
};
</script>

<style scoped>
</style>