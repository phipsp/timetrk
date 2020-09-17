<template>
  <v-card>
    <v-card-title class="headline">Delete "{{ projectName }}"</v-card-title>
    <v-card-text>Are you sure you want to delete your project "{{ projectName }}"? All of its time tracking data will be lost.</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="$emit('cancel')">Cancel</v-btn>
      <v-btn color="green darken-1" text @click="$emit('delete-project')">Confirm</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProjectDeleteModal",
  props: {
    projectName: {
      type: String,
      default: () => "project",
    },
  },
};
</script>