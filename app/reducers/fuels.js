import * as types from '../constants/actionTypes';

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.ADD_FUEL:
            return addFuel(state, action);
        case types.UPDATE_FUEL:
            return updateFuel(state, action);
        default:
            return state;
    }
};

const addFuel = (state, action) => {
    return [
        ...state,
        {
            id: state.length,
            name: action.name,
            cost: action.cost
        }
    ];
};

const updateFuel = (state, action) => {
    let finalState = [...state];
    let fuel = finalState.filter(fuel => fuel.id === action.id)[0];
    const index = finalState.indexOf(fuel);

    finalState[index] = {
        ...fuel,
        name: action.name,
        cost: action.cost
    };

    return finalState;
};

const removeFuel = (state, action) => {
    return state.filter(fuel => fuel.id !== action.id);
};

export default reducer;