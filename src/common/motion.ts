// 弹跳列表动画参数，参考首页nav列表
export const bounceList = {
    container: {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.07,
            },
        },
    },

    item: {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    },
};

// 上拉列表动画参数，参考个人中心操作列表
export const pullUpList = {
    container: {
        visible: {
            hidden: { opacity: 0, scale: 0 },
            transition: {
                opacity: 1,
                scale: 1,
                delayChildren: 0.2,
                staggerChildren: 0.1,
            },
        },
    },
    item: {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    },
};
