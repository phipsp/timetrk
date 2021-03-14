<template>
  <v-container>
    <v-row align="center" justify="center">
      <PomoTimer
        :minutes="minutes"
        :seconds="seconds"
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
import {
  timerNotificationTitle,
  timerNotificationOptions,
} from "@/utils/constants.js";
export default {
  name: "PomoView",
  components: {
    PomoTimer,
    PomoSettingsModal,
  },
  data() {
    return {
      minutes: 25,
      seconds: 0,
      pomoCounter: 0,
      cycleCounter: 0,
      isBreakTimer: false,
      options: false,
    };
  },
  methods: {
    onTimerFinished() {
      this.$emit("on-timer-finished");
      if (this.isBreakTimer) {
        this.minutes = this.focusDurationInMinutes;
        this.isBreakTimer = false;
        new Notification(
          timerNotificationTitle,
          timerNotificationOptions.DONE_BREAK_START_SESSION
        );
        return;
      }

      this.pomoCounter++;
      if (this.pomoCounter >= this.pomosPerCylce) {
        this.cycleCounter++;
        this.pomoCounter = 0;
        this.minutes = this.$store.state.pomoSettings.longBreakInMinutes;
        this.isBreakTimer = true;
        this.$emit("update-done-pomos");
        new Notification(
          timerNotificationTitle,
          timerNotificationOptions.DONE_SESSION_START_LONG_BREAK
        );
      } else {
        this.minutes = this.shortBreakInMinutes;
        this.isBreakTimer = true;
        this.$emit("update-done-pomos");
        new Notification(
          timerNotificationTitle,
          timerNotificationOptions.DONE_SESSION_START_SHORT_BREAK
        );
      }
    },
    onTimerStarted(timedProjectId) {
      this.$emit("on-timer-started", timedProjectId);
    },
    onTimerCancelled() {
      this.minutes = this.$store.state.pomoSettings.focusDurationInMinutes;
      this.seconds = 0;
      this.$emit("on-timer-cancelled");
    },
    cancel() {
      this.options = false;
    },
    save() {
      this.minutes = this.$store.state.pomoSettings.focusDurationInMinutes;
      this.options = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
