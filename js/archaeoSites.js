
 var url = 'data/jaciments_app5.geojson';   
function addSites() {
    
    
    map.addSource('sites', { type: 'geojson', data: url });

    map.addLayer({
        'id': 'siteMap',
        'type': 'circle',
        'source': 'sites',
        'layout': {
        },
        'paint': {
            'circle-color': 'darkred',
            'circle-stroke-color': 'black',
            'circle-radius': 4
        }
    });

} //END FUNCTION
