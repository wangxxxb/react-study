const initState = {
    name: 'reducer1',
    number: 0,
};

export default function (state = initState, { type, payload }) {
    switch (type) {
        case 'ADD':
            return {
                ...state,
                number: state.number + payload,
            };
        case 'MINUS':
            return {
                ...state,
                number: state.number - payload,
            };
        default:
            return state;
    }
}
