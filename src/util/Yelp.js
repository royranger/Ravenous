const clientId = 'HNZAnfFY1laDq3JQpeo1_A';
const secret = 'LZ1rTYp8OVpQL4entGBagEa3rpAr0t63SUfEgLfpUiDalZ29jIUbbXKIsdsIDjOC';
let accessToken;

export const Yelp = {
  // Method to retrieve an access token required to access the api
  getAccessToken: () => {
    if (accessToken) {
      return new Promise(
        resolve =>
        resolve(accessToken)
      );
    }
    return fetch(
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=' +
      clientId + '&client_secret=' + secret, {
        method: 'POST'
      }
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },

  // Method to retrieve search results from the Yelp API
  search: (term, location, sortBy) => {
    return (
      Yelp.getAccessToken().then(() => {
        return (
          fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' +
            term + '&location=' + location + '&sort_by=' + sortBy, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          )
        ).then(response => {
          return response.json();
        }).then(jsonResponse => {
          if (jsonResponse.businesses) {
            console.log(jsonResponse.businesses);
            return jsonResponse.businesses.map(business => {
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address1: business.location.address1,
                address2: business.location.address2,
                city: business.location.city,
                zipCode: business.location.zip_code,
                rating: business.rating,
                reviewCount: business.review_count
              }
            });
          }
        })
      })
    );
  }
};
