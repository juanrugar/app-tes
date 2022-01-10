var layerSites;
var urlSites = "data/jaciments_app5.geojson";

function addSitesData() { 

    layerSites  = new L.GeoJSON.AJAX(urlSites, {
            onEachFeature: function (feature, layer) {
                popupContent = "<b>" + feature.properties.app_site + "</b>"+
                "<br>" + feature.properties.app_muni +
                " (" + feature.properties.app_comar + ")"+ "<br/>"+
                "<br>Cronologia: " + feature.properties.app_chrono + "<br/>"+
                "<br>Fase Cultural 1: " + feature.properties.cult1 + "<br/>"+
                "<br>" + feature.properties.cult2 + "<br/>"+
                "<br>" + feature.properties.cult3 + "<br/>"+
                "<br>" + feature.properties.cult4 + "<br/>"+
                "<br>" + feature.properties.type1 + "<br/>"+
                "<br>" + feature.properties.type2 + "<br/>"+
                "<br>" + feature.properties.type1 + "<br/>"+
                "<br><a>" + feature.properties.gva_fitxa + "</a></b>";
                layer.bindPopup(popupContent);
            },
            pointToLayer: function (feature, latlng) {
               // puntosCluster.addLayer(L.marker(latlng));
                return L.circleMarker(latlng, {
                    radius: 6,
                    fillColor: "#00ff00",
                    color: "#ffffff",
                    weight: 3,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(map);

       // map.setView([39.47, -0.376389], 11);
        //adding layer control
       controlCapas.addOverlay(layerSites, "Jaciments Arqueològics");

        //adding leaflet-search CONTROLS

        var searchControl = new L.Control.Search({
            layer: layerSites,
            initial: false,
            propertyName: 'app_site',
            circleLocation: true,
            moveToLocation: function (latlng) {
                map.setView(latlng, 17);
            } 
        });

        searchControl.on('search:locationfound', function(e) {
            e.layer.openPopup();
        });
        map.addControl(searchControl);
        

}//fin funcion