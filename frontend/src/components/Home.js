import React, {Component} from "react";
import LandingHero from "./HeroJumboTron"
import TwitterTimeLine from "./TwitterTimeLine";

class Home extends Component {
    render() {
        return (
            <div>
                <h1> This is the main</h1>
                <p><a href="/login/">Login</a></p>
                <p><a href="/accounts/register/">Register</a></p>
                <LandingHero user={this.props.user}/>
                <TwitterTimeLine/>
            </div>
        )
    }
}

export default Home;