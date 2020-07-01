<template>
  <div style="height: 340px">
    <div class="circle">
      <svg width="300" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(110,110)">
          <circle r="100" class="e-c-base" />
          <g transform="rotate(-90)">
            <circle r="100" class="e-c-progress" />
            <g id="e-pointer">
              <circle cx="100" cy="0" r="8" class="e-c-pointer" />
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div class="controlls">
      <div class="display-remain-time">00:30</div>
      <button class="play" id="pause"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PomoView',
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
