const apiKey = 'gFL4ct4Iiqn8ktK2mesHDt0OWXzzyWwk_5n_zJvrvkr3_xQgSLGudNAGNNwAablEnX8jvsuXucs5jkX6-sLNKMAfU2U7bn3zOmoBai1jo4Z1eQwywSrDEjAENUrpWXYx';

export const Yelp = {

  search: (term, location, sortBy) => {

    return (
          fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' +
            term + '&location=' + location + '&sort_by=' + sortBy, {
              headers: {
                Authorization: `Bearer ${apiKey}`
              }
            }
          )
        .then(response => response.json())
        .then(jsonResponse => {
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
      )
  }
};
