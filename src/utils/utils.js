
export function formatDate( dateString ) {

  const options = {

    year: 'numeric',

    month: 'numeric',

    day: 'numeric'

  }

  return new Date( dateString ).toLocaleDateString( 'en-US', options );

}

export async function fetchRequests() {

  try {
    
    const options = {

      method: 'GET',

      headers: {

        'Content-Type': 'application/json',

        'Accept': 'application/json',
        
        // 'Host': 'http://127.0.0.1:3000',

        // 'Cache': 'no-cache'

        // 'Access-Control-Allow-Origin': 'http://localhost:3000'
        
      },

      credentials: 'include'

    }

    const response = await fetch( 'http://localhost:3000/requests', options );

    console.log( response, 'response' );

    if ( response.ok ) {

      const requests = await response.json();
  
      console.log( requests, 'requests' );
  
      return requests;

    } else {

      return null;

    }

  } catch ( error ) {
    
    console.log( error );

  }

}