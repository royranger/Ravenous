import React from 'react';
import './SearchBar.css';


let sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
};



class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        term: '',
        location: '',
        sortBy: 'best_match'
      };
      this.renderSortByOptions = this.renderSortByOptions.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);

    }

    getSortByClass(sortByOption) {
      if (this.state.sortBy === sortByOption) {
        return 'active';
      }
      else {
        return '';
      }
    }

    handleSortByChange(sortByOption) {
      this.setState({
        sortBy: sortByOption
      });
    }

    handleTermChange(event) {
      this.setState({
        term: event.target.value
      });
    }

    handleLocationChange (event) {
      this.setState({
        location: event.target.value
      });
    }

    handleSearch(event) {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
      event.preventDefault();
    }

// Displays a list of sorting options (Best Match, Highest Rated or Most reviewed.)
// Their keys will be 'best_match', 'rating', and 'review_count'.
// If their value ('eg best_match') matches the sortBy state of the SearchBar
// component, then their className will be set to 'active'.
// This means that visually, the user can see which sorting option is being used.
    renderSortByOptions() {
      return Object.keys(sortByOptions).map(sortByOption => {
          let sortByOptionValue = sortByOptions[sortByOption];
          return <li
            className={this.getSortByClass(sortByOptionValue)}
            key={sortByOptionValue}
            onClick={this.handleSortByChange.bind(this, sortByOptionValue)} >
            {sortByOption}
          </li>;
      });
    }

    render() {
      return(
        <div className="SearchBar">
          <div className="SearchBar-sort-options">
            <ul>
              {this.renderSortByOptions()}
            </ul>
          </div>
          <div className="SearchBar-fields">
            <input placeholder="Search Businesses"
                   onChange={this.handleTermChange} />
            <input placeholder="Where?"
                   onChange={this.handleLocationChange}/>
          </div>
          <div className="SearchBar-submit"
               onClick={this.handleSearch}>
            <a>Lets Go</a>
          </div>
      </div>
    );
    }

}

export default SearchBar;
