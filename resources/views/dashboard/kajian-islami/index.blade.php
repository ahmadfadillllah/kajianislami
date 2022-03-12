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
        <div class="modal fade" id="tambahkajian" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Tambah Kajian Islami</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="{{ route('kajianislami.store') }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Nama Masjid <span
                                        style="color: red">*</span></label>
                                <input type="text" class="form-control" name="namamasjid" required>
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Alamat <span
                                        style="color: red">*</span></label>
                                <textarea class="form-control" name="alamat" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Nama Pengurus Masjid <span
                                        style="color: red">*</span></label>
                                <input type="text" class="form-control" name="namapengurusmasjid" required>
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">No. Handphone Pengurus Masjid <span
                                        style="color: red">*</span></label>
                                <input type="text" class="form-control" name="no_hp" required>
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Jenis Kajian <span
                                        style="color: red">*</span></label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="jeniskajian">
                                    <label class="form-check-label">Umum (Terbuka untuk siapapun)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="jeniskajian" checked>
                                    <label class="form-check-label">Khusus (Hanya pengurus / orang tertentu yang dapat
                                        mengikuti)
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Materi Kajian dan Waktu Kajian <span
                                        style="color: red">*</span></label>
                                <textarea class="form-control" name="materidanwaktukajian" placeholder="Contoh :
                                Ceramah Harian (08.00 - 09.00 WITA),
                                Pengkajian Alquran (20.00 - 21.00),
                                Pengkajian Alhadist (10.00 - 10.30 WITA) " required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Gambar Masjid <span
                                        style="color: red">*</span></label>
                                <input type="file" class="form-control" name="gambar" required>
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Titik Koordinat <span
                                        style="color: red">*</span></label>
                                <input type="text" class="form-control" id="latlong" name="latlong"
                                    placeholder="Klik Maps dibawah" required readonly>
                            </div>
                            <div class="mb-3">
                                <a onclick="getlokasi()" class="btn btn-secondary me-1">Tampilkan Lokasi</a>
                                <p id="capa"></p>
                            </div>
                            <div class="mb-3">
                                <div id='mapid' style='min-height: 300px;'>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
        <div class="content-body">
            @if (session('info'))
            <div class="alert alert-secondary" role="alert">
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
                                <h4 class="card-title">{{ $item->namamasjid }}</h4>
                                <div class="heading-elements">
                                    <ul class="list-inline mb-0">
                                        <li>
                                            <a data-bs-toggle="modal" data-bs-target="#editkajian"><i data-feather="edit"></i></a>
                                        </li>
                                        <li>
                                            <a href="/dashboard/kajian-islami/{{ $item->id }}/destroy"
                                                onclick="return confirm('Yakin ingin menghapus kajian tersebut?')"><i
                                                    data-feather="x"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Modal Edit Kajian -->
                            <div class="modal fade" id="editkajian" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Tambah Kajian Islami</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form action="/dashboard/kajian-islami/{{ $item->id }}/update" method="POST"
                                                enctype="multipart/form-data">
                                                @csrf
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">Nama Masjid <span
                                                            style="color: red">*</span></label>
                                                    <input type="text" class="form-control" name="namamasjid"
                                                        value="{{ $item->namamasjid }}" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="message-text" class="col-form-label">Alamat <span
                                                            style="color: red">*</span></label>
                                                    <input class="form-control" name="alamat"
                                                        value="{{ $item->alamat }}" required></input>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">Nama Pengurus
                                                        Masjid <span style="color: red">*</span></label>
                                                    <input type="text" class="form-control" name="namapengurusmasjid"
                                                        value="{{ $item->namapengurusmasjid }}" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">No. Handphone
                                                        Pengurus Masjid <span style="color: red">*</span></label>
                                                    <input type="text" class="form-control" name="no_hp"
                                                        value="{{ $item->no_hp }}" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="message-text" class="col-form-label">Jenis Kajian <span
                                                            style="color: red">*</span></label>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="jeniskajian">
                                                        <label class="form-check-label">Umum (Terbuka untuk siapapun)
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="jeniskajian"
                                                            checked>
                                                        <label class="form-check-label">Khusus (Hanya pengurus / orang
                                                            tertentu yang dapat
                                                            mengikuti)
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="message-text" class="col-form-label">Materi Kajian dan
                                                        Waktu Kajian <span style="color: red">*</span></label>
                                                    <input class="form-control" name="materidanwaktukajian"
                                                        value="{{ $item->materidanwaktukajian }}" placeholder="Contoh :
                                Ceramah Harian (08.00 - 09.00 WITA),
                                Pengkajian Alquran (20.00 - 21.00),
                                Pengkajian Alhadist (10.00 - 10.30 WITA) " required></input>
                                                </div>

                                                <div class="mb-3">
                                                    <img src="{{ asset('gambar') }}/{{ $item->gambar }}"
                                                        alt="Gambar tidak terbaca" style="width: 100px"><br>
                                                    <label for="recipient-name" class="col-form-label">Gambar Masjid
                                                        <span style="color: red">*</span></label>
                                                    <input type="file" class="form-control" name="gambar" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">Titik Koordinat
                                                        <span style="color: red">*</span></label>
                                                    <input type="text" class="form-control" id="latlong" name="latlong"
                                                        placeholder="{{ $item->latlong }}" required readonly>
                                                </div>
                                                <div class="mb-3">
                                                    <a onclick="getlokasi()" class="btn btn-secondary me-1">Tampilkan
                                                        Lokasi</a>
                                                    <p id="capa"></p>
                                                </div>
                                                <div class="mb-3">
                                                    <div id='mapid' style='min-height: 300px;'>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                                            <td>Nama Pengurus Masjid</td>
                                                            <td>{{ $item->namapengurusmasjid }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>No. Handphone yang bisa dihubungi</td>
                                                            <td>{{ $item->no_hp }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Alamat</td>
                                                            <td>{{ $item->alamat }}</td>
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
    function getlokasi() {
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

        var mymap = L.map("mapid").setView(
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
            popup
                .setLatLng(e.latlng)
                .setContent("koordinatnya adalah " + e
                    .latlng
                ) //set isi konten yang ingin ditampilkan, kali ini kita akan menampilkan latitude dan longitude
                .openOn(mymap);
            //value pada form latitde, longitude akan berganti secara otomatis
            document.getElementById('latlong').value = e.latlng

        }
        mymap.on('click', onMapClick); //jalankan fungsi

    }

</script>
