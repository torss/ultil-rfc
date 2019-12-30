<template>
  <div class="bubble flex flex-center">
    <q-card>
      <slot name="pre"></slot>
      <q-card-section class="card-title" v-if="!!this.$slots.title">
        <slot name="title"></slot>
      </q-card-section>
      <q-separator v-if="!!this.$slots.title" />
      <q-card-section class="card-main">
        <slot></slot>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Bubble'
}
</script>

<style lang="stylus" scoped>
.bubble
  flex-basis 100%

.q-card
  text-align center
  max-width 50em
  transition all 1s ease-in-out
  overflow hidden
  color white
  background-color #027BE3
  opacity 0.9
  margin-top 1em
  margin-bottom 1em
  text-shadow 0 0.1em 0 rgba(0,0,0,.5)

.card-main
  text-align left
  font-size 1em

.pos
  .q-card
    background-color #33393F

.neg
  .q-card
    background-color #DB2828
</style>
