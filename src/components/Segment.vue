<template>
  <div class="flex flex-center segment">
    <div class="background"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Segment',
  props: {
    index: Number
  }
}
</script>

<style lang="stylus" scoped>
$bg-hue-anim-params = 10s ease-in-out infinite alternate
@keyframes bg-hue-anim
  from
    filter invert(0.75) sepia(1) saturate(10) hue-rotate(0deg)
  to
    filter invert(0.75) sepia(1) saturate(10) hue-rotate(360deg)

$bg-opacity-anim-params = 2s ease-in infinite alternate
@keyframes bg-opacity-anim
  from
    opacity 0.15
  to
    opacity 0.4

.segment
  position relative
  width 100%
  padding 1em
  background-color #33393F
  .background
    position absolute
    z-index 3
    width 100%
    height 100%
    opacity 0.15
    background-image url("~assets/circuit-board.svg")
    background-size auto
    background-repeat repeat
  &.pos
    background-color #126CC4
    box-shadow 0 0 5em #000
  *
    z-index 4

.mode-animated
  .segment
    .background
      animation bg-hue-anim $bg-hue-anim-params
    &.pos
      .background
        filter invert(0.75) sepia(1) saturate(10) hue-rotate(175deg)
        animation bg-opacity-anim $bg-opacity-anim-params

.mode-3d
  .segment
    .background
      display none
    &.pos
      background-color rgba(#126CC4, 0.5)
      box-shadow 0 0 5em #000
</style>
