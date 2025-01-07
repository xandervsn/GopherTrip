let map;

async function initMap(){
const { Map, InfoWindow } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:44.9842678274844, lng: -93.25080283378745},
    zoom: 15,
    mapId: 'f8ca2dc215ac0fd6'
  });

  const tourStops = [
    {
      position: {lat:44.9842678274844, lng: -93.25080283378745},
      title: "UMN",
    },
  ];
  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();

  // Create the markers.
  tourStops.forEach(({ position, title }, i) => {
    const pin = new PinElement({
    });
    const marker = new AdvancedMarkerElement({
      position,
      map,
      title: `${title}`,
      content: pin.element,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  });
  
  
  const coords = {
    south: 44.95250069325519,
    west: -93.24932677481614,
    north: 44.99855253452178,
    east: -93.21271216040408,
  };  

  rt2 = new google.maps.GroundOverlay( 'trails//rt2_4px.svg', coords );
  rt2.setMap(map);

  rt3 = new google.maps.GroundOverlay( 'trails//rt3_4px.svg', coords );
  rt3.setMap(map);

  rt6 = new google.maps.GroundOverlay( 'trails//rt6_4px.svg', coords );
  rt6.setMap(map);

  // Zoom event listener
  google.maps.event.addListener(map, 'zoom_changed', function() {
    zoomLevel = map.getZoom();
    console.log(zoomLevel)

    rt2.setMap(null);
    if (zoomLevel < 15) { rt2 = new google.maps.GroundOverlay('trails//rt2_8px.svg', coords); }
    if (zoomLevel > 15) { rt2 = new google.maps.GroundOverlay('trails//rt2_4px.svg', coords); }
    if (zoomLevel > 16) { rt2 = new google.maps.GroundOverlay('trails//rt2_3px.svg', coords); }
    if (zoomLevel > 17) { rt2 = new google.maps.GroundOverlay('trails//rt2_2px.svg', coords); }
    if (zoomLevel > 18) { rt2 = new google.maps.GroundOverlay('trails//rt2_1px.svg', coords); }
    rt2.setMap(map);

    rt3.setMap(null);
    if (zoomLevel < 15) { rt3 = new google.maps.GroundOverlay('trails//rt3_8px.svg', coords); }
    if (zoomLevel > 15) { rt3 = new google.maps.GroundOverlay('trails//rt3_4px.svg', coords); }
    if (zoomLevel > 16) { rt3 = new google.maps.GroundOverlay('trails//rt3_3px.svg', coords); }
    if (zoomLevel > 17) { rt3 = new google.maps.GroundOverlay('trails//rt3_2px.svg', coords); }
    if (zoomLevel > 18) { rt3 = new google.maps.GroundOverlay('trails//rt3_1px.svg', coords); }
    rt3.setMap(map);

    rt6.setMap(null);
    if (zoomLevel < 15) { rt6 = new google.maps.GroundOverlay('trails//rt6_8px.svg', coords); }
    if (zoomLevel > 15) { rt6 = new google.maps.GroundOverlay('trails//rt6_4px.svg', coords); }
    if (zoomLevel > 16) { rt6 = new google.maps.GroundOverlay('trails//rt6_3px.svg', coords); }
    if (zoomLevel > 17) { rt6 = new google.maps.GroundOverlay('trails//rt6_2px.svg', coords); }
    if (zoomLevel > 18) { rt6 = new google.maps.GroundOverlay('trails//rt6_1px.svg', coords); }
    rt6.setMap(map);

  });

}

window.initMap = initMap;
