// 这里原理可以参考koa源码实现（实现方式不一样）
export default function compose(...fns) {
    return fns.reduce((a, b) => (...args) => a(b(...args)));
}
