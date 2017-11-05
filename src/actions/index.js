import * as types from '../constants/actionTypes';
import uuid from 'uuid/v1';

export const addFuel = (name, cost) => ({
    type: types.ADD_FUEL,
    id: uuid(),
    name,
    cost
});

export const updateFuel = (id, name, cost) => ({
    type: types.UPDATE_FUEL,
    id,
    name,
    cost
});

export const removeFuel = id => ({
    type: types.REMOVE_FUEL,
    id
});
