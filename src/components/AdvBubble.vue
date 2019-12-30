<template>
  <Bubble>
    <slot slot="title" name="title"></slot>
    <div class="flex gutter-md">
      <div class="side">
        <div class="subtitle textual">Textual</div>
        <slot name="textual"></slot>
      </div>
      <div class="side">
        <div class="subtitle non-textual">Non-Textual</div>
        <slot name="non-textual"></slot>
      </div>
    </div>
  </Bubble>
</template>

<script>
import Bubble from './Bubble'

export default {
  name: 'AdvBubble',
  components: {
    Bubble
  }
}
</script>

<style lang="stylus" scoped>
.subtitle
  text-align center
  &.textual
    color #FD0063
  &.non-textual
    color #4DE639

.side
  padding-right 0.75em
  padding-left 0.75em

@media (min-width: 768px)
  .side
    flex 0 0 50%
</style>
