import expect from 'expect';
import deepFreeze from 'deep-freeze';
import reducer from '../../app/reducers/fuels';
import * as actions from '../../app/actions';

describe('Fuels Reducer', () => {
    it('should return the initial state', () => {
        const initialState = undefined;
        const finalState = [];

        expect(
            reducer(initialState, {})
        ).toEqual(finalState);
    });

    it('should handle ADD_FUEL', () => {
        const id = 1;
        const name = 'Super 95';
        const cost = 50.0;

        const action = actions.addFuel(name, cost);
        const initialState = [{
            id: 0,
            name: 'Super',
            cost: 42.5
        }];
        const finalState = [...initialState, {
            id,
            name,
            cost
        }];

        deepFreeze(action);
        deepFreeze(initialState);

        expect(
            reducer(initialState, action)
        ).toEqual(finalState);
    });

    it('should handle UPDATE_FUEL', () => {
        const id = 0;
        const name = 'Super 95';
        const cost = 50.0;

        const action = actions.updateFuel(id, name, cost);
        const initialState = [{
            id: 0,
            name: 'Super',
            cost: 42.5
        }, {
            id: 1,
            name: 'Gas',
            cost: 100.0
        }];
        const finalState = [{
            id,
            name,
            cost
        }, {
            id: 1,
            name: 'Gas',
            cost: 100.0
        }];

        deepFreeze(action);
        deepFreeze(initialState);

        expect(
            reducer(initialState, action)
        ).toEqual(finalState);
    });

    it('should handle REMOVE_FUEL', () => {
        const id = 0;

        const action = actions.removeFuel(id);
        const initialState = [{
            id: 0,
            name: 'Super',
            cost: 42.5
        }, {
            id: 1,
            name: ''
        }];
    });
});
