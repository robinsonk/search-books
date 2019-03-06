import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class NavButton extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Fragment>
                <div className="button-container">
                    <h2 className={this.props.className}>
                        <Link 
                            to="results"
                            smooth={true}
                        >
                        <FontAwesomeIcon icon="sort-down" className={this.props.className}/>
                        </Link>
                    </h2>
                </div>
            </Fragment>
        )
    }
}

library.add(faSortDown)
export default NavButton;