import { connect } from 'react-redux';
import { addFuel, removeFuel } from '../actions';
import Fuels from './Fuels';

const mapStateToProps = (state, ownProps) => {
    return {
        fuels: state.fuels
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addFuel: () => {
            dispatch(addFuel('Super', 42.5));
        },
        removeFuel: id => {
            dispatch(removeFuel(id));
        }
    };
};

const FuelsContainer = connect(mapStateToProps, mapDispatchToProps)(Fuels);

export default FuelsContainer;
