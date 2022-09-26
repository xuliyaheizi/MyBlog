<template>
  <div class="theme-container" :class="pageClasses">
    <div v-if="!absoluteEncryption">
      <transition name="fade">
        <LoadingPage v-show="firstLoad" class="loading-wrapper"/>
      </transition>

      <transition name="fade">
        <Password v-show="!isHasKey" class="password-wrapper-out" key="out"/>
      </transition>

      <div :class="{ 'hide': firstLoad || !isHasKey }">
        <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>

        <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

        <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
          <PersonalInfo slot="top"/>
          <slot name="sidebar-bottom" slot="bottom"/>
        </Sidebar>

        <Password v-show="!isHasPageKey" :isPage="true" class="password-wrapper-in" key="in"></Password>
        <div :class="{ 'hide': !isHasPageKey }">
          <slot></slot>
        </div>
      </div>
    </div>
    <div v-else>
      <transition name="fade">
        <LoadingPage v-if="firstLoad"/>
        <Password v-else-if="!isHasKey"/>
        <div v-else>
          <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>

          <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

          <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
            <PersonalInfo slot="top"/>
            <slot name="sidebar-bottom" slot="bottom"/>
          </Sidebar>

          <Password v-if="!isHasPageKey" :isPage="true"></Password>
          <slot v-else></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {defineComponent, computed, ref, onMounted} from '@vue/composition-api'
import Navbar from '@theme/components/Navbar'
import Sidebar from '@theme/components/Sidebar'
import PersonalInfo from '@theme/components/PersonalInfo'
import Password from '@theme/components/Password'
import {setTimeout} from 'timers'

export default defineComponent({
  components: {Sidebar, Navbar, Password, PersonalInfo},

  props: {
    sidebar: {
      type: Boolean,
      default: true
    },
    sidebarItems: {
      type: Array,
      default: () => []
    },
    recoShowModule: {
      type: Boolean,
      default: false
    }
  },

  setup(props, ctx) {
    const {root} = ctx

    const isSidebarOpen = ref(false)
    const isHasKey = ref(true)
    const isHasPageKey = ref(true)
    const firstLoad = ref(true)

    const shouldShowSidebar = computed(() => props.sidebarItems.length > 0)
    const absoluteEncryption = computed(() => {
      return root.$themeConfig.keyPage && root.$themeConfig.keyPage.absoluteEncryption === true
    })
    const shouldShowNavbar = computed(() => {
      const {themeConfig} = root.$site
      const {frontmatter} = root.$page

      if (
          frontmatter.navbar === false ||
          themeConfig.navbar === false
      ) return false

      return (
          root.$title ||
          themeConfig.logo ||
          themeConfig.repo ||
          themeConfig.nav ||
          root.$themeLocaleConfig.nav
      )
    })
    const pageClasses = computed(() => {
      const userPageClass = root.$frontmatter.pageClass
      return {
        ...{
          'no-navbar': !shouldShowNavbar.value,
          'sidebar-open': isSidebarOpen.value,
          'no-sidebar': !shouldShowSidebar.value
        },
        ...userPageClass
      }
    })

    const hasKey = () => {
      const {keyPage} = root.$themeConfig
      if (!keyPage || !keyPage.keys || keyPage.keys.length === 0) {
        isHasKey.value = true
        return
      }

      let {keys} = keyPage
      keys = keys.map(item => item.toLowerCase())
      isHasKey.value = keys && keys.indexOf(sessionStorage.getItem('key')) > -1
    }
    const initRouterHandler = () => {
      root.$router.afterEach(() => {
        isSidebarOpen.value = false
      })
    }
    const hasPageKey = () => {
      let pageKeys = root.$frontmatter.keys
      if (!pageKeys || pageKeys.length === 0) {
        isHasPageKey.value = true
        return
      }

      pageKeys = pageKeys.map(item => item.toLowerCase())

      isHasPageKey.value = pageKeys.indexOf(sessionStorage.getItem(`pageKey${window.location.pathname}`)) > -1
    }
    const toggleSidebar = (to) => {
      isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
    }
    const handleLoading = () => {
      const time = root.$frontmatter.home && sessionStorage.getItem('firstLoad') == undefined ? 1000 : 0
      setTimeout(() => {
        firstLoad.value = false
        if (sessionStorage.getItem('firstLoad') == undefined) sessionStorage.setItem('firstLoad', false)
      }, time)
    }

    onMounted(() => {
      initRouterHandler()
      hasKey()
      hasPageKey()
      handleLoading()
    })

    return {
      isSidebarOpen,
      absoluteEncryption,
      shouldShowNavbar,
      shouldShowSidebar,
      pageClasses,
      hasKey,
      hasPageKey,
      isHasKey,
      isHasPageKey,
      toggleSidebar,
      firstLoad
    }
  },

  watch: {
    $frontmatter(newVal, oldVal) {
      this.hasKey()
      this.hasPageKey()
    }
  },

  data() {
    return {
      weixiShare: null,
    }
  },
  methods: {
    weiXin() {
      const axios = require('axios');
      //请求微信配置参数接口（获取签名），由后台给接口给
      const urls = window.location.href.split('#')[0];
      console.log(urls)
      axios.get("/api/wxConfig?url=" + urls).then(res => {
        //微信加签
        console.log(res.data)
        const obj = {
          debug: true,
          appId: res.data.obj.appId,
          nonceStr: res.data.obj.nonceStr,
          signature: res.data.obj.signature,
          timestamp: res.data.obj.timestamp,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
        };
        let shareData = {
          title: this.$frontmatter.title, // 分享标题
          desc: this.$frontmatter.description, // 分享描述
          link: urls, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
          imgUrl: 'https://oss.zhulinz.top/newImage/202209251447369.png', // 分享图标
        };
        //微信引用
        this.weXinShare(obj, shareData);
      })

    },
    weXinShare(data, shareData) {
      const wx = require('weixin-js-sdk') || window['wx'];
      console.log("开始微信分享测试")
      wx.config({
        debug: data.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。（测试记得关掉）
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.checkJsApi({
        jsApiList: ['chooseImage', 'updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          console.log(res, 'checkJsApi')
        }
      });
      wx.ready(function () {
        // //分享到朋友圈”及“分享到QQ空间”
        wx.updateTimelineShareData({
          title: shareData.title, // 分享标题
          link: shareData.link + '&t=' + data.timestamp + '&Content=1', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareData.imgUrl, // 分享图标
          success: function (res) {
            // 设置成功
            alert("分享朋友圈成功返回的信息为:" + res)
          }
        })

        //“分享给朋友”及“分享到QQ”
        wx.updateAppMessageShareData({
          title: shareData.title, // 分享标题
          desc: shareData.desc, // 分享描述
          link: shareData.link + '&t=' + data.timestamp + '&Content=1', // 分享链接 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareData.imgUrl, // 分享图标
          success: function (res) {
            alert("分享朋友成功返回的信息为:" + res);
          }
        })

      });
      wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        alert('验证失败返回的信息:' + res);
      });
    }
  },
  mounted() {
    this.weiXin()
    this.$router.afterEach(() => {
      this.weiXin()
    })
  }
})
</script>

<style lang="stylus" scoped>
.theme-container
  .loading-wrapper
    position absolute
    z-index 22
    top 0
    bottom 0
    left 0
    right 0
    margin auto

  .password-wrapper-out
    position absolute
    z-index 21
    top 0
    bottom 0
    left 0
    right 0
    margin auto

  .password-wrapper-in
    position absolute
    z-index 8
    top 0
    bottom 0
    left 0
    right 0

  .hide
    height 100vh
    overflow hidden

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-in-out .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
