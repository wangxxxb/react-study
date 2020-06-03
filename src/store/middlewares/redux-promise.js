function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

// 这一段代码是复制flux-standard-action，不考虑plainObject情况，如果考虑plainObject可以递归判断
function isFSA(action) {
    return typeof action.type === 'string' && Object.keys(action).every(isValidKey);
}

function isValidKey(key) {
    return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;
}

export default function reduxPromise({ dispatch }) {
    return function (next) {
        return function (action) {
            // 判断是否符合flux 标准
            if (!isFSA(action)) {
                return isPromise(action) ? action.then(dispatch) : next(action);
            }
            return isPromise(action.payload)
                ? action.payload
                      .then((res) => {
                          dispatch({
                              ...action,
                              payload: res,
                          });
                      })
                      .catch((error) => {
                          dispatch({ ...action, payload: error, error: true });
                          return Promise.reject(error);
                      })
                : next(action);
        };
    };
}
