import React, { Component } from 'react';
import List from 'material-ui/List';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText
} from 'material-ui/Dialog';
import Fuel from './Fuel';

class FuelList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            removeFuelDialogOpen: false,
            removingFuel: null,
            removingFuelName: null
        };
    }

    showRemoveFuelDialog = fuel => {
        this.setState({
            removeFuelDialogOpen: true,
            removingFuel: fuel.id,
            removingFuelName: fuel.name
        });
    };

    closeRemoveFuelDialog = () => {
        // only remove dialog
        // if we remove current fuel data
        // it is displayed a weird empty fuel data in dialog before close
        this.setState({
            removeFuelDialogOpen: false
        });
    };

    render() {
        const { fuels, removeFuel } = this.props;
        const {
            removeFuelDialogOpen,
            removingFuel,
            removingFuelName
        } = this.state;

        return (
            <div>
                <Dialog
                    open={removeFuelDialogOpen}
                    onRequestClose={this.closeRemoveFuelDialog}
                >
                    <DialogContent>
                        <DialogContentText>
                            Eliminar el combustible {removingFuelName}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.closeRemoveFuelDialog}
                            color="default"
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                this.closeRemoveFuelDialog();
                                removeFuel(removingFuel);
                            }}
                            color="primary"
                            autoFocus
                        >
                            Si
                        </Button>
                    </DialogActions>
                </Dialog>

                <List>
                    {fuels.map((fuel, index) => (
                        <Fuel
                            fuel={fuel}
                            key={fuel.id}
                            isLast={index + 1 === fuels.length}
                            onClickRemoveFuel={this.showRemoveFuelDialog}
                        />
                    ))}
                </List>
            </div>
        );
    }
}

export default FuelList;
