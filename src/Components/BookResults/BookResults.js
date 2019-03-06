import React, { Component } from 'react';
import './BookResults.css'

class BookResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            price: '',
            blurb: '',
            coverURL: '',
        }
    }

    render() {
        return (
            <div className="bookResult" key={this.props.id} id="results">
                <img src={this.props.coverURL} alt={`cover for ${this.props.title} by ${this.props.author}`} />
                    <div className="book-info">
                         <a href={this.props.bookURL}><h4>{this.props.title}</h4></a>
                        <p>{this.props.author}</p>
                        <p>{this.props.price}</p>                       
                    </div>
            </div>
        )
    }
}

export default BookResults;