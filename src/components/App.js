import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Home from './Home';
import Header from './Header';
import SideNavigation from './SideNavigation';
import FuelsContainer from './FuelsContainer';

const styles = {
    container: {
        paddingTop: 80
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNavigationOpen: false
        };
    }
    onMenuClick = () => {
        this.setState(previousState => ({
            sideNavigationOpen: !previousState.sideNavigationOpen
        }));
    };
    onRequestClose = () => {
        this.setState({
            sideNavigationOpen: false
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <Router>
                <div>
                    <Header onMenuClick={this.onMenuClick} />
                    <SideNavigation
                        open={this.state.sideNavigationOpen}
                        onRequestClose={this.onRequestClose}
                    />
                    <div className={classes.container}>
                        <Route exact path="/" component={Home} />
                        <Route path="/fuels" component={FuelsContainer} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default withStyles(styles)(App);
