
export function formatDate( dateString ) {

  const options = {

    year: 'numeric',

    month: 'numeric',

    day: 'numeric'

  }

  return dateString ? new Date( dateString ).toLocaleDateString( 'en-US', options ) : null;

}

export function getToken( name='token' ) {

  return localStorage.getItem( name );

}

export function removeToken( name='token' ) {

  localStorage.removeItem( name );

}

export function decodeJWT( token ) {

  const tokenParts = token.split( '.' );

  if ( tokenParts.length !== 3 ) throw new Error( 'Invalid token format' );

  const header = JSON.parse( atob( tokenParts[ 0 ] ) );

  const payload = JSON.parse( atob( tokenParts[ 1 ] ) );

  return { header, payload };

}
