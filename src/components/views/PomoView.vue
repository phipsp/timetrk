<template>
  <v-container>
    <v-row align="center" justify="center">
      <PomoTimer
        :minutes="minutes"
        :seconds="seconds"
        :activeProject="activeProject"
        @on-timer-finished="onTimerFinished"
        @on-timer-started="onTimerStarted"
        @on-timer-cancelled="onTimerCancelled"
      />
    </v-row>
    <v-row justify="end" style="padding-right: 70px">
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
            @click="options = true"
          >
            <v-icon color="primary" large>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Pomodoro Options</span>
      </v-tooltip>
      <v-dialog v-model="options" max-width="500px">
        <PomoSettingsModal @on-cancel="cancel" @on-save="save" />
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import PomoTimer from "@/components/PomoTimer";
import PomoSettingsModal from "@/components/modals/PomoSettingsModal";
export default {
  name: "PomoView",
  components: {
    PomoTimer,
    PomoSettingsModal,
  },
  data() {
    return {
      pomosPerCylce: 4,
      focusDurationInMinutes: 25,
      minutes: 25,
      seconds: 0,
      shortBreakInMinutes: 5,
      longBreakInMinutes: 30,
      pomoCounter: 0,
      cycleCounter: 0,
      isBreakTimer: false,
      options: false,
    };
  },
  props: {
    activeProject: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onTimerFinished() {
      this.$emit("on-timer-finished");
      // 1 full cylce is done -> long break
      if (this.pomoCounter >= 4) {
        this.$emit("update-done-pomos");
        this.cycleCounter++;
        this.pomoCounter = 0;
        this.minutes = this.longBreakInMinutes;
        this.isBreakTimer = true;
        // 1 break is over -> focus time
      } else if (this.isBreakTimer) {
        this.minutes = this.focusDurationInMinutes;
        this.isBreakTimer = false;
        // 1 normal pomo is done -> short break
      } else {
        this.$emit("update-done-pomos");
        this.pomoCounter++;
        this.minutes = this.shortBreakInMinutes;
        this.isBreakTimer = true;
      }
    },
    onTimerStarted(timedProjectId) {
      this.$emit("on-timer-started", timedProjectId);
    },
    onTimerCancelled() {
      this.minutes = this.focusDurationInMinutes;
      this.seconds = 0;
      this.$emit("on-timer-cancelled");
    },
    cancel() {
      this.options = false;
    },
    save(pomoSettings) {
      this.pomosPerCylce = pomoSettings.pomosPerCylce;
      this.focusDurationInMinutes = pomoSettings.focusDurationInMinutes;
      this.minutes = pomoSettings.focusDurationInMinutes;
      this.shortBreakInMinutes = pomoSettings.shortBreakInMinutes;
      this.longBreakInMinutes = pomoSettings.longBreakInMinutes;
      this.options = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
