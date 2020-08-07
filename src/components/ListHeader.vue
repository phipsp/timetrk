<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="9">
        <h1>Projects</h1>
      </v-col>
      <v-col cols="3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              elevation="0"
              small
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="$emit('createProject')"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Create New Project</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ListHeader',
};
</script>

<style scoped></style>
