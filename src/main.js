// let apikey = 'zs69sKBzvhyewj6OJF7_wQCc74MyHExxd7v3fpWx9Dd1LyNOJTiMnJqpXnCRd2Pr2ib9KlHsoRmTvFlclltmw7A6rDFFPUoYeTD-zioltKPcNaAXJYqgqnjUMFYDXHYx';
// let clientID = 'hGenPmSp8JEg2w5pelLdKg';
// let term = 'dinosaur';
// let loc = 'Rochester, NY';
// let limit = 10;
// let offset = 0;
// let price = 1;
// let openNow = true;
// let categories = 'food,';
// let radius = 16500; //starts at 10 mile radius

var app = new Vue({
    el: "#app",
    data: {
        title: 'Quick Bytes',
        term: (localStorage.getItem('Search-Term')) ? localStorage.getItem('Search-Term') : '',
        loc: 'Rochester, NY',
        limit: 10,
        limits: [10, 25, 50],
        offset: 0,
        price: 1,
        categories: 'food,',
        radius: 16500,
        results: []
    },
    created() {
        this.search();
    },
    methods: {
        // https://people.rit.edu/sal6961/330/yelp-proxy/yelp-proxy.php?term?=${term}&location?=${loc}&radius?=${radius}&categories?=${categories}&limit?=${limit}&offset?=${offset}&price?=${price}&open_now?=${openNow}`

        populateCards(data) {
            let resultsArray = [];
            for (let i = 0; i < data.businesses.length /*limit*/ ; i++) {
                //assignments to new result object
                let result = {}
                result.name = data.businesses[i].name;
                result.coordinates = data.businesses[i].coordinates;
                result.phone = data.businesses[i].phone;
                result.isClosed = data.businesses[i].is_closed;
                result.price = data.businesses[i].price;
                result.rating = data.businesses[i].rating;
                result.reviewCount = data.businesses[i].review_count;
                result.url = data.businesses[i].url;
                result.location = data.businesses[i].location;
                result.imageURL = data.businesses[i].image_url;
                result.distance = data.businesses[i].distance;
                //push result object into array
                resultsArray.push(result);
            }
            this.results = resultsArray;
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
                    app.populateCards(data);
                    alert('successful!');
                },
                error: function (xhr, status, error) {
                    console.error(error)
                }
            });
        },

        storeTerm() {
            localStorage.setItem('Search-Term', this.term);
            let search = {};
            search.term = this.term;
            search.location = this.loc;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = mm + '/' + dd + '/' + yyyy;
            search.date = today;
            data.search.push(search);
            ref.set(data);
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