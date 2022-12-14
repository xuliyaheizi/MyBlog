module.exports = [
    {text: '主页', link: '/', icon: 'reco-home'},
    {
        text: 'Spring生态体系',
        items: [
            {text: 'Spring', link: '/docs/4-Spring学习/Spring/1、Spring'},
            // {text: 'StringBoot', link: '/categories/3-spring/spring/1-spring'},
            {text: 'SpringCloud', link: '/docs/4-Spring学习/SpringCloud/1、Eureka'}
        ]
    },
    {
        text: "文档",
        // link: "/docs/",
        items: [
            {text: '八股文', link: '/docs/1-八股文/1、network'},
            {text: '设计模式', link: '/docs/2-设计模式/设计原则'},
            {text: 'Netty学习', link: '/docs/3-Netty学习/1、NIO基础'}
        ],
        icon: 'reco-document',
    },
    {text: '归档', link: '/archives.html', icon: 'reco-date'},
    {text: '书单指南', link: '/booksGuide.html', icon: 'reco-suggestion'},
    {text: '关于', link: '/about.html', icon: 'reco-account'},
]