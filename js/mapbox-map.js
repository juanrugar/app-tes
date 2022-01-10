//Mapbox script from original main-map.html

        //Añadir vuestro token!!
        var map;
        var position = document.getElementById("position");

        function init() {
            mapboxgl.accessToken =
                'pk.eyJ1IjoianVhbnJ1Z2FyIiwiYSI6ImNranlpd2lqbzB5djQydW1sZTRvem9tdmgifQ.zvNvGIYji6wVpwjlnTHeJg';

            map = new mapboxgl.Map({
                container: 'mapa',
                style: 'mapbox://styles/juanrugar/cky4m106a0e3m14oaobd7wc25',
                center: [-0.698422, 39.573619],//[-89.47651, 16.95207] Mopan Valley Coords,
                zoom: 8,
                bearing: 0.00,
                pitch: 0.00
            });


            //controls
            map.addControl(new mapboxgl.AttributionControl({ compact: true }));
            map.addControl(new mapboxgl.NavigationControl());

            //geocoder control added
            map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl }));

            var directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                profile: 'mapbox/driving'
            });

            map.addControl(directions, 'bottom-left');

            map.on('load', function () {
                //geocoder
                updatePosition();
                //archaeological sites location
                addSites();
                //popup with site data
                addPopupToMap("siteMap");

            });

            map.on("click", function () {
                updatePosition()
            });

            var updatePosition = function () {
                var settings = 'center: [' + map.getCenter().lng.toFixed(5) + ', ' + map.getCenter().lat.toFixed(5) + '],\n' +
                    'zoom: ' + map.getZoom().toFixed(2) + ',\n' +
                    'bearing: ' + map.getBearing().toFixed(2) + '\n' +
                    'pitch: ' + map.getPitch().toFixed(2) + ',\n';

                position.innerText = settings;
            };


        } // final init


    