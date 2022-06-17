fw = require('floyd-warshall-shortest');

const COLORS = helpers.generateHslaColors(20);
const CONFIG = {
    show_control: true
};
const LOKASI_SEKARANG = {
    lat: null, lng: null
};

var mymap = L.map("mapid");
var marker = L.layerGroup().addTo(mymap);
var routing = '';

var popup = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);


function getlokasi() {
    //jika browser mendukung navigator.geolocation maka akan menjalankan perintah di bawahnya
    if (navigator.geolocation) {
        // getCurrentPosition digunakan untuk mendapatkan lokasi pengguna
        //showPosition adalah fungsi yang akan dijalankan
        navigator.geolocation.getCurrentPosition(showPosition), {
            enableHighAccuracy: true
        };
    }

}

function showPosition(position) {
    // set vaue latitude longitude
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;


    var capa = document.getElementById("capa");
    capa.innerHTML = "latitude: " + latitude + ", longitude: " + ", accuracy: " + accuracy;

    // call function set map
    setMapGeo();

    // buat fungsi popup saat map diklik
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("koordinatnya adalah " + e.latlng) //set isi konten yang ingin ditampilkan, kali ini kita akan menampilkan latitude dan longitude
            .openOn(mymap);
        //value pada form latitde, longitude akan berganti secara otomatis
        document.getElementById('latlong').value = e.latlng

    }

    mymap.on('click', onMapClick); //jalankan fungsi

}

// set map
function setMapGeo() {
    mymap.setView([latitude, longitude], 13);
    //setting maps menggunakan api mapbox bukan google maps, daftar dan dapatkan token
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWhtYWRmYWRpbGxsbGFoIiwiYSI6ImNsMDdydXM3eDJrbm0zaGxzcXEyOTljbmUifQ.BChqppsKGxQnbG2vUDOoww", {
        maxZoom: 18, id: "mapbox/streets-v11", tileSize: 512, zoomOffset: -1,
    }).addTo(mymap);
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
            routing.remove();
        }
        setMapGeo();
    }
    // get data from api
    axios.get(BASE_URL + '/api/show-mosque/floyd', {
        // parameter send to controller
        params: {
            lat: latitude, long: longitude, type: params
        }
    })
        .then(function(response) {
            // handle success
            response.data.map(function(element) {
                // get data from api
                var idMosque = element.id;
                var txtNameMosque = element.tempat;
                var txtAddressMosque = element.waktu;
                var txtTypeMosque = element.judul;
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
                L.marker([lat, long], { icon: mosqueIcon }).addTo(mymap).on('click', (e) => {
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
                        <button onclick="showRoute('` + lat + `','` + long + `', '` + idMosque + `')" class="btn btn-primary btn-sm">Tampilkan Rute</button>
                    </div>`)
                        .openOn(mymap);

                });

            })
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
        });

}

window.showRoute = async function(lat, long, idMosque) {
    navigator.geolocation.getCurrentPosition(async position => {
        const { coords: { latitude, longitude } } = position;
        LOKASI_SEKARANG.lat = latitude;
        LOKASI_SEKARANG.lng = longitude;

        clear_way_points();

        let response = await axios.get(BASE_URL + '/api/show-mosque/rute?id=' + idMosque);
        let datas = response.data;
        let all_edges = [];
        let all_nodes = [];
        let lokasi_tujuan;
        for (let i = 0; i < datas.length; i++) {
            let { rute, kajian_islami } = datas[i];
            lokasi_tujuan = parse_koodinate(kajian_islami.latlong);
            let nodes = route_to_node(JSON.parse(rute), i);
            let edges = create_edges(nodes, LOKASI_SEKARANG, lokasi_tujuan);
            // let controls = draw_way_point(JSON.parse(rute), COLORS[i]);
            all_edges = all_edges.concat(edges);
            all_nodes = all_nodes.concat(nodes.coordinates);
        }
        let result = floyd_warshall_find(all_edges, "dari", "tujuan", (result, summary) => {
            all_nodes.push({ lat: LOKASI_SEKARANG.lat, lng: LOKASI_SEKARANG.lng, nama: 'dari' });
            all_nodes.push({ lat: lokasi_tujuan.lat, lng: lokasi_tujuan.lng, nama: 'tujuan' });
            let controls = draw_way_to_map(result, all_nodes, "black");
            print_performa(summary);
        });
        // remove all routes before add route
        // if (routing) {
        //     routing.spliceWaypoints(0, 1);
        //     routing.remove()
        // }
        // // add route to map
        // routing = L.Routing.control({
        //     waypoints: [
        //         L.latLng(position.coords.latitude, position.coords.longitude),
        //         L.latLng(lat, long),
        //     ],
        // }).addTo(mymap);
    });

}

const print_performa = function(summary) {
    $("#performa").html(JSON.stringify(summary));
};

const draw_way_point = (route, color) => {
    let { instructions, waypoints } = route;
    let _waypoints = [];
    for (let i = 0; i < waypoints.length; i++) {
        const pp = waypoints[i];
        let { lat, lng } = pp.latLng;
        _waypoints.push(L.latLng(lat, lng))
    }
    let control = L.Routing.control({
        waypoints: _waypoints,
        routeWhileDragging: false,
        lineOptions: {
            styles: [{ color: color, opacity: 1, weight: 5 }],
            addWaypoints: false
        }, createMarker: function(i, waypoint, n) {
            const numMarker = L.ExtraMarkers.icon({
                icon: 'fa-number', number: i + 1, markerColor: color, svg: true
            });

            return L.marker(waypoint.latLng, {
                draggable: true, bounceOnAdd: false, bounceOnAddOptions: {
                    duration: 1000, height: 800, function() {
                        (bindPopup(myPopup).openOn(mymap))
                    }
                }, icon: numMarker
            });
        }
    }).addTo(mymap);
    if (!CONFIG.show_control) {
        control.hide();
    }
    return control;
};

const euclidean_distance = (a, b) => {
    return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));
}

const route_to_node = (route, key) => {
    let { instructions, waypoints, coordinates } = route;
    for (let i = 0; i < coordinates.length - 1; i++) {
        coordinates[i].nama = `${key}${i}`;
        if (i === 0) {
            coordinates[i].distance = 0;
        } else {
            coordinates[i].distance = euclidean_distance(coordinates[i - 1], coordinates[i]);
        }
    }
    return {
        coordinates: coordinates, total_distance: coordinates.reduce(function(a, b) {
            return a + (b.distance || 0);
        }, 0)
    }
}


// const route_to_node = (route) => {
//     let {instructions, waypoints} = route;
//     var way_point_reach_index = 0;
//     var tmp_distance = 0;
//     for (let i = 0; i < instructions.length; i++) {
//         const instruction = instructions[i];
//         tmp_distance += instruction.distance;
//         if (instruction.type === "WaypointReached") {
//             waypoints[way_point_reach_index + 1].distance = tmp_distance;
//             tmp_distance = 0;
//             way_point_reach_index++;
//         }
//     }
//     return {
//         waypoints: waypoints, total_distance: waypoints.reduce(function (a, b) {
//             return a + (b.distance || 0);
//         }, 0)
//     }
// }
/**
 * edges = [
 *     { from: 'A', to: 'B', weight: 4 },
 *     { from: 'A', to: 'C', weight: 2 },
 *     { from: 'B', to: 'C', weight: 5 },
 *     { from: 'B', to: 'D', weight: 10 },
 *     { from: 'C', to: 'E', weight: 3 },
 *     { from: 'E', to: 'D', weight: 4 },
 *     { from: 'D', to: 'F', weight: 11 },
 * ];
 * @param edges
 * @param dari
 * @param tujuan
 * @param result_callback
 * @returns {*}
 */
const floyd_warshall_find = async (edges, dari, tujuan, result_callback) => {
    const t0 = performance.now();
    graph = new fw.FloydWarshall(edges);
    path = graph.getShortestPath(dari, tujuan);
    const t1 = performance.now();
    const summary = {
        time_ms: t1 - t0, total_node: edges.length
    };
    result_callback(path, summary);
};

const parse_koodinate = function(koordinat) {
    let lokasi = koordinat.replace("LatLng(", "").replace(")", "").split(",");
    return {
        lat: parseFloat(lokasi[0]), lng: parseFloat(lokasi[1])
    };
};


const clear_way_points = function() {
    mymap.eachLayer((layer) => {
        if (layer.options.waypoints && layer.options.waypoints.length) {
            this.map.removeLayer(layer);
        }
    });
}

const create_edges = function(nodes, dari, tujuan) {
    let edges = [];
    let { coordinates } = nodes;
    for (let i = 0; i < coordinates.length - 1; i++) {
        const from = coordinates[i];
        const to = coordinates[i + 1];
        edges.push({
            from: from.nama, to: to.nama, weight: to.distance
        });
    }
    for (let i = 0; i < coordinates.length; i++) {
        const to = coordinates[i];
        edges.push({
            from: "dari", to: to.nama, weight: euclidean_distance(dari, to)
        });
    }
    for (let i = 0; i < coordinates.length; i++) {
        const dari = coordinates[i];
        edges.push({
            from: dari.nama, to: "tujuan", weight: euclidean_distance(dari, tujuan)
        });
    }
    return edges;
};

const draw_way_to_map = function(route, edges, color) {
    console.info("edges", edges);
    let _waypoints = [];
    for (let i = 0; i < route.length; i++) {
        const nama = route[i];
        const pp = edges.find(element => element.nama === nama);
        console.info("pp", pp);
        let { lat, lng } = pp;
        _waypoints.push(L.latLng(lat, lng))
    }
    let control = L.Routing.control({
        waypoints: _waypoints, lineOptions: {
            styles: [{ color: color, opacity: 1, weight: 5 }]
        }, createMarker: function(i, waypoint, n) {
            const numMarker = L.ExtraMarkers.icon({
                icon: 'fa-number', number: i + 1, markerColor: color, svg: true
            });

            return L.marker(waypoint.latLng, {
                draggable: true, bounceOnAdd: false, bounceOnAddOptions: {
                    duration: 1000, height: 800, function() {
                        (bindPopup(myPopup).openOn(mymap))
                    }
                }, icon: numMarker
            });
        }
    }).addTo(mymap);
    // console.info("instructions", control.getWaypoints());
    if (!CONFIG.show_control) {
        control.hide();
    }
    return control;
}

$(document).ready(function() {
    // first call
    getlokasi();
    $('#show_mosque_all').on('click', function() {
        showMosque('all');
    });
});
