import React, {Component} from "react";
import LandingHero from "./HeroJumboTron"
import TwitterTimeLine from "./TwitterTimeLine";
import {Grid} from "react-bootstrap";

class Home extends Component {
    render() {
        return (
            <Grid>
                <LandingHero user={this.props.user}/>
                <TwitterTimeLine />
            </Grid>
        )
    }
}

export default Home;