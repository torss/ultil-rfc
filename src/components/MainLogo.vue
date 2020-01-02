<template>
  <div class="main-logo-wrapper flex flex-center">
    <div class="container">
      <MainLogoImage src="statics/ultil-logo-large-bg.svg" />
      <div class="logo-hover-shift">
        <MainLogoImage class="logo-hover" src="statics/ultil-logo-large-L.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import MainLogoImage from './MainLogoImage'

export default {
  name: 'MainLogo',
  components: {
    MainLogoImage
  }
}
</script>

<style lang="stylus" scoped>
.main-logo-wrapper
  flex-basis 100%

.container
  width 15em
  height 15em

@keyframes logo-hover
  from
    transform translatey(0em)
  to
    transform translatey(-1em)

@keyframes logo-hover-shift
  0%
    transform translatex(-0.5em) rotate(-2deg)
  25%
    transform translatex(0.5em) rotate(2deg)
  50%
    transform translatex(-0.25em) rotate(-3deg)
  100%
    transform translatex(0.25em) rotate(3deg)

.mode-animated
  .logo-hover-shift
    animation logo-hover-shift 6s ease-in-out infinite alternate
  .logo-hover
    animation logo-hover 2s ease-in-out infinite alternate

.mode-3d
  .main-logo-wrapper
    height 30vh
  .main-logo-wrapper
    visibility hidden
</style>
