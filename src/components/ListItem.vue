<template>
  <div>
    <v-card>
      <v-card-title>{{project.name}}</v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: ["project"]
};
</script>

<style scoped>
</style>