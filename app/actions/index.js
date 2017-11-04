import * as types from '../constants/actionTypes';

export const addFuel = (name, cost) => {
    return {
        type: types.ADD_FUEL,
        name,
        cost
    }
};

export const updateFuel = (id, name, cost) => {
    return {
        type: types.UPDATE_FUEL,
        id,
        name,
        cost
    }
};

export const removeFuel = (id) => {
    return {
        type: types.REMOVE_FUEL,
        id
    }
};
