import React, { Component } from 'react';

import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import {Yelp} from './util/Yelp.js';

/*
let business = {
  imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
  name: 'MarginOtto Pizzeria',
  address: '1010 Paddington Way',
  city: 'Flavortown',
  state: 'NY',
  zipCode: '10101',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 90
};

//An array of objects with business details
let businesses = [business, business, business, business, business, business];

*/

class App extends Component {
  constructor () {
    super();
    this.state = {
      businesses: []
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    //console.log(`Searching Yelp with ${term}, ${location} and ${sortBy}`);
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState ({
        businesses: businesses
      });
    });
  }


  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
          <SearchBar
            searchYelp={this.searchYelp}/>
          <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
