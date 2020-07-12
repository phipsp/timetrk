<template>
  <v-container>
    <v-row align="center" justify="center">
      <PomoTimer />
    </v-row>
    <v-row justify="end" style="padding-right: 55px">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2"
            text
            icon
            color="white"
            large
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="primary" large>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Options</span>
      </v-tooltip>
    </v-row>
  </v-container>
</template>

<script>
import PomoTimer from './PomoTimer';
export default {
  name: 'PomoView',
  components: {
    PomoTimer,
  },
};
</script>

<style lang="scss" scoped></style>
