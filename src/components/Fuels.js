import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from 'material-ui/Dialog';

const styles = theme => ({
    button: {
        bottom: 20,
        position: 'fixed',
        right: 20
    },
    formControl: {
        margin: theme.spacing.unit
    }
});

class Fuels extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addFuelDialogOpen: false,
            addingFuelName: null,
            addingFuelCost: null,
            addingFuelNameError: false,
            addingFuelCostError: false,
            removeFuelDialogOpen: false,
            removingFuel: null,
            removingFuelName: null
        };
    }

    getFuelName = fuel => `${fuel.name} ${fuel.id.substring(0, 4)}`;

    showRemoveFuelDialog = fuel => {
        this.setState({
            removeFuelDialogOpen: true,
            removingFuel: fuel.id,
            removingFuelName: this.getFuelName(fuel)
        });
    };

    showAddFuelDialog = () => {
        this.setState({
            addFuelDialogOpen: true
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

    closeAddFuelDialog = () => {
        this.setState({
            addFuelDialogOpen: false,
            addingFuelName: null,
            addingFuelCost: null,
            addingFuelNameError: false,
            addingFuelCostError: false
        });
    };

    handleInputChange = (name, value) => {
        this.setState({
            [name]: value
        });

        if (value) {
            this.setState({
                [name + 'Error']: false
            });
        }
    };

    render() {
        const { fuels, addFuel, removeFuel, classes } = this.props;
        const {
            addFuelDialogOpen,
            addingFuelName,
            addingFuelCost,
            addingFuelNameError,
            addingFuelCostError,
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
                <Dialog
                    open={addFuelDialogOpen}
                    onRequestClose={this.closeAddFuelDialog}
                >
                    <DialogTitle>Agregar combustible</DialogTitle>
                    <DialogContent>
                        <FormControl className={classes.formControl}>
                            <InputLabel
                                error={addingFuelNameError}
                                htmlFor="name"
                            >
                                Nombre
                            </InputLabel>
                            <Input
                                id="name"
                                error={addingFuelNameError}
                                onChange={e => {
                                    this.handleInputChange(
                                        'addingFuelName',
                                        e.target.value
                                    );
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel
                                error={addingFuelCostError}
                                htmlFor="amount"
                            >
                                Costo
                            </InputLabel>
                            <Input
                                id="amount"
                                type="number"
                                error={addingFuelCostError}
                                onChange={e =>
                                    this.handleInputChange(
                                        'addingFuelCost',
                                        e.target.value
                                    )}
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.closeAddFuelDialog}
                            color="default"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                if (addingFuelName && addingFuelCost) {
                                    this.closeAddFuelDialog();
                                    addFuel(addingFuelName, addingFuelCost);
                                } else {
                                    this.setState({
                                        addingFuelNameError: !addingFuelName,
                                        addingFuelCostError: !addingFuelCost
                                    });
                                }
                            }}
                            color="primary"
                        >
                            Agregar
                        </Button>
                    </DialogActions>
                </Dialog>
                <List>
                    {fuels.map((fuel, index) => (
                        <ListItem
                            key={fuel.id}
                            divider={index + 1 !== fuels.length}
                        >
                            <ListItemText
                                primary={this.getFuelName(fuel)}
                                secondary={fuel.cost}
                            />
                            <DeleteIcon
                                onClick={() => this.showRemoveFuelDialog(fuel)}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button
                    fab
                    color="primary"
                    aria-label="add"
                    onClick={this.showAddFuelDialog}
                    className={classes.button}
                >
                    <AddIcon />
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Fuels);
