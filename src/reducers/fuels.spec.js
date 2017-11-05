import reducer from './fuels';
import * as actions from '../actions';

describe('fuels reducer', () => {
    it('should handle undefined state', () => {
        expect(reducer(undefined, undefined)).toEqual([]);
    });

    it('should add fuel when there are no fuels', () => {
        const initialState = undefined;
        const action = actions.addFuel('Super', 42.5);
        const finalState = [
            {
                id: action.id,
                name: 'Super',
                cost: 42.5
            }
        ];

        expect(reducer(initialState, action)).toEqual(finalState);
    });

    it('should add fuel when there are already a fuel', () => {
        const initialState = [
            {
                id: 1,
                name: 'Premium',
                cost: 100
            }
        ];
        const action = actions.addFuel('Super', 42.5);
        const finalState = [
            ...initialState,
            {
                id: action.id,
                name: 'Super',
                cost: 42.5
            }
        ];

        expect(reducer(initialState, action)).toEqual(finalState);
    });

    it('should update the name and cost of a fuel', () => {
        const initialState = [
            {
                id: 1,
                name: 'Super',
                cost: 42.5
            }
        ];
        const action = actions.updateFuel(1, 'Super New', 43);
        const finalState = [
            {
                id: 1,
                name: 'Super New',
                cost: 43
            }
        ];

        expect(reducer(initialState, action)).toEqual(finalState);
    });

    it('should remove a fuel', () => {
        const initialState = [
            {
                id: 2,
                name: 'Super',
                cost: 42.5
            }
        ];
        const action = actions.removeFuel(2);
        const finalState = [];

        expect(reducer(initialState, action)).toEqual(finalState);
    });

    it('should not fail if try to remove a fuel when no fuels', () => {
        const initialState = [];
        const action = actions.removeFuel(3);
        const finalState = [];

        expect(reducer(initialState, action)).toEqual(finalState);
    });
});
