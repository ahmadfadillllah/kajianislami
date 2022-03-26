@include('dashboard.master.head')
@include('dashboard.master.header')
@include('dashboard.master.main')

<!-- Begin: Content-->
<div class="app-content content ">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper container-xxl p-0">
        <div class="content-header row">
            <div class="content-header-left col-md-9 col-12 mb-2">
                <div class="row breadcrumbs-top">
                    <div class="col-12">
                        <h2 class="content-header-title float-start mb-0">Pencarian Rute</h2>
                        <div class="breadcrumb-wrapper">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a>
                                </li>
                                <li class="breadcrumb-item"><a href="#">Kajian</a>
                                </li>
                                <li class="breadcrumb-item active"><a href="">A Star</a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
                <div class="mb-1 breadcrumb-right">
                    <div class="dropdown">
                        <button class="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i
                                data-feather="grid"></i></button>
                        <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="app-todo.html"><i
                                    class="me-1" data-feather="check-square"></i><span
                                    class="align-middle">Todo</span></a><a class="dropdown-item" href="app-chat.html"><i
                                    class="me-1" data-feather="message-square"></i><span
                                    class="align-middle">Chat</span></a><a class="dropdown-item"
                                href="app-email.html"><i class="me-1" data-feather="mail"></i><span
                                    class="align-middle">Email</span></a><a class="dropdown-item"
                                href="app-calendar.html"><i class="me-1" data-feather="calendar"></i><span
                                    class="align-middle">Calendar</span></a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-body">

            <!-- Basic Vertical form layout section start -->
            <section id="basic-vertical-layouts">
                <div class="row">
                    <div class="col-md">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Lokasi</h4>
                            </div>
                            <div class="card-body">
                                <div id='mapid' style='min-height: 500px;'>
                                </div>
                            </div>
                            <div class="card-body">
                                <p id="capa"></p>
                                <button onclick="showMosque('all')" class="btn btn-primary me-1">Tampilkan kajian Islami</button>
                                <button onclick="showMosque('close-in')" class="btn btn-primary me-1">Tampilkan Rute Terdekat</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Detail Algoritma</h4>
                            </div>
                            <div class="card-body">
                                <form class="form form-vertical" action="{{route('astar.store')}}" method="POST">
                                    @csrf
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mb-1">
                                                <input type="hidden" name="id_masjid" id="id_mosque">
                                                <label class="form-label" for="first-name-icon">Nama Masjid yg dituju</label>
                                                <div class="input-group input-group-merge">
                                                    <input type="text" class="form-control" id="mosque_dest" name="namamasjid"
                                                        placeholder="Silahkan memasukkan titik lokasi dengan mengklik map dibawah"
                                                        readonly />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="mb-1">
                                                <label class="form-label" for="email-id-icon">Rute yang dilewati</label>
                                                <div class="input-group input-group-merge">
                                                    <input type="text" class="form-control"
                                                        name="rute" readonly />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="mb-1">
                                                <label class="form-label" for="contact-info-icon">Jarak Tempuh</label>
                                                <div class="input-group input-group-merge">
                                                    <input type="number" id="contact-info-icon" class="form-control"
                                                        name="jaraktempuh" placeholder="Mobile" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="mb-1">
                                                <div class="form-check">
                                                    <input type="checkbox" class="form-check-input" id="customCheck4" />
                                                    <label class="form-check-label" for="customCheck4">Sudah baca kebijakan</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button type="submit" class="btn btn-primary me-1">Simpan</button>
                                            <button type="reset" class="btn btn-outline-secondary">Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <!-- Basic Vertical form layout section end -->

        </div>
    </div>
</div>
<!-- END: Content-->

<!-- BEGIN: Footer-->
@include('dashboard.master.footer')
<script src="https://code.jquery.com/jquery-3.6.0.slim.js" integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
<script src="{{asset('axios.min.js')}}"></script>
<!-- END: Footer-->

<script>
      //Kondisi utk mencari tingkat akurasi yang tinggi
    // init global variable map
    var mymap = L.map("mapid");
    var marker = L.layerGroup().addTo(mymap);
    var latitude 
    var longitude
    var routing ='';
    $(document).ready(function () {
        // first call 
        getlokasi();
    });
    function getlokasi() {
        //jika browser mendukung navigator.geolocation maka akan menjalankan perintah di bawahnya
        if (navigator.geolocation) {
            // getCurrentPosition digunakan untuk mendapatkan lokasi pengguna
            //showPosition adalah fungsi yang akan dijalankan
            navigator.geolocation.getCurrentPosition(showPosition),{
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
                .setContent("koordinatnya adalah " + e
                .latlng) //set isi konten yang ingin ditampilkan, kali ini kita akan menampilkan latitude dan longitude
                .openOn(mymap);
            //value pada form latitde, longitude akan berganti secara otomatis
            document.getElementById('latlong').value = e.latlng

        }
        mymap.on('click', onMapClick); //jalankan fungsi

    }
    // set map 
    function setMapGeo(){
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
        if(marker){
            // clear layer marker 
            mymap.eachLayer((layer) => {
                layer.remove();
            });
            // clear layer marker route
            if(routing){
                routing.spliceWaypoints(0, 1);
                routing.remove()
            }
            setMapGeo();
        }
        // get data from api
        axios.get("{{url('api/show-mosque/astar')}}",{
            // parameter send to controller
                params: {
                lat: latitude,
                long:longitude,
                type:params
                }
            })
        .then(function (response) {
            // handle success
            response.data.map(function(element){
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
                var txtLatlong = element.latlong.replace('LatLng(','');
                txtLatlong =  txtLatlong.replace(')','');
                // convert to array
                txtLatlong =  txtLatlong.split(",");
                // get latitude
                var lat = txtLatlong[0].replace(' ','');
                var long = txtLatlong[1].replace(' ','');
                // add marker to map
               L.marker([lat,long],{icon: mosqueIcon}).addTo(mymap).on('click', function(e) {              
                //    set data to input html 
                    $('#mosque_dest').val(txtNameMosque);
                    $('#id_mosque').val(idMosque);
                    // function callback when click action to show pop up
                  L.popup()
                    .setLatLng(e.latlng)
                    .setContent(`<div class="card-group">
                    <div class="card">
                        <img class="card-img-top" src="`+urlImage+`" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">`+txtNameMosque+`</h5>
                        <p class="text-secondary">`+txtAddressMosque+`</p>
                        <p class="card-text text-light">`+txtTypeMosque+`</p>
                        </div>
                        <button onclick="showRoute('`+lat+`','`+long+`')" class="btn btn-primary btn-sm">Tampilkan Rute</button>
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

    function showRoute(lat,long){
    //    var routeControl  = L.routing.control
    // get curren location
        navigator.geolocation.getCurrentPosition(position => {
        const { coords: { latitude, longitude }} = position;
        // remove all routes before add route
        if(routing){
            routing.spliceWaypoints(0, 1);
            routing.remove()
        }
        // add route to map
        routing =  L.Routing.control({
                waypoints: [
                    L.latLng(position.coords.latitude, position.coords.longitude),
                    L.latLng(lat, long),
                ]
            }).addTo(mymap);
        });

    }

</script>
