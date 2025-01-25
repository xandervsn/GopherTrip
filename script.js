// Initialize the map and required services
async function initMap() {
  // Create a map instance centered on a default location
  const { Map, InfoWindow } = await google.maps.importLibrary('maps')
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker')

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 44.9842678274844, lng: -93.25080283378745 },
    zoom: 15,
    mapId: 'f8ca2dc215ac0fd6',
  })

  map.setOptions({ styles: styles['hide'] })

  const styles = {
    default: [],
    hide: [
      {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
    ],
  }

  // Create the DirectionsService object
  const directionsService = new google.maps.DirectionsService()

  // Optional: Add click handlers for interactive point selection
  let markers = []
  let currentPolyline = null

  map.addListener('click', (event) => {
    console.log('hi')
  })
}
