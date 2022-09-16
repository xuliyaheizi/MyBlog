<template>
  <div class="test1-wrapper">
    <div class="story_xz">
      <pre>
                一年前，我偶然看见了这样一个漫画，是这样一个关于环境保护的手绘海报，看完过后感触颇深，当资源耗尽，当垃圾成山，人类文明或许将不复存在。

                我曾经这样想过“全球有75.95亿人口，渺渺众生，我不过是沧海一粟，我知道要保护环境，但我的人生不过须臾，改变不了什么，我只是大多数，一个
                普通人”
               
                可是环境就在我的身边。

                回想起多年来的资源浪费。

            每年寝室门口堆积成山，无处堆放的物品，  
             
            那些在寝室,房间，用高昂的价格购买，慢慢铺上灰尘的物品,那些放在书架上，慢慢被遗忘的书籍，会不会是某些人，此时此刻刚好需要的呢？

            那些闲置的物品一定也想重见天日吧，在落满灰尘的角落里默默的等待着，哪一天还能被记得，它们应实现它应有的价值，让每一个“闲质”物品有尊严的流动
           
            起来！
           
            想到这些，希望可以为自己身边的环境做些什么，希望有一个平台，去将我们身边的“闲质”物品流转起来，可是网上开发一个小程序需要数万元，
           
            我没有资金，没有技术，只有身边的朋友，和希望做些什么的决心，5个人，一年时间，不知道的技术就自己去网上学，没有资金就我们自己凑
           
            于是“闲质”这个小程序诞生了，一个只做长医一公里以内的二手平台，我们长沙医学院计算机协会出品
           
            我们的模式:不需要等快递，不需要加联系方式，保护隐私，下单当天就可以直接拿到看得见摸得着的商品，平台保护2天试用期，全面了解闲置商品的质量
           
            想必你也苦于跳蚤市场没有售后，找不到二手平台而感到烦恼吧，对此，计算机协会倾情打造一个为长医学子量身定做的看的见的二手平台。还在等什么，快点
            加入我们吧
      </pre>
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
  methods:{
    playerInit() {
      document.getElementById("aplayer-fixed").style.display='none';
    }
  },
  mounted() {
    this.playerInit();
  }
}
</script>
<style src="../styles/theme.styl" lang="stylus"></style>
<style scoped>
.test1-wrapper {
  background: url("../../public/bgImage/test1.png") center/cover no-repeat;
  height: 1024px;
  margin: 0 auto;
  padding: 0;
}
.story_xz{
  padding: 5rem 10rem;
  width: 80%;
}
.story_xz pre{
  margin: 0 auto;
  word-break: break-all;
  white-space: pre-wrap;
}

</style>