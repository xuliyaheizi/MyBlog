module.exports = {
    // base: '/blog/',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    title: 'Sunspot\'s Blog',
    description: 'Follow your heart，see night！',
    dest: 'public',
    head: [
        ['link', {rel: 'icon', href: 'https://oss.zhulinz.top/newImage/202209082357267.ico'}],
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}],
        ['meta', {name: 'keywords', content: 'Sunspot,博客,zhulinz.top,zhulin'}],
        ["script", {src: "https://kit.fontawesome.com/5ec517f380.js", crossorigin: "anonymous"}],
        ['script', {}, `
        var _hmt = _hmt || [];
        (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?1fa46dc84d9c2e74f953957f03bded00";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
        })();
        })();`]
    ],
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        nav: [
            {text: '主页', link: '/', icon: 'reco-home'},
            {text: "文档", link: "/docs/", icon: "reco-message",},
            {text: '归档', link: '/archives.html', icon: 'reco-date'},
            // {text: '标签', link: '/tags.html', icon: 'reco-tag'},
            // {text: '域名', link: '/domains.html', icon: 'reco-other'},
            {text: '关于', link: '/about.html', icon: 'reco-account'},
        ],
        //自定义侧边栏-左
        sidebar: {
            "/docs/": [{
                title: '八股文',
                collapsable: true,
                children: ['1-interview/1-network.html', '1-interview/2-javabasis.html', '1-interview/3-collection.html', '1-interview/4-thread.html',
                    '1-interview/5-spring.html', '1-interview/6-redis.html', '1-interview/7-mysql.html', '1-interview/8-mybatis.html'
                ]
            },]
        },
        type: 'blog',
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认 “分类”
            },
            // tag: {
            //   location: 3, // 在导航栏菜单中所占的位置，默认3
            //   text: '标签' // 默认 “标签”
            // },
            socialLinks: [ // 信息栏展示社交信息
                {icon: 'reco-github', link: 'https://github.com/xuliyaheizi'},
                {icon: 'reco-juejin', link: 'https://juejin.cn/user/3822316104984333'},
                {icon: 'reco-csdn', link: 'https://blog.csdn.net/qq_47966518?spm=1000.2115.3001.5343'}
            ]
        },
        // valineConfig: {
        //   appId: '3znsWxW1sRV7n0V9JLVnvNvU-gzGzoHsz',
        //   appKey: 'A86PspcsyWBHnmoP9ck4Af54',
        // },
        logo: '/avatar.jpg',
        authorAvatar: '/avatar.jpg',
        search: true,
        searchMaxSuggestions: 10,
        subSidebar: 'auto',
        sidebarDepth: 2,
        lastUpdated: '本文更新于',
        author: 'Sunspot .',
        // 备案号
        record: '湘ICP备2021017853号',
        recordLink: 'https://beian.miit.gov.cn/',
        startYear: '2022',
        //暗色模式适配
        mode: 'light',
        modePicker: false,
        //git仓库编辑
        repo: 'https://github.com/xuliyaheizi/MyBlog',
        docsDir: 'blog',
        docsBranch: 'zhulin',
        editLinks: true,
        /**
         * 密钥 (if your blog is private)
         */
        friendLink: [
            // {
            //     title: '午后南杂',
            //     desc: 'Enjoy when you can, and endure when you must.',
            //     email: '1156743527@qq.com',
            //     link: 'https://www.recoluan.com'
            // },
        ],
        /**
         * support for
         * '' | 'default'
         * 'coy'
         * 'dark'
         * 'funky'
         * 'okaidia'
         * 'solarizedlight'
         * 'tomorrow'
         * 'twilight'
         */
    },
    plugins: [
        // 更新刷新插件
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: {
                message: "发现新内容可用",
                buttonText: "刷新"
            }
        }],
        // // 评论插件
        //   ['vuepress-plugin-comment',
        //   {
        //     choosen: 'valine',
        //     // options选项中的所有参数，会传给Valine的配置
        //     options: {
        //       el: '#valine-vuepress-comment',
        //       appId: 'xxxxxxxxxxxxxxxxxx',
        //       appKey: 'xxxxxxxxxxxxxx'
        //     }
        //   }],
        // 代码复制弹窗插件
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
            hostname: 'http://blog.zhulinz.top/'
        }],
        //路由拼音插件
        ['permalink-pinyin', {
            lowercase: true, // Converted into lowercase, default: true
            separator: '-' // Separator of the slug, default: '-'
        }],
        // 音乐插件
        ['meting', {
            //metingApi: "https://meting.sigure.xyz/api/music",
            meting: {
                // 网易
                server: "netease",
                // 读取歌单
                type: "playlist",
                mid: "4860069866",
            },
            // 不配置该项的话不会出现全局播放器
            aplayer: {
                // 吸底模式
                fixed: true,
                mini: true,
                // 自动播放
                autoplay: true,
                // 歌曲栏折叠
                listFolded: true,
                // 颜色
                theme: '#f9bcdd',
                // 播放顺序为随机
                order: 'random',
                // 初始音量
                volume: 0.3,
                // 关闭歌词显示
                lrcType: 0,
                preload: "metadata",
            },
            mobile: {
                // 手机端去掉cover图
                cover: false,
            }
        }]
    ]
}