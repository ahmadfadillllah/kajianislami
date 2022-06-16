helpers = require('./helpers');

const COLORS = helpers.generateHslaColors(9);

var mymap = L.map("mapid");
var marker = L.layerGroup().addTo(mymap);
var popup = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

L.popup();

const createControl = (data) => {
    let tujuan = RUTE_TUJUAN.latLong();
    var control = L.Routing.control({
        waypoints: [
            L.latLng(-1.616729, 103.623597),
            L.latLng(tujuan.latitude, tujuan.longitude)
        ],
        routeWhileDragging: true,
        lineOptions: {
            styles: [{color: COLORS[0], opacity: 1, weight: 5}],
            // addWaypoints: false
        },
        routingOptions: {alternatives: true},
        // geocoder: L.Control.Geocoder.nominatim()
    })
        .on('routeselected', function (e) {
            var route = e.route;
            let rute = JSON.stringify(route);
            $("#rute").val(rute);
        })
        .addTo(mymap);

    control.hide();
};

const mapError = (error) => {
    if (error.code == 1) {
        alert("Silahkan aktif izin lokasi");
    } else if (error.code == 2) {
        alert("Lokasi tidak tersedia");
    } else if (error.code == 3) {
        alert("Timeout akses lokasi");
    }
};

$(document).ready(function () {
    getlokasi();
});

function getlokasi() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, mapError, {enableHighAccuracy: true});
    }

}

const onMapClick = (e) => {
    popup
        .setLatLng(e.latlng)
        .setContent(
            "koordinatnya adalah " + e.latlng) //set isi konten yang ingin ditampilkan, kali ini kita akan menampilkan latitude dan longitude
        .openOn(mymap);
    //value pada form latitde, longitude akan berganti secara otomatis
    document.getElementById('latlong').innerHTML = e.latlng

}

function showPosition(position) {
    createControl(data = {
        dari: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    });

    var accuracy = position.coords.accuracy;
    setMapGeo();
    mymap.on('click', onMapClick); //jalankan fungsi

}

// set map
function setMapGeo() {
    mymap.setView(
        [latitude, longitude],
        13
    );
    //setting maps menggunakan api mapbox bukan google maps, daftar dan dapatkan token
    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWhtYWRmYWRpbGxsbGFoIiwiYSI6ImNsMDdydXM3eDJrbm0zaGxzcXEyOTljbmUifQ.BChqppsKGxQnbG2vUDOoww", {
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
        }
    ).addTo(mymap);
    // set marker untuk gps
    L.circle([latitude, longitude], {
        radius: 150
    }).addTo(mymap);
}

function showMosque(params) {
    if (marker) {
        // clear layer marker
        mymap.eachLayer((layer) => {
            layer.remove();
        });
        // clear layer marker route
        if (routing) {
            routing.spliceWaypoints(0, 1);
            routing.remove()
        }
        setMapGeo();
    }
    // get data from api
    axios.get("{{url('api/show-mosque/floyd')}}", {
        // parameter send to controller
        params: {
            lat: latitude,
            long: longitude,
            type: params
        }
    })
        .then(function (response) {
            // handle success
            response.data.map(function (element) {
                console.log(element);
                // get data from api
                var idMosque = element.id;
                var txtNameMosque = element.namamasjid;
                var txtAddressMosque = element.alamat;
                var txtTypeMosque = element.jeniskajian;
                var urlImage = element.image_url;
                //    custome icon markers
                var mosqueIcon = new L.Icon({
                    iconSize: [27, 27],
                    iconAnchor: [13, 27],
                    popupAnchor: [1, -24],
                    iconUrl: 'https://i.ibb.co/FVz3mxG/mosque.png'
                });
                // remove latlong text
                var txtLatlong = element.latlong.replace('LatLng(', '');
                txtLatlong = txtLatlong.replace(')', '');
                // convert to array
                txtLatlong = txtLatlong.split(",");
                // get latitude
                var lat = txtLatlong[0].replace(' ', '');
                var long = txtLatlong[1].replace(' ', '');
                // add marker to map
                L.marker([lat, long], {icon: mosqueIcon}).addTo(mymap).on('click', function (e) {
                    //    set data to input html
                    $('#mosque_dest').val(txtNameMosque);
                    $('#id_mosque').val(idMosque);
                    // function callback when click action to show pop up
                    L.popup()
                        .setLatLng(e.latlng)
                        .setContent(`<div class="card-group">
                    <div class="card">
                        <img class="card-img-top" src="` + urlImage + `" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">` + txtNameMosque + `</h5>
                        <p class="text-secondary">` + txtAddressMosque + `</p>
                        <p class="card-text text-light">` + txtTypeMosque + `</p>
                        </div>
                        <button onclick="showRoute('` + lat + `','` + long + `')" class="btn btn-primary btn-sm">Tampilkan Rute</button>
                    </div>`)
                        .openOn(mymap);

                });

            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

}

