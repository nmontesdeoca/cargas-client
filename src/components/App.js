import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Fuels from './Fuels';

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
            <Router>
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
                        <Link to="/" className="no-decoration">
                            <MenuItem>Home</MenuItem>
                        </Link>
                        <Link to="/fuels" className="no-decoration">
                            <MenuItem>Fuels</MenuItem>
                        </Link>
                    </Drawer>

                    <Route exact path="/" component={Home} />
                    <Route path="/fuels" component={Fuels} />
                </div>
            </Router>
        );
    }
}

export default App;
