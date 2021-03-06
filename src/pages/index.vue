<template>
  <q-page :class="['flex', 'mode-' + mode]">
    <canvas class="three-canvas" ref="canvas" />
    <Segment>
      <MainLogo />
      <q-btn-toggle class="mode-switch q-caption text-weight-light" no-caps
        :value="mode"
        @input="changeMode"
        :options="[
          {label: 'Basic page', value: 'basic'},
          {label: 'Animated page', value: 'animated'},
          {label: '3D page', value: '3d'}
        ]"
      />
      <Bubble class="pos">
        <template slot="pre">
          <q-card-section class="card-title">
            <span class="text-weight-bold page-title">Ultil</span><br>
            Ultimate* Language**
          </q-card-section>
        </template>
        <span class="q-caption text-weight-light" style="opacity: 0.8">
          * Not actually ultimate, but the other 34 short abbreviations I tried were all taken, so there!<br>
          ** Has yet to be implemented - see the "Prototype" section at the bottom.
        </span>
        <br><br>
        <div class="text-center">
          Page version {{ version }}
        </div>
      </Bubble>
      <Bubble>
        <template slot="title">
          Introduction
        </template>
        <p>
          I argue for the development of a non-textual general-purpose programming language.
          The idea is not to necessarily create a new "exotic" visual language,
          but rather to mostly stay close to the common structure of established production languages (e.g. C),
          just without source code in textual form.
          While I believe that there is substantial untapped potential that could be exploited by decoupling a language from the typical textual form,
          creating such a new language would naturally be a non-trivial endeavor.
        </p>
        <p>
          This page briefly presents a few of the resulting potential advantages and challenges.
          It currently is only intended to vaguely communicate the general idea,
          not a comprehensive discussion.
        </p>
      </Bubble>
    </Segment>
    <Segment class="pos" style="z-index: 2">
      <AdvBubble>
        <template slot="title">
          <img class="section-icon" src="~assets/section/advantage/decoupled-syntax.svg" /><br>
          1. Decoupled syntax
        </template>
        <p slot="textual">
          Reserved keywords or symbols are a necessity to define a stable text-based syntax.
          Changes and extensions to the language can become difficult without breaking existing code or introducing sub-optimal workarounds.
        </p>
        <p slot="non-textual">
          The internal representation and the displayed code can be fully decoupled,
          eliminating the need for a frozen text-based syntax entirely.
        </p>
      </AdvBubble>
      <AdvBubble>
        <template slot="title">
          <img class="section-icon" src="~assets/section/advantage/unrestricted-naming.svg" /><br>
          2. Unrestricted naming
        </template>
        <p slot="textual">
          User-defined names have to be chosen.
          Changing library interface names might break user code.
          Short, undescriptive names might be used to reduce clutter, for quick typing, or for prototyping.
        </p>
        <p slot="non-textual">
          Code parts can be linked via internal IDs.
          Multiple user-defined names can be assigned at arbitrary points in time without breaking any code.
          The display can automatically shorten long names or select short variants if desired by the current developer.
          Automatically created identicons or user-defined icons could be used in addition.
        </p>
      </AdvBubble>
      <AdvBubble>
        <template slot="title">
          <img class="section-icon" src="~assets/section/advantage/no-explicit-formatting.svg" /><br>
          3. No explicit formatting
        </template>
        <p slot="textual">
          Code style guidelines and specialized tools are created per language to deal with formatting.
          This also includes relatively language-agnostic issues like indentation or naming-schemes (such as camel-case, snake-case, all-caps).
          Version control can't always distinguish pure formatting changes and actual program changes.
        </p>
        <p slot="non-textual">
          There is no need for explicit formatting at all.
          The code display automatically adjusts according to each individual developer's local preferences.
          Names don't need any special scheme.
        </p>
      </AdvBubble>
      <AdvBubble>
        <template slot="title">
          <img class="section-icon" src="~assets/section/advantage/direct-docs.svg" /><br>
          4. Direct documentation
        </template>
        <p slot="textual">
          Documentation exists in the form of comments,
          possibly with special syntax to generate dedicated files (e.g. HTML, PDF).
        </p>
        <p slot="non-textual">
          Documentation without formatting restrictions could be attached directly to every part of the code.
          E.g. individual function parameters or specific ranges of code.
          Non-textual information such as images may be inserted and displayed without generating dedicated files.
        </p>
      </AdvBubble>
      <Bubble>
        <span class="q-caption text-weight-light" style="opacity: 0.8">
          Note again that this list is certainly not comprehensive.
        </span>
      </Bubble>
    </Segment>
    <Segment>
      <Bubble class="pos">
        Creating a non-textual language also leads to some challenges a new textual language wouldn't have:
        <Bubble class="neg">
          <template slot="title">
            <img class="section-icon" src="~assets/section/challenge/custom-ide.svg" /><br>
            1. Special IDE necessary
          </template>
          Common textual code editors / IDEs obviously can't simply handle a non-textual language
          and trying to build extensions might prove severely inefficient.
          Thus a new specialized IDE would most likely be required to fully realize all potential advantages.
        </Bubble>
        <Bubble class="neg">
          <template slot="title">
            <img class="section-icon" src="~assets/section/challenge/version-control-tree.svg" /><br>
            2. Textual version control is incompatible
          </template>
            It might be possible to store the internal data using a textual format that sensibly represents changed "lines",
            but the version control usability would surely suffer in contrast to any common explicitly human-readable textual language.

            Instead, a specific version control system could be built into the non-textual language,
            possibly in synergy with the custom IDE to utilize up to perfect editing-step information.
            So even though extra implementation work is necessary upfront as part of the language development,
            the built-in version control could actually provide superior functionality for developers.
        </Bubble>
        <Bubble class="neg">
          <template slot="title">
            <img class="section-icon" src="~assets/section/challenge/snippet-embedding.svg" /><br>
            3. Embedding code snippets outside the IDE
          </template>
          Sharing code snippets without requiring the IDE should be possible without resorting to screenshots.
          This could be done e.g. for web pages via JavaScript libraries analogous to syntax highlighters.
          Or a more general approach might even be to provide exportable textual snippet representations,
          since static snippets shouldn't require the full non-textual language capabilities.
        </Bubble>
      </Bubble>
      <Bubble class="pos">
          <template slot="title">
            <img class="section-icon" src="~assets/section/implementation-approach.svg" /><br>
            Prototype
          </template>
          I've started work on a private prototype, beginning with the creation of a custom Ultil IDE.
          This IDE is built in form of a web application.
          The first approach was based on Vue.js (the Quasar Framework to be precise),
          but that was scrapped in favor of a leaner second approach,
          which uses regular JavaScript to control Web APIs directly without any framework.
          This of course allows for more fine-grained control,
          and will also simplify a later rewrite of the Ultil IDE using the Ultil language itself,
          which could be used to represent a JavaScript superset
          (Ultil should be specified in a way that is flexible enough to easily represent any textual programming language,
          although that isn't the primary goal).
          At the currently still early stage of development
          the focus lies on the creation of an effectively usable IDE UI specialized for this non-textual language.
          It is likely that a truly useable Ultil system will take multiple years (starting 2020) to develop,
          assuming the development continues as a solo project in my spare time.
      </Bubble>
      <Bubble class="q-caption text-weight-light" style="opacity: 0.8">
        <div class="text-weight-bold" style="text-align: center">
          Credits
        </div>
        <q-separator />
        Author: <a href="https://github.com/torss">Torsten Schlett</a>
        <q-separator />
        This page was built using the <a href="https://quasar-framework.org/">Quasar Framework</a> (i.e. Vue.js).
        <q-separator />
        Repeatable SVG background pattern:
        "<a href="https://www.heropatterns.com/svg/circuit-board.zip">Circuit Board</a>"
        taken from the "<a href="https://www.heropatterns.com">Hero Patterns</a>" collection
        by <a href="https://twitter.com/steveschoger">Steve Schoger</a>
        is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
      </Bubble>
    </Segment>
  </q-page>
</template>

<script>
import MainLogo from '../components/MainLogo.vue'
import Segment from '../components/Segment.vue'
import Bubble from '../components/Bubble.vue'
import AdvBubble from '../components/AdvBubble.vue'
import { initThree, deinitThree } from '../internal/InitThree'
import { version } from '../../package.json'

export default {
  name: 'PageIndex',
  components: {
    MainLogo,
    Segment,
    Bubble,
    AdvBubble
  },
  data: function () {
    let mode = new URL(window.location.href).searchParams.get('mode')
    switch (mode) {
      case 'basic':
      case 'animated':
      case '3d':
        break
      default:
        mode = 'basic'
        break
    }
    return {
      mode,
      version
    }
  },
  mounted () {
    if (this.mode === '3d') initThree(this)
  },
  beforeDestroy () {
    if (this.mode === '3d') deinitThree(this)
  },
  methods: {
    changeMode (newValue) {
      const url = new URL(window.location.href)
      url.searchParams.set('mode', newValue)
      window.location.replace(url.toString())
    }
  }
}
</script>

<style lang="stylus" scoped>
.three-canvas
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 2
  pointer-events none

a
  color white
  font-weight bold
  text-shadow none
  text-shadow 0 0.05em 0 rgba(0,0,0,1)

.mode-switch
  opacity 0.8
  background-color #33393F
  color #97999D
  margin-top 1em
  margin-bottom 2em

.section-icon
  width 15em
  height 15em

.page-title
  font-size 34px
</style>
