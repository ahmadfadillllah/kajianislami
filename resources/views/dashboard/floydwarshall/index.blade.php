@include('dashboard.master.head')
@include('dashboard.master.header')
@include('dashboard.master.main')

<link rel="stylesheet" href="{{ asset('css/leaflet.extra-markers.min.css') }}">

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
                                <li class="breadcrumb-item active"><a href="">Floyd Warshall</a>
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
                                                                           href="app-email.html"><i class="me-1"
                                                                                                    data-feather="mail"></i><span
                                    class="align-middle">Email</span></a><a class="dropdown-item"
                                                                            href="app-calendar.html"><i class="me-1"
                                                                                                        data-feather="calendar"></i><span
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
                                <div class="row">
                                    <div class="col-md-9">
                                        <div id='mapid' style='min-height: 500px;'>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <code id="performa" style="padding: 10px"></code>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <p id="capa"></p>
                                <button id="show_mosque_all" class="btn btn-primary me-1">Tampilkan Kajian
                                    Islami
                                </button>
                                <button onclick="showMosque('close-in')" class="btn btn-primary me-1">Tampilkan Kajian
                                    Terdekat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {{-- <div class="row"> --}}
                {{--     <div class="col-md"> --}}
                {{--         <div class="card"> --}}
                {{--             <div class="card-header"> --}}
                {{--                 <h4 class="card-title">Detail Algoritma</h4> --}}
                {{--             </div> --}}
                {{--             <div class="card-body"> --}}
                {{--                 <form class="form form-vertical" action="{{route('floydwarshall.store')}}" --}}
                {{--                       method="POST"> --}}
                {{--                     @csrf --}}
                {{--                     <div class="row"> --}}
                {{--                         <div class="col-12"> --}}
                {{--                             <div class="mb-1"> --}}
                {{--                                 <input type="hidden" name="id_masjid" id="id_mosque"> --}}
                {{--                                 <label class="form-label" for="first-name-icon">Nama Masjid yg --}}
                {{--                                     dituju</label> --}}
                {{--                                 <div class="input-group input-group-merge"> --}}
                {{--                                     <input type="text" class="form-control" id="mosque_dest" --}}
                {{--                                            name="namamasjid" --}}
                {{--                                            placeholder="Silahkan memasukkan titik lokasi dengan mengklik map dibawah" --}}
                {{--                                            readonly/> --}}
                {{--                                 </div> --}}
                {{--                             </div> --}}
                {{--                         </div> --}}
                {{--                         <div class="col-12"> --}}
                {{--                             <div class="mb-1"> --}}
                {{--                                 <label class="form-label" for="email-id-icon">Rute yang dilewati</label> --}}
                {{--                                 <div class="input-group input-group-merge"> --}}
                {{--                                     <input type="text" class="form-control" --}}
                {{--                                            name="rute" readonly/> --}}
                {{--                                 </div> --}}
                {{--                             </div> --}}
                {{--                         </div> --}}
                {{--                         <div class="col-12"> --}}
                {{--                             <div class="mb-1"> --}}
                {{--                                 <label class="form-label" for="contact-info-icon">Jarak Tempuh</label> --}}
                {{--                                 <div class="input-group input-group-merge"> --}}
                {{--                                     <input type="number" id="contact-info-icon" class="form-control" --}}
                {{--                                            name="jaraktempuh" placeholder="Mobile"/> --}}
                {{--                                 </div> --}}
                {{--                             </div> --}}
                {{--                         </div> --}}
                {{--                         <div class="col-12"> --}}
                {{--                             <div class="mb-1"> --}}
                {{--                                 <div class="form-check"> --}}
                {{--                                     <input type="checkbox" class="form-check-input" id="customCheck4"/> --}}
                {{--                                     <label class="form-check-label" for="customCheck4">Sudah baca --}}
                {{--                                         kebijakan</label> --}}
                {{--                                 </div> --}}
                {{--                             </div> --}}
                {{--                         </div> --}}

                {{--                         <div class="col-12"> --}}
                {{--                             <button type="submit" class="btn btn-primary me-1">Simpan</button> --}}
                {{--                             <button type="reset" class="btn btn-outline-secondary">Reset</button> --}}
                {{--                         </div> --}}

                {{--                     </div> --}}
                {{--                 </form> --}}
                {{--             </div> --}}
                {{--         </div> --}}
                {{--     </div> --}}
                {{-- </div> --}}

            </section>
            <!-- Basic Vertical form layout section end -->

        </div>
    </div>
</div>
{{-- <style> --}}
{{--     .leaflet-top.leaflet-right { --}}
{{--         display: none; --}}
{{--     } --}}
{{--     #hasil_rute { --}}
{{--         display: block; --}}
{{--     } --}}
{{-- </style> --}}
<!-- END: Content-->

@include('dashboard.master.footer')
<script src="https://code.jquery.com/jquery-3.6.0.slim.js"
        integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
<script src="{{ asset('axios.min.js') }}"></script>
<script src="{{ asset('js/leaflet.extra-markers.min.js') }}"></script>
<script src="{{ asset('js/helpers.js') }}"></script>
<script src="{{ asset('js/floyd_warshall.js') }}"></script>
