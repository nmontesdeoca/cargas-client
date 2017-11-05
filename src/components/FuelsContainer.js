import { connect } from 'react-redux';
import { addFuel } from '../actions';
import Fuels from './Fuels';

const mapStateToProps = (state, ownProps) => {
    return {
        fuels: state.fuels
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: () => {
            dispatch(addFuel('Super', 42.5));
        }
    };
};

const FuelsContainer = connect(mapStateToProps, mapDispatchToProps)(Fuels);

export default FuelsContainer;
