<template>
  <div class="main">
    <div class="title">
      <h1>使用指南</h1>
    </div>
    <div class="content">
      <div class="buy-info">
        <div class="buy-info-title">
          <h2>一、卖家须知</h2>
        </div>
        <div class="buy-info-cont">
          <h3>1.如何卖闲置物品</h3>
          <ul>
            <li>(1)闲置小程序导航栏中点击发布选择闲置转让</li>
            <li>(2)填写相关闲置物品信息并提交</li>
            <li>(3)根据填写的发货方式进行物品交易</li>
            <li>(4)审核,物品到账</li>
          </ul>
          <h3>2.提现什么时候到账？有门槛吗？</h3>
          <p>物品审核完成后发至个人中心的钱包账,72之内可以提现至绑定的银行卡账户</p>
          <h3>3.审核不通过的物品如何处理？</h3>
          <p>请详细阅读发布规则后,重新处理</p>
          <h3>4.争议处理</h3>
          <p>物品审核完成后如有异议,请在3日内提出,若超过3日则不再受理。</p>
        </div>
      </div>
      <div class="sell-info">
        <div class="sell-info-title">
          <h2>二、买家须知</h2>
        </div>
        <div class="sell-info-cont">
          <h3>1.完善个人信息</h3>
          <p>在购买商品前,买家一定要注意一下自己的个人信息,尽量设置好头像和昵称。</p>
          <h3>2.与卖家协商交易地点和时间</h3>
          <p>
            商品下单后,及时与卖家确定交易的时间和地点,确保商品准时到达买家手上。
          </p>
          <h3>3.买家收到货后仔细检查再确认收货</h3>
          <p>商品到手后,不要急着签收,可以先录制一个开箱视频,把物品外观仔细拍下来,以防和描述不符卖家又污蔑是发出后人为造成的
            确认没问题后就可以确认收货了，尽量不要拖，给卖家造成困扰。
          </p>
          <h3>4.售后处理</h3>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Common from '@theme/components/Common'
import {ModuleTransition} from '@vuepress-reco/core/lib/components'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'

export default {
  mixins: [moduleTransitonMixin],
  name: "Test1",
  //页面导航栏
  // components: {Common, ModuleTransition},
  data() {
    return {}
  },
  methods: {
    playerInit() {
      document.getElementById("aplayer-fixed").style.display = 'none';
    },
  },
  mounted() {
    this.playerInit();
  }
};

(function flexible(window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }

  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))

</script>
<style src="../styles/theme.styl" lang="stylus"></style>
<style scoped>
.main {
  font-size: 25px;
  font-family: kaiTi;
  width: 90%;
  height: 100%;
  margin-left: 5%;
  background: #fff;
  border-radius: 30px;
  box-shadow: 5px 5px 5px 5px #cdcfcf;
}

.main .title {
  text-align: center;
}

.main .content {
  margin: 50px auto;
  width: 80%;
  border-radius: 20px;


}

.content .buy-info-cont ul {
  list-style: none;
}

</style>