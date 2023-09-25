

export function formatDate( dateString ) {

  const options = {

    year: 'numeric',

    month: 'numeric',

    day: 'numeric'

  }

  return new Date( dateString ).toLocaleDateString( 'en-US', options );

}
