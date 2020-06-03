import compose from './compose';

export default function applyMiddleware(...middlewares) {
    return function (createStore) {
        return function (reducers) {
            const store = createStore(reducers);
            let dispatch;

            // 这是供给每一个中间件使用的参数
            let middlewareApi = {
                dispatch: (action) => dispatch(action), // 用函数的方式延迟dispatch赋值
                getState: store.getState,
            };

            // 保证每一个中间件拿到的dispatch都是增强过后的dispatch
            const chain = middlewares.map((middleware) => middleware(middlewareApi));

            dispatch = compose(...chain)(store.dispatch);

            return {
                ...store,
                dispatch,
            };
        };
    };
}
