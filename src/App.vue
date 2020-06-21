<template>
  <v-app>
    <v-app-bar app color="primary" flat="true">
      <div class="d-flex align-center">
        <v-img alt="timetrk logo" contain src="./assets/logo.png" width="100" />
      </div>
    </v-app-bar>

    <v-main>
      <v-layout col md4>
        <project-list />
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import ProjectList from "./components/ProjectList.vue";

export default {
  name: "App",

  components: { ProjectList },

  data: () => ({
    //
  })
};
</script>
