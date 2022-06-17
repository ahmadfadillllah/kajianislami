@include('master.top')
<!-- back to top end -->

<!-- header area start -->
@include('master.header')
<!-- header area end -->

<!-- sidebar area start -->
@include('master.sidebar')

<main>
    <br><br><br><br>
    <section class="about__area pb-120 p-relative">
        <div class="about__shape">
            <img class="about-triangle" src="{{ url('wetland') }}/assets/img/icon/about/home-1/triangle.png" alt="">
            <img class="about-circle" src="{{ url('wetland') }}/assets/img/icon/about/home-1/circle.png" alt="">
            <img class="about-circle-2" src="{{ url('wetland') }}/assets/img/icon/about/home-1/circle-2.png" alt="">
            <img class="about-circle-3" src="{{ url('wetland') }}/assets/img/icon/about/home-1/circle-3.png" alt="">
        </div>
        <div class="container">
            <div class="row align-items-center">
                <div class="col-xxl-5 col-xl-6 col-lg-6 col-md-9">
                    <div class="about__wrapper mb-10">
                        <div class="section__title-wrapper mb-25">
                            <h2 class="section__title">{{ env('APP_NAME') }}</h2>
                            <p>Kajian Islami merupakan aplikasi gis untuk membantu ummat muslim mencari lokasi kajian dengan lintasan terpendek.</p>
                        </div>
                        <ul>
                            <li>Lintasan Terpendek</li>
                            <li>Jadwal Kajian</li>
                            <li>Lokasi Masjid</li>
                            <li>Kontak Pengurus Masjid</li>
                        </ul>
                        <a href="{{ url('register') }}" class="w-btn w-btn-3 w-btn-1">Daftar Sekarang</a>
                    </div>
                </div>
                <div class="col-xxl-6 offset-xxl-1 col-xl-6 col-lg-6 col-md-10 order-first order-lg-last">
                    <div class="about__thumb-wrapper p-relative ml-40 fix text-end">
                        <img src="https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80" alt="">
                        <div class="about__thumb p-absolute">
                            <img class="bounceInUp wow about-big" data-wow-delay=".3s"
                                 src="https://images.unsplash.com/photo-1574246604907-db69e30ddb97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=373&q=80" alt=""
                                 style="visibility: visible; animation-delay: 0.3s; animation-name: bounceInUp;">
{{--                            <img class="about-sm" height="100" src="https://images.unsplash.com/photo-1596193433486-02333accdc13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bXVzbGltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="">--}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<!-- footer area start -->
@include('master.footer')
<!-- footer area end -->

<!-- JS here -->
@include('master.bottom')


