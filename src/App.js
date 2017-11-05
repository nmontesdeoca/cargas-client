import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }
    onMenuTouchTap = () => {
        this.setState(previousState => ({
            drawerOpen: !previousState.drawerOpen
        }));
    };
    onRequestChange = drawerOpen => {
        this.setState({
            drawerOpen
        });
    };
    render() {
        return (
            <div>
                <AppBar
                    title="CarGas"
                    onLeftIconButtonTouchTap={this.onMenuTouchTap}
                />
                <Drawer
                    docked={false}
                    width={250}
                    open={this.state.drawerOpen}
                    onRequestChange={this.onRequestChange}
                >
                    <MenuItem>Fuels</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default App;
