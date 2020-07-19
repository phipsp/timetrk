<template>
  <v-container>
    <v-row align="center" justify="center">
      <PomoTimer
        :minutes="minutes"
        :seconds="seconds"
        @on-timer-finished="onTimerFinished"
      />
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
  data() {
    return {
      pomosPerCylce: 4,
      pomoMinutesDefault: 25,
      minutes: 1,
      seconds: 0,
      shortBreakInMinutes: 5,
      longBreakInMinutes: 30,
      pomoCounter: 0,
      cycleCounter: 0,
      isBreakTimer: false,
    };
  },
  methods: {
    onTimerFinished() {
      // 1 full cylce is done -> long break
      if (this.pomoCounter >= 4) {
        this.$emit('update-done-pomos');
        this.cycleCounter++;
        this.pomoCounter = 0;
        this.minutes = this.longBreakInMinutes;
        this.isBreakTimer = true;
        // 1 break is over -> focus time
      } else if (this.isBreakTimer) {
        this.minutes = this.pomoMinutesDefault;
        this.isBreakTimer = false;
        // 1 normal pomo is done -> short break
      } else {
        this.$emit('update-done-pomos');
        this.pomoCounter++;
        this.minutes = this.shortBreakInMinutes;
        this.isBreakTimer = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
