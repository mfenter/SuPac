import React, {Component} from "react";
import {TWITTER_HEIGHT, TWITTER_SCREEN_NAME, TWITTER_USERNAME, TWITTER_WIDTH} from "../appConstants";
import {Follow, Hashtag, Timeline} from "react-twitter-widgets";


class TwitterTimeLine extends Component {


    render() {

        return (
            <div>
                <Follow username={TWITTER_SCREEN_NAME}/>
                <Hashtag className="float-right" hashtag="FFReality" />
                <Timeline
                    dataSource={{
                        sourceType: 'profile',
                        screenName: TWITTER_SCREEN_NAME
                    }}
                    options={{
                        height: TWITTER_HEIGHT,
                        username: TWITTER_USERNAME,
                        width: TWITTER_WIDTH
                    }}
                />

            </div>
        )

    }
}

export default TwitterTimeLine;