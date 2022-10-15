module.exports = [
    //添加版权信息
    ['@xzhi/add-copyright', {
        // 作者名称
        authorName: 'Sunspot.',
        // 触发版权信息或 noCopy 效果的最小的复制文本长度
        minLength: 100,
        statement: '转载请注明本文出自Sunspot.的博客',
        copyrightLoca: 'before',
    }],
    // 更新刷新插件
    ['@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
        }
    }],
    ['vuepress-plugin-nuggets-style-copy', {
        copyText: 'copy',
        tip: {
            content: '复制成功!'
        }
    }],
    ['@vuepress/last-updated',
        {
            transformer: (timestamp, lang) => {
                return (new Date(timestamp)).toUTCString()
                //或者用下面这段
                // const moment = require('moment')
                // moment.locale(lang)
                // return moment(timestamp).toLocaleString()
            }
        }],
    ['@vuepress-reco/vuepress-plugin-pagation', {
        perPage: 18
    }],
    ['sitemap', {
        hostname: 'https://blog.zhulinz.top/'
    }],
    //seo优化
    ['seo', {
        siteTitle: (_, $site) => 'Sunspot\'s Blog',
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => 'Sunspot .',
        type: $page => 'article',
        url: (_, $site, path) => 'https://blog.zhulinz.top' + path,
        image: ($page, $site) => "https://oss.zhulinz.top/newImage/202209082357267.ico",
        publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
    }],
    //路由拼音插件
    ['permalink-pinyin', {
        lowercase: true, // Converted into lowercase, default: true
        separator: '-' // Separator of the slug, default: '-'
    }],
    //谷歌统计
    ['@vuepress/google-analytics', {
        'ga': 'UA-233962372-2'
    }
    ],
]