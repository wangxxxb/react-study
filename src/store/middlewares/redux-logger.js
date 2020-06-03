function logger(...msg) {
    if (process.env.NODE_ENV !== 'production') console.log(...msg);
}
export default function reduxLogger({ getState }) {
    return function (next) {
        return function (action) {
            logger('------------------------------START--------------------------------------');
            logger('@@REDUX_LOGGER', 'TYPE:', action.type, '; PAYLOAD:', action.payload);
            logger('@@REDUX_LOGGER', 'previousState:', getState());
            const v = next(action);
            logger('@@REDUX_LOGGER', 'nextState', getState());
            logger('-------------------------------END---------------------------------------');
            return v;
        };
    };
}
