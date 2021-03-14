<template>
  <div style="height: 250px">
    <div class="circle">
      <svg width="300" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(110,110)">
          <circle r="100" class="e-c-base" />
          <g transform="rotate(-90)">
            <circle
              r="100"
              class="e-c-progress"
              :stroke-dasharray="length"
              :stroke-dashoffset="circleDashOffset"
            />
            <g id="e-pointer" :style="pointer">
              <circle cx="100" cy="0" r="8" class="e-c-pointer" />
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div class="controlls">
      <div class="display-remain-time">{{ currentTime }}</div>
      <v-row justify="center">
        <button :class="playPauseObject" id="pause" @click="onPlayPause"></button>
        <span class="slash">/</span>
        <button id="stop" @click="onStop"></button>
      </v-row>
    </div>
  </div>
</template>

<script>
import { PomodoroTimer } from "../utils/PomodoroTimer";
import { timerState } from "../utils/constants";
export default {
  name: "PomoTimer",
  data() {
    return {
      length: Math.PI * 2 * 100,
      pointer: {
        transform: `rotate(360deg)`,
      },
      currentState: timerState.STOPPED,
      intervalTimer: null,
      // this is -1 so that the offset of the seconds animation is correct
      timePassed: -1,
      timerId: 0,
      mutableMinutes: this.minutes,
      mutableSeconds: this.seconds,
      timedProjectId: null,
    };
  },
  computed: {
    playPauseObject() {
      if (this.currentState === timerState.RUNNING) {
        return { pause: true };
      } else {
        return { play: true };
      }
    },
    currentTime() {
      let minutes =
        this.mutableMinutes < 10
          ? "0" + this.mutableMinutes
          : this.mutableMinutes;
      let seconds =
        this.mutableSeconds < 10
          ? "0" + this.mutableSeconds
          : this.mutableSeconds;
      return `${minutes}:${seconds}`;
    },
    timeLimit() {
      return this.minutes * 60 + this.seconds;
    },
    timeLeft() {
      return this.timeLimit - this.timePassed;
    },
    // Update the dashoffset value as time passes
    circleDashOffset() {
      if (this.timePassed < 1) {
        return `${-this.length}`;
      } else {
        return `${-this.length - this.length * this.timeFraction}`;
      }
    },
    timeFraction() {
      // Divides time left by the defined time limit.
      return this.timeLeft / this.timeLimit;
    },
  },
  watch: {
    minutes() {
      this.mutableMinutes = this.minutes;
    },
    seconds() {
      this.mutableSeconds = this.seconds;
    },
  },
  props: {
    minutes: {
      type: Number,
      validator: (value) => {
        return value >= 0 && value <= 60;
      },
      default: 25,
    },
    seconds: {
      type: Number,
      validator: (value) => {
        return value >= 0 && value <= 59;
      },
      default: 0,
    }
  },
  methods: {
    run: function () {
      this.currentState = timerState.RUNNING;
    },
    pause: function () {
      this.currentState = timerState.PAUSED;
    },
    stop: function (cancelled) {
      this.currentState = timerState.STOPPED;
      if (!cancelled) {
        this.$emit("on-timer-finished");
      } else {
        this.$emit("on-timer-cancelled");
      }
    },
    onPlayPause: function () {
      this.currentState === timerState.RUNNING
        ? this.pauseCountdown()
        : this.runCountdown();
    },
    onStop: function () {
      if (!(this.currentState === timerState.STOPPED)) {
        PomodoroTimer.stopCountdown(this.timerId);
        this.stop(true);
        this.resetTime();
        this.timePassed = -1;
        this.pointer.transform = `rotate(360deg)`;
      }
    },
    runCountdown: function () {
      if (this.currentState === timerState.STOPPED) {
        this.resetTime();
        this.timedProjectId = this.$store.state.activeProject.id;
      }

      this.timerId = PomodoroTimer.startCountdown(
        this.mutableMinutes,
        this.mutableSeconds,
        this.updateComponentTime
      );
      this.run();
      this.$emit("on-timer-started", this.timedProjectId);
    },
    pauseCountdown: function () {
      PomodoroTimer.pauseCountdown(this.timerId);
      this.pause();
    },
    updateComponentTime: function (seconds) {
      let time = PomodoroTimer.remainingTime(seconds);
      this.mutableMinutes = Number(time.mm);
      this.mutableSeconds = Number(time.ss);
      this.timePassed = this.timeLimit - seconds;
      this.pointer.transform = `rotate(${360 * this.timeFraction}deg)`;
      if (time.running === false) {
        this.timePassed = -1;
        this.timedProjectId = null;
        this.stop(false);
      }
    },
    resetTime: function () {
      this.mutableMinutes = this.minutes;
      this.mutableSeconds = this.seconds;
    },
  },
};
</script>

<style lang="scss" scoped>
.controlls {
  position: relative;
  top: -215px;
  text-align: center;
}

.display-remain-time {
  font-family: "Roboto";
  font-weight: 100;
  font-size: 65px;
  color: var(--v-primary-base);
}

.slash {
  width: 30px;
  height: 30px;
  color: var(--v-primary-base);
  font-size: 35px;
  padding-right: 10px;
}

#pause {
  outline: none;
  background: transparent;
  border: none;
  margin-top: 10px;
  width: 30px;
  height: 30px;
  position: relative;
}

#stop {
  outline: none;
  margin-top: 10px;
  position: relative;
  align-self: center;
  width: 25px;
  height: 25px;
  background-color: var(--v-primary-base);
}

.play::before {
  display: block;
  content: "";
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 22px solid var(--v-primary-base);
}

.pause::after {
  display: block;
  content: "";
  width: 15px;
  height: 25px;
  background-color: transparent;
  border-radius: 1px;
  border: 5px solid var(--v-primary-base);
  border-top: none;
  border-bottom: none;
}

#pause:hover {
  opacity: 0.8;
}

.e-c-base {
  fill: none;
  stroke: #b6b6b6;
  stroke-width: 4px;
}

.e-c-progress {
  fill: none;
  stroke: var(--v-primary-base);
  stroke-width: 4px;
  transition: stroke-dashoffset 0.7s;
}

.e-c-pointer {
  fill: #fff;
  stroke: var(--v-primary-base);
  stroke-width: 2px;
}

#e-pointer {
  transition: transform 0.7s;
}
</style>
