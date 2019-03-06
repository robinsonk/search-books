import React, { Component } from 'react';
import './BookFilter.css'

class BookFilters extends Component {
    changeSelection(value) {
        // if(value === "None") {
        //   this.props.changeHandler(null);
        // } else {
          this.props.changeHandler(value);
        // }
        this.props.updateFilters();
    }

    render() {
        return (
            <div className="bookFilters">
                <label htmlFor="printTypefilter"> Print Type: </label>
                    <select 
                    name="printTypefilter"
                    onChange={e => this.changeSelection(e.target.value)}
                    >   
                        <option value={null} >Pick one...</option>
                        <option value="ebook" >Ebook</option>
                        <option value="book">Book</option>
                        <option value="FREE">Free Ebook</option>
                    </select>
                </div>
        )
    }
}

export default BookFilters;