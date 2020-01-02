<template>
  <div class="logo">
    <img class="bottom" :src="src">
    <img class="top" alt="Ultil logo" :src="src">
  </div>
</template>

<script>
export default {
  name: 'MainLogoImage',
  props: {
    src: String
  }
}
</script>

<style lang="stylus" scoped>
@keyframes logo-blur-pulse
  from
    filter blur(10px)
  to
    filter blur(25px)

@keyframes logo-saturation-pulse
  from
    filter saturate(60%)
  to
    filter saturate(100%)

.logo img
  width 15em
  &.top
    position absolute
  &.bottom
    position absolute

.mode-animated img
  $logo-animation-params = 0.75s ease-in-out infinite alternate
  &.top
    animation logo-sat-pulse $logo-animation-params
  &.bottom
    animation logo-blur-pulse $logo-animation-params
</style>
