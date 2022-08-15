const apiKey =
  'SAUeReuiIumzyOorBheKnnLv6peT1vGlRh4jxBa_434IaC3rn6FHcfBjYSPxyiTwnDxV_R6POAEtIRv-Scr4kpTFRHgfXerzPb9yCj-sXxXBoFu2HbQZeL-ZOsr6YnYx'

const Yelp = {
  search: async (term, location, sortBy) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories.map((category) => category.title),
            rating: business.rating,
            reviewCount: business.review_count
          }))
        }
      })
  }
}

export default Yelp
