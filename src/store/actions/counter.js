import * as types from '../action-types';

export default {
    add() {
        return {
            type: types.ADD,
            payload: 1,
        };
    },
    minus() {
        return {
            type: types.MINUS,
            payload: 1,
        };
    },
};
