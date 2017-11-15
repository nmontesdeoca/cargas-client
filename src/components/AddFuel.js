import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
} from 'material-ui/Dialog';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit
    },
    button: {
        bottom: 20,
        position: 'fixed',
        right: 20
    }
});

class AddFuel extends Component {
    constructor(props) {
        super(props);

        this.state = this.getDefaultState();
    }

    getDefaultState() {
        return {
            addFuelDialogOpen: false,
            addingFuelName: '',
            addingFuelCost: '',
            addingFuelNameError: false,
            addingFuelCostError: false
        };
    }

    showAddFuelDialog = () => {
        this.setState({
            addFuelDialogOpen: true
        });
    };

    closeAddFuelDialog = () => {
        this.setState(this.getDefaultState());
    };

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        if (name === 'addingFuelCost') {
            value = Number(value);
        }

        this.setState({
            [name]: value,
            [name + 'Error']: !value
        });
    };

    onClickAddFuel = () => {
        const { addFuel } = this.props;
        const { addingFuelName, addingFuelCost } = this.state;

        if (addingFuelName && addingFuelCost) {
            this.closeAddFuelDialog();
            addFuel(addingFuelName, addingFuelCost);
        } else {
            this.setState({
                addingFuelNameError: !addingFuelName,
                addingFuelCostError: !addingFuelCost
            });
        }
    };

    render() {
        const { classes } = this.props;
        const {
            addFuelDialogOpen,
            addingFuelName,
            addingFuelNameError,
            addingFuelCost,
            addingFuelCostError
        } = this.state;

        return (
            <div>
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
                                name="addingFuelName"
                                value={addingFuelName}
                                error={addingFuelNameError}
                                onChange={this.handleInputChange}
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
                                inputProps={{ step: '0.01' }}
                                name="addingFuelCost"
                                value={addingFuelCost}
                                error={addingFuelCostError}
                                onChange={this.handleInputChange}
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
                        <Button onClick={this.onClickAddFuel} color="primary">
                            Agregar
                        </Button>
                    </DialogActions>
                </Dialog>
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

export default withStyles(styles)(AddFuel);
