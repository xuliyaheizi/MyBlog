module.exports = [
    {text: '主页', link: '/', icon: 'reco-home'},
    {
        text: 'Spring生态体系',
        items: [
            {text: 'Spring', link: '/categories/3-spring/spring/1-spring'},
            // {text: 'StringBoot', link: '/categories/3-spring/spring/1-spring'},
            {text: 'SpringCloud', link: '/categories/3-spring/springcloud/1-eureka'}
        ]
    },
    {
        text: "文档",
        // link: "/docs/",
        items: [
            {text: '八股文', link: '/docs/1-八股文/1、network'},
            {text: '设计模式', link: '/docs/2-设计模式/设计原则'},
            {test: 'Netty学习', link: '/docs/3-Netty学习/1、NIO基础'}
        ],
        icon: 'reco-document',
    },
    {text: '归档', link: '/archives.html', icon: 'reco-date'},
    {text: '书单指南', link: '/booksGuide.html', icon: 'reco-suggestion'},
    {text: '关于', link: '/about.html', icon: 'reco-account'},
]