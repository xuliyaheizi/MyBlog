const timeUpdate = new Date().getTime();
module.exports = {
    // base: '/blog/',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    configureWebpack: {
        node: {
            global: true,
            process: true
        },
        output: {
            filename: `[name].js?v=${timeUpdate}`,
            chunkFilename: `[name].js?v=${timeUpdate}`
        },
    },
    title: 'Sunspot.修仙秘籍',
    description: '以JAVA入门，踏上修仙之路，一路拳打南山敬老院脚踢北海幼儿园，成为一名优秀的架构师。',
    dest: 'public',
    head: require('./configs/head'),
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        nav: require('./configs/nav'),
        //自定义侧边栏-左
        sidebar: require('./configs/sidebar'),
        type: 'blog',
        blogConfig: require('./configs/blogConfig'),
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
        friendLink: require('./configs/friendLink'),
    },
    plugins: require('./configs/plugins')
}

