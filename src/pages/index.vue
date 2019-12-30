<template>
  <q-page :class="['flex', {animated}]">
    <Segment>
      <q-btn class="dca-switch q-caption text-weight-light" no-caps @click.native="toggleMinimalAnimations">
        Click here to {{animated ? 'disable' : 'enable'}} costly animations.
      </q-btn>
      <MainLogo />
      <Bubble class="pos">
        <template slot="pre">
          <q-card-section class="card-title">
            <span class="text-weight-bold page-title">Ultil</span><br>
            Ultimate* Language**
          </q-card-section>
        </template>
        <span class="q-caption text-weight-light" style="opacity: 0.8">
          * Not actually ultimate, but the other 34 short abbreviations I tried were all taken, so there!<br>
          ** Only in form of this very rough RFC right now.
        </span>
      </Bubble>
      <Bubble>
        <template slot="title">
          Introduction
        </template>
        <p>
          I argue for the development of a non-textual general-purpose programming language.
          The idea is not to necessarily create a new "exotic" visual language,
          but rather to stay close to the common structure of established production languages (e.g. C),
          just without source code in textual (human-editable) form.
        </p>
        <p>
          This page briefly presents a few of the resulting potential advantages and challenges.
          It currently is only intended to vaguely communicate the general idea
          in the hope of gathering feedback for a more concrete endeavor.
        </p>
        So if you have any kind of ideas, comments, criticism or questions please let me know by opening a GitHub issue
        <a href="https://github.com/torss/ultil-rfc/issues">here</a>! :)
      </Bubble>
    </Segment>
    <Segment class="pos"  style="z-index: 2">
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
          Version control can't easily distinguish pure formatting changes and actual program changes.
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
            Possible approach
          </template>
          Due to my lack of experience, among other things, I consider starting with a somewhat reduced proof of concept such as this:
          Instead of creating an entirely new language targeting e.g. LLVM,
          the non-textual language would be a close superset of (and compile to) an existing general-purpose language.
          Rust might be interesting for this purpose.
          The specialized IDE would be created using Electron,
          which should suffice efficiency-wise since the (display) complexity likely would be similar to Visual Studio Code or Atom.
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

export default {
  name: 'PageIndex',
  components: {
    MainLogo,
    Segment,
    Bubble,
    AdvBubble
  },
  data: function () {
    return {
      animated: new URL(window.location.href).searchParams.get('dca') === null // dca: "disable costly animations"
    }
  },
  methods: {
    toggleMinimalAnimations () {
      const url = new URL(window.location.href)
      if (this.animated) {
        url.searchParams.set('dca', '')
      } else {
        url.searchParams.delete('dca')
      }
      window.location.replace(url.toString())
    }
  }
}
</script>

<style lang="stylus" scoped>
a
  color white
  font-weight bold
  text-shadow none
  text-shadow 0 0.05em 0 rgba(0,0,0,1)

.dca-switch
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
