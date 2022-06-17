@include('dashboard.master.head')
@include('dashboard.master.header')
@include('dashboard.master.main')

<!-- BEGIN: Content-->
<div class="app-content content ">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper container-xxl p-0">
        <div class="content-header row">
            <div class="content-header-left col-md-9 col-12 mb-2">
                <div class="row breadcrumbs-top">
                    <div class="col-12">
                        <h2 class="content-header-title float-start mb-0">Kajian Islami</h2>
                        <div class="breadcrumb-wrapper">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Home</a>
                                </li>
                                <li class="breadcrumb-item active">Daftar Kajian
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
                            aria-haspopup="true" aria-expanded="false" data-bs-toggle="modal"
                            data-bs-target="#tambahkajian"><i data-feather="plus"></i></button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Tambah Kajian -->
        @include ("dashboard.kajian-islami.modal-tambah")
        <div class="content-body">
            @if (session('info'))
            <div class="alert alert-success p-3" role="alert">
                <i data-feather="notif"></i>
                <strong>Info! </strong> {{ session('info') }}
            </div>
            @endif
            <!-- Card Actions Section -->
            <section id="card-actions">
                <!-- Info table about actions -->
                <div class="row">

                    @foreach ($kajian as $item)
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">{{ $item->tempat }}</h4>
                                <div class="heading-elements">
                                    <ul class="list-inline mb-0">
                                        {{-- <li> --}}
                                        {{--     <a href="{{ route('kajian-islami-tambah-rute', [$item->id]) }}"><i data-feather="map"></i></a> --}}
                                        {{-- </li> --}}
                                        <li>
                                            <a data-bs-toggle="modal" data-bs-target="#editkajian-{{ $item->id }}"><i data-feather="edit"></i></a>
                                        </li>
                                        <li>
                                            <a href="/dashboard/kajian-islami/{{ $item->id }}/destroy"
                                                onclick="return confirm('Yakin ingin menghapus kajian tersebut?')"><i
                                                    data-feather="delete"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Modal Edit Kajian -->
                            {{ $item->view_modal_edit() }}
                            <div class="card-content collapse show">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="table-responsive">
                                                <table class="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Deskripsi</th>
                                                            <th>Detail</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Judul</td>
                                                            <td>{{ $item->judul }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Waktu</td>
                                                            <td>{{ $item->waktu }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tempat</td>
                                                            <td>{{ $item->tempat }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Pemateri</td>
                                                            <td>{{ $item->pemateri }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jumlah Rute</td>
                                                            <td>{{ $item->rute->count() }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
                <!--/ Info table about actions -->
            </section>
            <!--/ Card Actions Section -->

        </div>
    </div>
</div>
<!-- END: Content-->

@include('dashboard.master.footer')

<script>
    var marker_pilih_lokasi;
    var MAPID;
    function getlokasi(mapid) {
        MAPID = mapid;
        //jika browser mendukung navigator.geolocation maka akan menjalankan perintah di bawahnya
        if (navigator.geolocation) {
            // getCurrentPosition digunakan untuk mendapatkan lokasi pengguna
            //showPosition adalah fungsi yang akan dijalankan
            navigator.geolocation.getCurrentPosition(showPosition);
        }

    }

    function showPosition(position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var accuracy = position.coords.accuracy;


        var capa = document.getElementById("capa");
        capa.innerHTML = "Akurasi : " + accuracy;

        var mymap = L.map(MAPID).setView(
            [position.coords.latitude, position.coords.longitude],
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

        var popup = L.popup();

        // buat fungsi popup saat map diklik
        function onMapClick(e) {
            /*
            popup
                .setLatLng(e.latlng)
                .setContent("koordinatnya adalah " + e
                    .latlng
                ) //set isi konten yang ingin ditampilkan, kali ini kita akan menampilkan latitude dan longitude
                .openOn(mymap);
            */
            if (marker_pilih_lokasi) {
                mymap.removeLayer(marker_pilih_lokasi);
            }
            marker_pilih_lokasi = new L.marker(e.latlng);
            mymap.addLayer(marker_pilih_lokasi);
            //value pada form latitde, longitude akan berganti secara otomatis
            document.getElementById('latlong').value = e.latlng

        }
        mymap.on('click', onMapClick); //jalankan fungsi

    }

</script>
