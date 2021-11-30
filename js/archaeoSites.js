
function addSites() {
    //PLB PhD Thesis archaeological record
    var url = 'data/170509AE_v5.geojson';
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
