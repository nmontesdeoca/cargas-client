import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../css/App.css';
import Home from './Home';
import FuelsContainer from './FuelsContainer';

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
                        style={{ position: 'fixed', top: 0 }}
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
                            <MenuItem onClick={this.onMenuTouchTap}>
                                Home
                            </MenuItem>
                        </Link>
                        <Link to="/fuels" className="no-decoration">
                            <MenuItem onClick={this.onMenuTouchTap}>
                                Fuels
                            </MenuItem>
                        </Link>
                    </Drawer>

                    <Route exact path="/" component={Home} />
                    <Route path="/fuels" component={FuelsContainer} />
                </div>
            </Router>
        );
    }
}

export default App;
