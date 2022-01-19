
var layerSites, selectSites;
var urlSites = "data/jaciments_app5.geojson";



//START addSitesData function 

function addSitesData() { 

    layerSites  = new L.GeoJSON.AJAX(urlSites, {
            onEachFeature: function (feature, layer) {
                popupContent = "<b>" + feature.properties.app_site + "</b>" +
                "<br>" + feature.properties.app_muni + " (" + feature.properties.app_comar + ")" + 
                "<hr>"+
                "<b>Cronologia: </b>" + feature.properties.app_chrono + 
                "<br><b>Fase 1: </b>" + feature.properties.cult1 + ", " + feature.properties.type1 + 
                "<br><b>Fase 2: </b>" + feature.properties.cult2 + ", " + feature.properties.type2 +
                "<br><b>Fase 3: </b>" + feature.properties.cult3 + ", " + feature.properties.type2 +
                "<br><a href=" +feature.properties.gva_fitxa+ ">Fitxa Inventari GVA</a>" +
                "<br>Notes: " + feature.properties.notes;
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

       //Adding layer control
       //layerControl.addOverlay(layerSites, "Jaciments Arqueològics");

        //adding leaflet-search CONTROLS
        //#1Search for arch sites
        var searchSites = new L.Control.Search({
            layer: layerSites,
            initial: false,
            textPlaceholder: "Cerca per Jaciment",
            propertyName: 'app_site',
            circleLocation: true,
            moveToLocation: function (latlng) {
                map.setView(latlng, 13);
            } 
        });

        searchSites.on('search:locationfound', function(e) {
            e.layer.openPopup();
        });
        map.addControl(searchSites);

    //#2 search for munipici
        var searchMuni = new L.Control.Search({
            layer: layerSites,
            initial: false,
            textPlaceholder: "Cerca per municipi",
            propertyName: 'app_muni',
            circleLocation: true,
            moveToLocation: function (latlng) {
                map.setView(latlng, 13);
            }
        });

        searchMuni.on('search:locationfound', function(e) {
            e.layer.openPopup();
        });
        map.addControl(searchMuni);
        
        
        
}
//END addSitesData function

//function selectFaseCult
function selectFaseCult() {
            var mySelect = document.getElementById("fase").value;
                        
            selectSites = L.GeoJSON.AJAX(urlSites, {
                pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                        radius: 6,
                        fillColor: "#00ff00",
                        color: "#ffffff",
                        weight: 3,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                filter: function(feature, layer) {  								
                        if(mySelect != "Tots")	{	
                            return (feature.properties.cult1 == mySelect );
                        }else{
                            return true;
                        }
                }
            }).addTo(map);;
                                        
        
}
                                        
//END SELECT FUNCTION CULTURAL PHASE
                                        
                                        
                                        