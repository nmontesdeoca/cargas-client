import expect from 'expect';
import deepFreeze from 'deep-freeze';
import reducer from '../../app/reducers/fuels';
import * as actions from '../../app/actions';

function test(initialState, action, finalState) {
    action && deepFreeze(action);
    initialState && deepFreeze(initialState);

    expect(
        reducer(initialState, action)
    ).toEqual(finalState);
}

describe('Fuels Reducer', () => {
    it('should return the initial state', () => {
        const initialState = undefined;
        const finalState = [];
        const action = {};

        test(initialState, action, finalState);
    });

    it('should handle ADD_FUEL', () => {
        const name = 'Super 95';
        const cost = 50.0;
        const action = actions.addFuel(name, cost);
        const id = action.id;

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

        test(initialState, action, finalState);
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

        test(initialState, action, finalState);
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
            name: 'Premium',
            cost: 45.0
        }];
        const finalState = [{
            id: 1,
            name: 'Premium',
            cost: 45.0
        }]

        test(initialState, action, finalState);
    });

    it('should handle this sequence correctly: ADD_FUEL, REMOVE_FUEL, ADD_FUEL', () => {
        const initialState = undefined;
        const firstAction = actions.addFuel('Super', 42.5)
        const secondAction = actions.removeFuel(firstAction.id);
        const thirdAction = actions.addFuel('Super', 42.5);
        const firstFinalState = [{
            id: firstAction.id,
            name: 'Super',
            cost: 42.5
        }];
        const secondFinalState = [];
        const thirdFinalState = [{
            id: thirdAction.id,
            name: 'Super',
            cost: 42.5
        }];

        // first ADD_FUEL
        test(initialState, firstAction, firstFinalState);

        // first REMOVE_FUEL
        test(firstFinalState, secondAction, secondFinalState);

        // second ADD_FUEL
        test(secondFinalState, thirdAction, thirdFinalState);
    });
});
