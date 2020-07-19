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
      <div class="display-remain-time">
        {{ currentTime }}
      </div>
      <button
        :class="playPauseObject"
        id="pause"
        @click="onButtonClick"
      ></button>
    </div>
  </div>
</template>

<script>
import { PomodoroTimer } from '../utils/timer';
export default {
  name: 'PomoTimer',
  data() {
    return {
      length: Math.PI * 2 * 100,
      pointer: {
        transform: `rotate(360deg)`,
      },
      running: false,
      paused: false,
      stopped: true,
      intervalTimer: null,
      // this is -1 so that the offset of the seconds animation is correct
      timePassed: -1,
      timeLimit: this.minutes * 60 + this.seconds,
      timerId: 0,
      mutableMinutes: this.minutes,
      mutableSeconds: this.seconds,
    };
  },
  computed: {
    playPauseObject() {
      if (this.running) {
        return { pause: true };
      } else if (this.paused) {
        return { play: true };
      } else {
        return { play: this.stopped };
      }
    },
    currentTime() {
      let minutes =
        this.mutableMinutes < 10
          ? '0' + this.mutableMinutes
          : this.mutableMinutes;
      let seconds =
        this.mutableSeconds < 10
          ? '0' + this.mutableSeconds
          : this.mutableSeconds;
      return `${minutes}:${seconds}`;
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
    },
  },
  methods: {
    run: function() {
      this.running = true;
      this.paused = false;
      this.stopped = false;
    },
    pause: function() {
      this.running = false;
      this.paused = true;
      this.stopped = false;
    },
    stop: function() {
      this.running = false;
      this.paused = false;
      this.stopped = true;
      this.$emit('on-timer-finished');
    },
    onButtonClick: function() {
      this.running ? this.pauseCountdown() : this.runCountdown();
    },
    runCountdown: function() {
      if (this.stopped === true) {
        this.mutableMinutes = this.minutes;
        this.mutableSeconds = this.seconds;
      }

      this.timerId = PomodoroTimer.startCountdown(
        this.mutableMinutes,
        this.mutableSeconds,
        this.updateComponentTime
      );
      this.run();
    },
    updateComponentTime: function(seconds) {
      let time = PomodoroTimer.remainingTime(seconds);
      this.mutableMinutes = Number(time.mm);
      this.mutableSeconds = Number(time.ss);
      this.timePassed += 1;
      this.pointer.transform = `rotate(${360 * this.timeFraction}deg)`;
      if (time.running === false) {
        this.timePassed = -1;
        this.stop();
      }
    },
    pauseCountdown: function() {
      PomodoroTimer.pauseCountdown(this.timerId);
      this.pause();
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
  font-family: 'Roboto';
  font-weight: 100;
  font-size: 65px;
  color: $primary-color;
}

#pause {
  outline: none;
  background: transparent;
  border: none;
  margin-top: 10px;
  width: 50px;
  height: 50px;
  position: relative;
}

.play::before {
  display: block;
  content: '';
  position: absolute;
  top: 8px;
  left: 16px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 22px solid $primary-color;
}

.pause::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 12px;
  width: 15px;
  height: 30px;
  background-color: transparent;
  border-radius: 1px;
  border: 5px solid $primary-color;
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
  stroke: $primary-color;
  stroke-width: 4px;
  transition: stroke-dashoffset 0.7s;
}

.e-c-pointer {
  fill: #fff;
  stroke: $primary-color;
  stroke-width: 2px;
}

#e-pointer {
  transition: transform 0.7s;
}
</style>
