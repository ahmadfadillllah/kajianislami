@include('dashboard.master.head')
@include('dashboard.master.header')
@include('dashboard.master.main')

<style>
    #mapid {
        height: 400px;
    }
</style>

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
                                <li class="breadcrumb-item">
                                    <a href="{{ route('kajianislami') }}">
                                        Daftar Kajian
                                    </a>
                                </li>
                                <li class="breadcrumb-item active"> Tambah Rute
                                </li>
                            </ol>
                        </div>
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
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">{{ $kajian_islami ? "Nama Masjid :: " . $kajian_islami->namamasjid : "Silahkan Pilih Lokasi Masjid Terlebiha Dahulu" }}</h4>
                            </div>
                            <div class="card-content collapse show">
                                <div class="card-body">
                                    <form method="post" action="{{ route('kajian-islami-tambah-rute-store') }}">
                                        <div class="row">
                                            {{ csrf_field() }}
                                            <div class="col-sm-9">
                                                <div class="mb-1">
                                                    <label class="col-form-label">Pilih Rute</label>
                                                    <div id="mapid"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="mb-1">
                                                    <label>Nama Masjid</label>
                                                    <select class="form-control" name="kajian_islami_id" id="kajian_islami_id"
                                                           >
                                                           <option value="{{ $kajian_islami ? $kajian_islami->id : '' }}"> -- {{ $kajian_islami ? $kajian_islami->namamasjid : '' }} -- </option>
                                                           @foreach ($kajian_islamis as $kajian_islami) 
                                                           <option value="{{ $kajian_islami->id }}">{{ $kajian_islami->namamasjid }}</option>
                                                           @endforeach
                                                    </select>
                                                </div>
                                                <div class="mb-1">
                                                    <label class="col-form-label">Keterangan</label>
                                                    <textarea name="keterangan" class="form-control"
                                                              placeholder="Keterangan"></textarea>
                                                </div>
                                                <textarea name="rute" id="rute" style="display: none"></textarea>
                                                <div class="mb-1">
                                                    <button type="submit" class="btn btn-primary">Simpan</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>


@include('dashboard.master.footer')
<script>
    const kajian_islami_id = $("#kajian_islami_id");
    kajian_islami_id.on("change", function () {
        const kajian_id = $(this).val();
        location.href = "{{ route('kajian-islami-tambah-rute') }}?kajian_islami_id=" + kajian_id;
    });
    const RUTE_TUJUAN = {
        data_kajian: JSON.parse(`<?= $kajian_islami ?>`),
        latLong: function () {
            let latlong = RUTE_TUJUAN.data_kajian.latlong.replace("LatLng(", "").replace(")", "").split(", ");
            return {
                latitude: parseFloat(latlong[0]),
                longitude: parseFloat(latlong[1])
            }
        }
    }
    console.log("data_kajian", RUTE_TUJUAN.data_kajian);

</script>

<script src="{{ asset('js/tambah_rute.js') }}"></script>
