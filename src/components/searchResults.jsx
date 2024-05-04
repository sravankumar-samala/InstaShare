// import Cookies from 'js-cookie'
// import Header from '../ui/header'

// export default function SearchResults() {
//   const getSearchResults = async () => {
//     const searchApi = `https://apis.ccbp.in/insta-share/posts?search=${''}`
//     const jwtToken = Cookies.get('jwt_token')
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }
//     try {
//       const response = await fetch(searchApi, options)
//       const data = await response.json()
//       if (!response.ok) throw new Error(data.err_msg)
//       console.log(data)
//     } catch (error) {
//       console.log(error.message)
//     }
//   }

//   return (
//     <div className="search-results-container">
//       <Header />
//       <h1>Search Results container</h1>
//     </div>
//   )
// }

export default function SearchResults() {
  return <h1>Search Results</h1>;
}
