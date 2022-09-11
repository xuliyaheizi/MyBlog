<template>
  <Common class="about-wrapper" :sidebar="false">
    <div class="about-top" :style="{ ...bgImageStyle }">
      <div>
        <ModuleTransition>
          <p v-if="this.$frontmatter.tagline !== null" class="description">
            {{ this.$frontmatter.tagline || this.$description}}
          </p>
        </ModuleTransition>
      </div>
    </div>
    <ModuleTransition delay="0.04">
      <div class="about-content">
        <div class="about-container v-card">
          <div class="content">
            <h3>目前大四，立志成为一名优秀架构师的男人</h3>
            <p>后续...待开发ing...</p>
          </div>
        </div>
      </div>
    </ModuleTransition>
  </Common>

</template>

<script>
import Common from '@theme/components/Common'
import {ModuleTransition} from '@vuepress-reco/core/lib/components'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'

export default {
  mixins: [moduleTransitonMixin],
  name: "About",
  //页面导航栏
  components: {Common, ModuleTransition},
  data(){
    return{

    }
  },
  computed:{

    bgImageStyle () {
      const initBgImageStyle = {
        textAlign: 'center',
        overflow: 'hidden',
        background: `
          url(${this.$frontmatter.bgImage
            ? this.$withBase(this.$frontmatter.bgImage)
            : require('../images/bg.svg')}) center/cover no-repeat
        `
      }
      const {
        bgImageStyle
      } = this.$frontmatter

      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl'

.about-wrapper
  margin: 0 auto;
  .about-top
    margin 0 auto
    position relative
    box-sizing border-box
    padding 0 20px
    height 100vh
    display flex
    align-items center
    justify-content center
    .description
      font-size: 2.5rem;
      font-weight 600
  .about-content
    flex 1 1 auto
    max-width 100%
    background: #8e9eab;  /* fallback for old browsers */      background: -webkit-linear-gradient(to right, rgb(142, 158, 171), rgb(238, 242, 243));  /* Chrome 10-25, Safari 5.1-6 */      background: linear-gradient(to right, rgb(142, 158, 171), rgb(238, 242, 243)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    //background linear-gradient(90deg,rgba(247,149,51,.1),rgba(243,112,85,.1) 15%,rgba(239,78,123,.1) 30%,rgba(161,102,171,.1) 44%,rgba(80,115,184,.1) 58%,rgba(16,152,173,.1) 72%,rgba(7,179,155,.1) 86%,rgba(109,186,130,.1))
    padding 50px 0 100px 0
    .about-container
      animation main 1s
      max-width 970px
      padding 50px 40px
      margin 0 auto 40px auto
      background-color #fff
      border-radius: 8px;
      box-shadow: 0 4px 8px 6px rgba(7,17,27,.06)!important;
      transition: all .3s;
      .v-card
        border-width thin
        display block
        outline none
        text-decoration none
        overflow-wrap break-word
        position relative
        white-space normal
      .content
        font-family Long Cang,cursive !important
        color: grey


@media (max-width: $MQMobile)
  .timeline-wrapper
    margin: 0 1.2rem;
</style>