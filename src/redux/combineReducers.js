export default function combineReducers(reducers = {}) {
    // 每一次dispatch都会执行该函数，这个函数会执行所有的reducer，并且根据reducer的key组装state
    return function (state = {}, action) {
        const reducerKeys = Object.keys(reducers);
        const finalReducerState = {};

        for (let i = 0; i < reducerKeys.length; i++) {
            const currentKey = reducerKeys[i];
            const previousStateForKey = state[currentKey];
            const reducerForKey = reducers[currentKey];
            finalReducerState[currentKey] = reducerForKey(previousStateForKey, action);
        }
        return finalReducerState;
    };
}
