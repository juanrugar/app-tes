
function addSites() {
    //PLB PhD Thesis archaeological record
    //archaeological site plans in 2d polygons
    var url = 'data\AAG_ElLechugal_WGS84.geojson';
    map.addSource('sites', { type: 'geojson', data: url });

    //So as to draw polygons I used the reference
    //https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
    // Add a new layer to visualize the polygon.
    map.addLayer({
        'id': 'siteMap',
        'type': 'fill',
        'source': 'sites', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
        }
    });
    // Add a black outline around the polygon.
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'sites',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 3
        }
    });

} //END FUNCTION
