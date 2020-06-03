export default function createStore(reducer, initialState) {
    // 初始化state
    let state = initialState;
    // 初始化订阅事件列表
    let listeners = [];
    // 获取最新状态方法
    function getState() {
        return state;
    }

    // 派发事件的方法
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
        return action;
    }

    // 订阅
    function subscribe(cb) {
        if (typeof cb !== 'function') {
            throw new Error('Expected the listener to be a function.');
        }

        listeners.push(cb);

        return function unSubscribe() {
            const index = listeners.indexOf(cb);
            listeners.splice(index, 1);
        };
    } 

    // 初始化默认执行一次，用来生成初始state
    dispatch({
        type: '@@ACTION_INIT', // 最好生成一个随机不重复的字符串
    });

    const store = {
        getState,
        dispatch,
        subscribe,
    };

    return store;
}
