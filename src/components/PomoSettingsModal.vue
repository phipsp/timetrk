<template>
  <v-card>
    <v-card-title class="headline">Options</v-card-title>
    <v-card-text
      >Let Google help apps determine location. This means sending anonymous
      location data to Google, even when no apps are running.</v-card-text
    >
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="cancel">Cancel</v-btn>
      <v-btn color="green darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PomoSettingsModal',
  methods: {
    save() {
      // todo
      this.$emit('on-save');
    },
    cancel() {
      this.$emit('on-cancel');
    },
  },
};
</script>

<style lang="sass" scoped></style>
