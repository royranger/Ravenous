import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business.js';

class BusinessList extends React.Component {
    render() {
      return (
        <div className="BusinessList">
            {
              //Iterate over the array of business objects.
              //Each time, return an instance of the Business component with a property
              //of the next business object in the array.
              this.props.businesses.map(function(business) {
                return (<Business key={business.id} business={business}/>);
              })
            }
        </div>
      );
    }
}

export default BusinessList;
