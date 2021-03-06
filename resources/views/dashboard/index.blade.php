@include('dashboard.master.head')
@include('dashboard.master.header')
@include('dashboard.master.main')
<!-- BEGIN: Content-->
<div class="app-content content ">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper container-xxl p-0">
        <div class="content-header row">
        </div>
        <div class="content-body">
            <!-- Dashboard Analytics Start -->
            <section id="dashboard-analytics">
                <div class="row match-height">
                    <!-- Greetings Card starts -->
                    {{-- <div class="col-lg-6 col-md-12 col-sm-12"> --}}
                    {{--     <div class="card card-congratulations"> --}}
                    {{--         <div class="card-body text-center"> --}}
                    {{--             <img src="{{ asset('vuexy') }}/app-assets/images/elements/decore-left.png" --}}
                    {{--                 class="congratulations-img-left" alt="card-img-left" /> --}}
                    {{--             <img src="{{ asset('vuexy') }}/app-assets/images/elements/decore-right.png" --}}
                    {{--                 class="congratulations-img-right" alt="card-img-right" /> --}}
                    {{--             <div class="avatar avatar-xl bg-primary shadow"> --}}
                    {{--                 <div class="avatar-content"> --}}
                    {{--                     <i data-feather="award" class="font-large-1"></i> --}}
                    {{--                 </div> --}}
                    {{--             </div> --}}
                    {{--             <div class="text-center"> --}}
                    {{--                 <h1 class="mb-1 text-white">Congratulations John,</h1> --}}
                    {{--                 <p class="card-text m-auto w-75"> --}}
                    {{--                     You have done <strong>57.6%</strong> more sales today. Check your new badge in --}}
                    {{--                     your profile. --}}
                    {{--                 </p> --}}
                    {{--             </div> --}}
                    {{--         </div> --}}
                    {{--     </div> --}}
                    {{-- </div> --}}
                    <!-- Greetings Card ends -->

                    <!-- Subscribers Chart Card starts -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-header flex-column align-items-start pb-0">
                                <div class="avatar bg-light-primary p-50 m-0">
                                    <div class="avatar-content">
                                        <i data-feather="users" class="font-medium-5"></i>
                                    </div>
                                </div>
                                <h2 class="fw-bolder mt-1">{{ App\Models\User::count() }}</h2>
                                <p class="card-text">Total User</p>
                            </div>
                            <div id="gained-chart"></div>
                        </div>
                    </div>
                    <!-- Subscribers Chart Card ends -->

                    <!-- Orders Chart Card starts -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-header flex-column align-items-start pb-0">
                                <div class="avatar bg-light-warning p-50 m-0">
                                    <div class="avatar-content">
                                        <i data-feather="package" class="font-medium-5"></i>
                                    </div>
                                </div>
                                <h2 class="fw-bolder mt-1">{{ App\Models\KajianIslami::count() }}</h2>
                                <p class="card-text">Total Kajian</p>
                            </div>
                            <div id="order-chart"></div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-header flex-column align-items-start pb-0">
                                <div class="avatar bg-light-warning p-50 m-0">
                                    <div class="avatar-content">
                                        <i data-feather="package" class="font-medium-5"></i>
                                    </div>
                                </div>
                                <h2 class="fw-bolder mt-1">{{ App\Models\RuteKajian::count() }}</h2>
                                <p class="card-text">Total Rute Kajian</p>
                            </div>
                            <div id="statistics-order-chart"></div>
                        </div>
                    </div>
                    <!-- Orders Chart Card ends -->
                </div>
            </section>
            <!-- Dashboard Analytics end -->

        </div>
    </div>
</div>
<!-- END: Content-->
<!-- BEGIN: Footer-->
@include('dashboard.master.footer')
<!-- END: Footer-->
