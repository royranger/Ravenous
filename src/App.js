// See notes below

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



/*

Notes!!!
Yelp API results go on a journey:

1. In the <SearchBar/> component, the user clicks the link "Let's Go". This has an
    onClick attribute, which calls this.handleSearch().
2. this.handleSearch calls searchYelp() (<SearchBar/> was passed this method
    as a prop from the App component)
3. searchYelp() calls Yelp.search(). Yelp.search returns an array of objects,
    each representing a food place. searchYelp (in App still) puts this array
    of objects into its state.businesses. So now App.state.businesses contains
    the array of objects that we got from the Yelp API.
4.  In App, we pass this.state.businesses as a props called 'businesses' to the
    <BusinessList/> component. And now <BusinessList/> has a props, called
    'businesses', which is equal to the array of objects that we got from the
    Yelp API.
5. In BusinessList.js, we call map on this.props.businesses, ie on the array of
      objects. For each object in the array, we return a <Business/> component.
      Each <Business/> component is passed a props, 'business', that is equal
      to ONE of the objects in the array of objects that we got from the Yelp
      API. So if we have an array of 5 objects, our first <Business/> component
      would have a props of the first object, the second <Business/> component
      would have a props of the second object, and so on.
6.  Now in Business.js, we make the details of each food place show up on the screen.
      Remember that each <Business/> has a props, 'business', that is equal to an
      object representing a restaurant. We put these in <h3></h3> tags, saying
      {this.props.business.name}, {this.props.business.address} and so on, to
      access the properties of these objects and display them on the screen.





*/
