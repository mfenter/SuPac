import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';


import './Footer.css';

class Footer extends Component {

    render(){

        let links = ['contact', 'forum', 'affiliate', 'about', 'site-map', 'social',
        'news', 'team'];
        return (
            <Grid>
                {
                    links.map(function (link, idx){
                        let toLink = `/${ link }/`;
                        return (
                            <Link className={(
                                idx === links.length - 1
                                ? 'footer-link-padding'
                                : 'footer-link-padding footer-link-border'
                            )}
                                  key={ idx }
                                  to={ toLink }>{ link.charAt(0).toUpperCase() + link.slice(1) }</Link>
                        )
                    })
                }
            </Grid>

        )
    }
}

export default Footer