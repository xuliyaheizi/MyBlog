const extendsNetworks = {
    pinterest: {
        sharer: `https://pinterest.com/pin/create/button/?url=@url&media=@media&description=@title`,
        type: `popup`,
        icon: `/pinterest.png`,
    },
    linkedin: {
        sharer: `https://www.linkedin.com/shareArticle?mini=true&url=@url&title=@title&summary=@description`,
        type: `popup`,
        color: `#1786b1`,
        icon: `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M910.336 0H113.664A114.005333 114.005333 0 0 0 0 113.664v796.672A114.005333 114.005333 0 0 0 113.664 1024h796.672A114.005333 114.005333 0 0 0 1024 910.336V113.664A114.005333 114.005333 0 0 0 910.336 0zM352.256 796.330667H207.189333V375.466667h145.066667z m-72.021333-477.866667a77.824 77.824 0 0 1-81.237334-74.069333A77.824 77.824 0 0 1 280.234667 170.666667a77.824 77.824 0 0 1 81.237333 73.728 77.824 77.824 0 0 1-81.237333 73.386666z m582.314666 477.866667H716.8v-227.669334c0-46.762667-18.432-93.525333-73.045333-93.525333a84.992 84.992 0 0 0-81.237334 94.549333v226.304h-140.629333V375.466667h141.653333v60.757333a155.989333 155.989333 0 0 1 136.533334-71.338667c60.416 0 163.498667 30.378667 163.498666 194.901334z" /></svg>`,
    },
}
module.exports = {
    // base: '/blog/',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    // configureWebpack: {
    //     node: {
    //         global: true,
    //         process: true
    //     },
    // },
    title: 'Sunspot.修仙秘籍',
    description: '以JAVA入门，踏上修仙之路，一路拳打南山敬老院脚踢北海幼儿园，成为一名优秀的架构师。',
    dest: 'public',
    head: [
        ['link', {rel: 'icon', href: 'https://oss.zhulinz.top/newImage/202209082357267.ico'}],
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}],
        ['meta', {name: 'keywords', content: 'Sunspot,博客,zhulinz.top,zhulin,祝林,竹林,Java'}],
        ['meta', {name: 'baidu-site-verification', content: 'code-rGCUXPJ1FA'}],
        ["script", {src: "https://kit.fontawesome.com/5ec517f380.js", crossorigin: "anonymous"}],
        ['script', {}, 'var _hmt = _hmt || [];\n' +
        '            (function() {\n' +
        '                var hm = document.createElement("script");\n' +
        '                hm.src = "https://hm.baidu.com/hm.js?1fa46dc84d9c2e74f953957f03bded00";\n' +
        '                var s = document.getElementsByTagName("script")[0]; \n' +
        '                s.parentNode.insertBefore(hm, s);\n' +
        '            })();'],
    ],
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        nav: [
            {text: '主页', link: '/', icon: 'reco-home'},
            {text: "文档", link: "/docs/", icon: "reco-message",},
            {text: '归档', link: '/archives.html', icon: 'reco-date'},
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
            socialLinks: [ // 信息栏展示社交信息
                {icon: 'reco-github', link: 'https://github.com/xuliyaheizi'},
                {icon: 'reco-juejin', link: 'https://juejin.cn/user/3822316104984333'},
                {icon: 'reco-csdn', link: 'https://blog.csdn.net/qq_47966518?spm=1000.2115.3001.5343'}
            ]
        },
        logo: '/avatar.webp',
        authorAvatar: '/avatar.webp',
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
        friendLink: [
            {
                title: 'Eureka\'s blog',
                // desc: 'Enjoy when you can, and endure when you must.',
                // email: '1156743527@qq.com',
                link: 'https://blog.fengxianhub.top/#/README'
            },
        ],
    },
    plugins: [
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
}

