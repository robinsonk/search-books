import React, { Component } from 'react';
import BookResults from '../BookResults/BookResults';
import BookFilters from '../BookFilter/BookFilter'; 
import './BookSearchBar.css'
import NavButton from '../NavButton/NavButton';

class BookSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            selected: '',
            books: [],
            selectedBooks: [],
            navClassName: 'navButton'
        };
        this.updateSearchTerm = this.updateSearchTerm.bind(this)
        this.searchBooks = this.searchBooks.bind(this)
        this.pullData = this.pullData.bind(this)
        this.updateFilters = this.updateFilters.bind(this)
    }

    updateSearchTerm(term) {
        let searchTermRaw = term.target.value
        let searchTermFixed = searchTermRaw.replace(/[, ]+/g, '%20');
        this.setState({
            searchTerm: searchTermFixed,
        });
        this.setState({
            selected: null
        });
    }

    setSelected(selected) {
        this.setState({selected}, () => {
            this.updateFilters();
        });
    }

    handleClick = () => {
        this.setState({
            navClassName: "navButton-active"
        });

    }

    searchBooks = (event) => {
        event.preventDefault();
        this.handleClick();
        console.log(this.state.searchTerm);
        const url = 'https://www.googleapis.com/books/v1/volumes?q=';
        const searchTerm = this.state.searchTerm;

        fetch(`${url}${searchTerm}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Oops! Something went wrong, please try again.');
                }
            return response;
            })
            .then(response => response.json())
            .then(data => {
                this.pullData(data);
            })
            .catch(error => {
                this.setState({
                    error: error.message
                });
            });
    }

    pullData(data) {
        const newBooks = [];
        Object.keys(data.items).map(i => 
            newBooks.push({
                title: data.items[i].volumeInfo.title,
                author: `Author: ${data.items[i].volumeInfo.authors[0]}`,
                price: (data.items[i].saleInfo.saleability === "NOT_FOR_SALE") ? "Ebook unavailable" : 
                    (data.items[i].saleInfo.saleability === "FREE") ? "FREE" : `Ebook price: $${data.items[i].saleInfo.listPrice.amount}`, 
                blurb: data.items[i].volumeInfo.description,
                coverURL: (data.items[i].volumeInfo.imageLinks === undefined) ? null : data.items[i].volumeInfo.imageLinks.thumbnail,
                bookURL: data.items[i].volumeInfo.infoLink,
                isEbook: (data.items[i].saleInfo.isEbook === true) ? "ebook" : "book",
                genre: data.items[i].volumeInfo.categories
            })
        )
  
        this.setState({
            books: newBooks
        });
        this.updateFilters();
    }

    updateFilters() {
        console.log('update filters has ran', this.state.selected)
        console.log(typeof this.state.selected);
        const selectedBooks = [];
        for (let i = 0; i < this.state.books.length; i++) {
            console.log('for loop called');
            console.log(this.state.books[i].isEbook, this.state.selected)
            if (this.state.selected === null) {
                selectedBooks.push(this.state.books[i])
            }
            else if (this.state.books[i].isEbook === this.state.selected || this.state.books[i].price === this.state.selected) {
                selectedBooks.push(this.state.books[i])
            }
        }

        this.setState({
            selectedBooks: selectedBooks
        });
    }

    render() {
        return (
            <div className="mainSection">
                <form className="bookSearchBar">
                    <label htmlFor="searchBar">Search a title or author </label>
                    <input type="text" 
                        name="searchTerm" 
                        className="search"
                        placeholder="Search for books" 
                        value={this.searchTermRaw}
                        onChange={term => this.updateSearchTerm(term)}                
                    />
                    <button type="submit"
                        className="button"
                        onClick={this.searchBooks}>
                        Search
                    </button>
                </form>
                <BookFilters 
                    changeHandler={selected => this.setSelected(selected)}
                    updateFilters={() => this.updateFilters()}
                />
                <NavButton 
                    className={this.state.navClassName}
                />
                <div className="result-container">
                    <div className="content-frame">
                        {Object.keys(this.state.selectedBooks).map(i =>
                            <BookResults
                                id={Object.keys(this.state.selectedBooks)[i]}
                                key={Object.keys(this.state.selectedBooks)[i]}
                                searchTerm={this.state.searchTerm}
                                title={this.state.selectedBooks[i].title}
                                author={this.state.selectedBooks[i].author}
                                price={this.state.selectedBooks[i].price}
                                blurb={this.state.selectedBooks[i].blurb}
                                coverURL={this.state.selectedBooks[i].coverURL}
                                bookURL={this.state.selectedBooks[i].bookURL}
                            />
                        )}
                        <div className="filling-empty-space">
                            {/* hello */}
                        </div>
                        <div className="filling-empty-space">
                            {/* hello */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookSearchBar;