// let apikey = 'zs69sKBzvhyewj6OJF7_wQCc74MyHExxd7v3fpWx9Dd1LyNOJTiMnJqpXnCRd2Pr2ib9KlHsoRmTvFlclltmw7A6rDFFPUoYeTD-zioltKPcNaAXJYqgqnjUMFYDXHYx';
// let clientID = 'hGenPmSp8JEg2w5pelLdKg';
let term = 'dinosaur';
let loc = 'Rochester, NY';
let limit = 5;
let offset = 0;
let price = 1;
let openNow = true;
let categories = 'food,';
let radius = 16500; //starts at 10 mile radius

var app = new Vue({
    el: "#app",
    data: {
        title: 'Quick Bytes',
        term: term,
        loc: loc,
        limit: limit,
        limits: [10,25,50],
        offset: offset,
        price: price,
        openNow: openNow,
        categories: categories,
        radius: radius,
        results: []
    },
    created() {
        this.search();
    },
    methods: {
        // https://people.rit.edu/sal6961/330/yelp-proxy/yelp-proxy.php?term?=${term}&location?=${loc}&radius?=${radius}&categories?=${categories}&limit?=${limit}&offset?=${offset}&price?=${price}&open_now?=${openNow}`

        populateCards(data) {
            // let name,coordinates,phone,isClosed,price,rating,reviewCount,url,location,imageURL,distance;
            let results;
            for (let i = 0; i < data.businesses.length /*limit*/ ; i++) {
                //assignments
                results[i].name = data.businesses[i].name;
                results[i].coordinates = data.businesses[i].coordinates;
                results[i].phone = data.businesses[i].phone;
                results[i].isClosed = data.businesses[i].is_closed;
                results[i].price = data.businesses[i].price;
                results[i].rating = data.businesses[i].rating;
                results[i].reviewCount = data.businesses[i].review_count;
                results[i].url = data.businesses[i].url;
                results[i].location = data.businesses[i].location;
                results[i].imageURL = data.businesses[i].image_url;
                results[i].distance = data.businesses[i].distance;


            }
            return results;
        },

        search() {
            $.ajax({
                type: "POST",
                url: 'https://people.rit.edu/sal6961/330/yelp-proxy/yelp-proxy.php',
                crossDomain: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                },
                data: {
                    term: this.term,
                    location: this.loc,
                    limit: this.limit,
                    offset: this.offset,
                    price: this.price,
                    open: !this.openNow,
                    categories: this.categories,
                    radius: this.radius
                },
                success: function (data) {
                    console.log(data);
                    // this.results = this.populateCards(data)
                    let results;
                    for (let i = 0; i < data.businesses.length /*limit*/ ; i++) {
                        //assignments
                        results[i].name = data.businesses[i].name;
                        results[i].coordinates = data.businesses[i].coordinates;
                        results[i].phone = data.businesses[i].phone;
                        results[i].isClosed = data.businesses[i].is_closed;
                        results[i].price = data.businesses[i].price;
                        results[i].rating = data.businesses[i].rating;
                        results[i].reviewCount = data.businesses[i].review_count;
                        results[i].url = data.businesses[i].url;
                        results[i].location = data.businesses[i].location;
                        results[i].imageURL = data.businesses[i].image_url;
                        results[i].distance = data.businesses[i].distance;
        
        
                    }
                    this.results = results;
                    alert('successful!');
                },
                error: function (xhr, status, error) {
                    console.error(error)
                }
            });
        },

        initMap() {
            const mapOptions = {
                center: {
                    lat: 43.083848,
                    lng: -77.6799
                },
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            this.map.mapTypeId = 'satellite';
            this.map.setTilt(45);
        },

        addMarker(latitude, longitude, title) {
            let position = {
                lat: latitude,
                lng: longitude
            };
            let marker = new google.maps.Marker({
                position: position,
                map: this.map
            });
            marker.setTitle(title);
            // Add a listener for the click event
            google.maps.event.addListener(marker, 'click', function (e) {
                // `this` doesn't work here - because it refers to the marker that was clicked on - use `app` instead
                app.makeInfoWindow(this.position, this.title);
            });
        },

        makeInfoWindow(position, msg) {
            // Close old InfoWindow if it exists
            if (this.infowindow) this.infowindow.close();

            // Make a new InfoWindow
            this.infowindow = new google.maps.InfoWindow({
                map: this.map,
                position: position,
                content: "<b>" + msg + "</b>"
            });
        },

        setZoom(zoomLevel) {
            this.map.setZoom(zoomLevel);
        }
    }
});