export default function reduxThunl({ getState, dispatch }) {
    return function (next) {
        return function (action) {
            return typeof action === 'function' ? action(dispatch, getState) : next(action);
        };
    };
}
