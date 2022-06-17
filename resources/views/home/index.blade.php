@include('master.top')
<!-- back to top end -->

<!-- header area start -->
@include('master.header')
<!-- header area end -->

<!-- sidebar area start -->
@include('master.sidebar')

<main>
    <!-- hero area start -->
    <section class="hero__area hero__height p-relative d-flex align-items-center"
             data-background="{{ asset('wetland') }}/assets/img/hero/home-1/hero-bg.jpg">
        <div class="hero__shape">
            <img class="hero-circle-1" src="{{ asset('wetland') }}/assets/img/icon/hero/home-1/circle-1.png" alt="">
            <img class="hero-circle-2" src="{{ asset('wetland') }}/assets/img/icon/hero/home-1/circle-2.png" alt="">
            <img class="hero-triangle-1" src="{{ asset('wetland') }}/assets/img/icon/hero/home-1/triangle-1.png" alt="">
            <img class="hero-triangle-2" src="{{ asset('wetland') }}/assets/img/icon/hero/home-1/triangle-2.png" alt="">
        </div>
        <div class="container">
            <div class="row align-items-center">
                <div class="col-xxl-7 col-xl-6 col-lg-6">
                    <div class="hero__content pr-80">
                        <h2 class="hero__title wow fadeInUp" data-wow-delay=".3s">{{ env('APP_NAME') }}</h2>
                        <p class="wow fadeInUp" data-wow-delay=".5s">Aplikasi penentuan lokasi kajian islami di Kota
                            Makassar dengan lintasan terpendek.</p>
                        {{--                        <div class="hero__search wow fadeInUp" data-wow-delay=".7s">--}}
                        {{--                           <form action="#">--}}
                        {{--                              <input type="email" placeholder="Enter your email..">--}}
                        {{--                              <button type="submit" class="w-btn w-btn-2">search</button>--}}
                        {{--                           </form>--}}
                        {{--                           <div class="hero__search-info">--}}
                        {{--                              <span> <i class="fal fa-check"></i> No software to install</span>--}}
                        {{--                              <span> <i class="fal fa-check"></i> Up to date</span>--}}
                        {{--                           </div>--}}
                        {{--                        </div>--}}
                    </div>
                </div>
                <div class="col-xxl-5 col-xl-6 col-lg-6">
                    <div class="hero__thumb text-end ml-220">
                        <div class="hero__thumb-wrapper p-relative ">
                            <img class="hero-circle" src="{{ asset('wetland') }}/assets/img/hero/home-1/hero-circle.png"
                                 alt="">

                            <div class="hero__thumb-shape shape-1">
                                <img src="{{ asset('wetland') }}/assets/img/hero/home-1/hero-1.png" alt="">
                            </div>
                            <div class="hero__thumb-shape shape-2">
                                <img src="{{ asset('wetland') }}/assets/img/hero/home-1/hero-2.png" alt="">
                            </div>
                            <div class="hero__thumb-shape shape-3">
                                <img src="{{ asset('wetland') }}/assets/img/hero/home-1/hero-3.png" alt="">
                            </div>
                            <div class="hero__thumb-shape shape-4">
                                <img src="{{ asset('wetland') }}/assets/img/hero/home-1/hero-4.png" alt="">
                            </div>
                            <div class="hero__thumb-shape shape-5">
                                <img src="{{ asset('wetland') }}/assets/img/hero/home-1/hero-5.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- hero area end -->

    <!-- services area start -->
{{--    <section class="services__area p-relative pt-150 pb-130">--}}
{{--        <div class="services__shape">--}}
{{--            <img class="services-circle-1" src="{{ asset('wetland') }}/assets/img/icon/services/home-1/circle-1.png"--}}
{{--                 alt="">--}}
{{--            <img class="services-circle-2" src="{{ asset('wetland') }}/assets/img/icon/services/home-1/circle-2.png"--}}
{{--                 alt="">--}}
{{--            <img class="services-dot" src="{{ asset('wetland') }}/assets/img/icon/services/home-1/dot.png" alt="">--}}
{{--            <img class="services-triangle" src="{{ asset('wetland') }}/assets/img/icon/services/home-1/triangle.png"--}}
{{--                 alt="">--}}
{{--        </div>--}}
{{--        <div class="container">--}}
{{--            <div class="row">--}}
{{--                <div class="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-6 col-md-10 offset-md-1 p-0">--}}
{{--                    <div class="section__title-wrapper text-center mb-75 wow fadeInUp" data-wow-delay=".3s">--}}
{{--                        <h2 class="section__title">Get Answers, Insights Result in Simple Steps.</h2>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <div class="row">--}}
{{--                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">--}}
{{--                    <div class="services__inner hover__active mb-30 wow fadeInUp" data-wow-delay=".3s">--}}
{{--                        <div class="services__item white-bg text-center transition-3 ">--}}
{{--                            <div class="services__icon mb-25 d-flex align-items-end justify-content-center">--}}
{{--                                <img src="{{ asset('wetland') }}/assets/img/icon/services/home-1/services-1.png" alt="">--}}
{{--                            </div>--}}
{{--                            <div class="services__content">--}}
{{--                                <h3 class="services__title"><a href="services-details.html">Development</a></h3>--}}
{{--                                <p>Absolutely bladdered he blimey guvnor.</p>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">--}}
{{--                    <div class="services__inner hover__active active mb-30 wow fadeInUp" data-wow-delay=".5s">--}}
{{--                        <div class="services__item white-bg mb-30 text-center transition-3">--}}
{{--                            <div class="services__icon mb-25 d-flex align-items-end justify-content-center">--}}
{{--                                <img src="{{ asset('wetland') }}/assets/img/icon/services/home-1/services-2.png" alt="">--}}
{{--                            </div>--}}
{{--                            <div class="services__content">--}}
{{--                                <h3 class="services__title"><a href="services-details.html">OptimalSort</a></h3>--}}
{{--                                <p>Absolutely bladdered he blimey guvnor.</p>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">--}}
{{--                    <div class="services__inner hover__active mb-30 wow fadeInUp" data-wow-delay=".7s">--}}
{{--                        <div class="services__item white-bg text-center transition-3">--}}
{{--                            <div class="services__icon mb-25 d-flex align-items-end justify-content-center">--}}
{{--                                <img src="{{ asset('wetland') }}/assets/img/icon/services/home-1/services-3.png" alt="">--}}
{{--                            </div>--}}
{{--                            <div class="services__content">--}}
{{--                                <h3 class="services__title"><a href="services-details.html">Influencing</a></h3>--}}
{{--                                <p>Absolutely bladdered he blimey guvnor.</p>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">--}}
{{--                    <div class="services__inner hover__active mb-30 wow fadeInUp" data-wow-delay=".9s">--}}
{{--                        <div class="services__item white-bg text-center transition-3"--}}
{{--                        ">--}}
{{--                        <div class="services__icon mb-25 d-flex align-items-end justify-content-center">--}}
{{--                            <img src="{{ asset('wetland') }}/assets/img/icon/services/home-1/services-4.png" alt="">--}}
{{--                        </div>--}}
{{--                        <div class="services__content">--}}
{{--                            <h3 class="services__title"><a href="services-details.html">Technology</a></h3>--}}
{{--                            <p>Absolutely bladdered he blimey guvnor.</p>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--        </div>--}}
{{--    </section>--}}
    <!-- services area end -->

    <!-- about area start -->
{{--    <section class="about__area pb-120 p-relative">--}}
{{--        <div class="about__shape">--}}
{{--            <img class="about-triangle" src="{{ asset('wetland') }}/assets/img/icon/about/home-1/triangle.png" alt="">--}}
{{--            <img class="about-circle" src="{{ asset('wetland') }}/assets/img/icon/about/home-1/circle.png" alt="">--}}
{{--            <img class="about-circle-2" src="{{ asset('wetland') }}/assets/img/icon/about/home-1/circle-2.png" alt="">--}}
{{--            <img class="about-circle-3" src="{{ asset('wetland') }}/assets/img/icon/about/home-1/circle-3.png" alt="">--}}
{{--        </div>--}}
{{--        <div class="container">--}}
{{--            <div class="row align-items-center">--}}
{{--                <div class="col-xxl-5 col-xl-6 col-lg-6 col-md-9">--}}
{{--                    <div class="about__wrapper mb-10">--}}
{{--                        <div class="section__title-wrapper mb-25">--}}
{{--                            <h2 class="section__title">Get the Perfect Solution for Your Web.</h2>--}}
{{--                            <p>Starkers pardon you knees up is Elizabeth geeza Why, quain standard guvnor gosh cras--}}
{{--                                brilliant.</p>--}}
{{--                        </div>--}}
{{--                        <ul>--}}
{{--                            <li>Intergate With Popular Softwares item</li>--}}
{{--                            <li>Instantly Create Your Crowdfunding Platform</li>--}}
{{--                        </ul>--}}
{{--                        <a href="contact.html" class="w-btn w-btn-3 w-btn-1">Get Started</a>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-6 offset-xxl-1 col-xl-6 col-lg-6 col-md-10 order-first order-lg-last">--}}
{{--                    <div class="about__thumb-wrapper p-relative ml-40 fix text-end">--}}
{{--                        <img src="{{ asset('wetland') }}/assets/img/about/home-1/about-bg.png" alt="">--}}
{{--                        <div class="about__thumb p-absolute">--}}
{{--                            <img class="bounceInUp wow about-big" data-wow-delay=".3s"--}}
{{--                                 src="{{ asset('wetland') }}/assets/img/about/home-1/about-1.png" alt="">--}}
{{--                            <img class="about-sm" src="{{ asset('wetland') }}/assets/img/about/home-1/about-1-1.png"--}}
{{--                                 alt="">--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </section>--}}
    <!-- about area end -->

    <!-- about area start -->
{{--    <section class="about__area pb-160 pt-80 p-relative">--}}
{{--        <div class="about__shape">--}}
{{--            <img class="about-plus" src="{{ asset('wetland') }}/assets/img/icon/about/home-1/plus.png" alt="">--}}
{{--            <img class="about-triangle-2" src="{{ asset('wetland') }}/assets/img/icon/about/home-1/triangle-2.png"--}}
{{--                 alt="">--}}
{{--            <img class="about-circle-4" src="{{ asset('wetland') }}/assets/img/icon/about/home-1/circle-4.png" alt="">--}}
{{--            <img class="about-circle-5" src="{{ asset('wetland') }}/assets/img/icon/about/home-1/circle-5.png" alt="">--}}
{{--        </div>--}}
{{--        <div class="container">--}}
{{--            <div class="row align-items-center">--}}
{{--                <div class="col-xxl-6 col-xl-6 col-lg-6">--}}
{{--                    <div class="about__thumb-wrapper p-relative ml--30 fix mr-70">--}}
{{--                        <img src="{{ asset('wetland') }}/assets/img/about/home-1/about-bg-2.png" alt="">--}}
{{--                        <div class="about__thumb about__thumb-2 p-absolute wow fadeInUp" data-wow-delay=".3s">--}}
{{--                            <img class="about-big bounceInUp wow" data-wow-delay=".5s"--}}
{{--                                 src="{{ asset('wetland') }}/assets/img/about/home-1/about-2.png" alt="">--}}
{{--                            <img class="about-sm about-sm-2"--}}
{{--                                 src="{{ asset('wetland') }}/assets/img/about/home-1/about-2-1.png" alt="">--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-9">--}}
{{--                    <div class="about__wrapper about__wrapper-2 ml-60 mb-30">--}}
{{--                        <div class="section__title-wrapper mb-25">--}}
{{--                            <h2 class="section__title">Awesome Prototyping Tool for UI/UX.</h2>--}}
{{--                            <p>Starkers pardon you knees up is Elizabeth geeza Why, quain standard guvnor gosh cras--}}
{{--                                brilliant.</p>--}}
{{--                        </div>--}}
{{--                        <ul>--}}
{{--                            <li>Intergate With Popular Softwares item</li>--}}
{{--                            <li>Instantly Create Your Crowdfunding Platform</li>--}}
{{--                        </ul>--}}
{{--                        <a href="contact.html" class="w-btn w-btn-3 w-btn-1">Get Started</a>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </section>--}}
    <!-- about area end -->

    <!-- pricing area start -->
{{--    <section class="price__area grey-bg pt-105 pb-90">--}}
{{--        <div class="container">--}}
{{--            <div class="row">--}}
{{--                <div class="col-xxl-7 col-xl-7 col-lg-8">--}}
{{--                    <div class="section__title-wrapper mb-65 wow fadeInUp" data-wow-delay=".3s">--}}
{{--                        <h2 class="section__title">Software is Easy Prototyping about on the web.</h2>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <div class="row">--}}
{{--                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6">--}}
{{--                    <div class="price__item white-bg mb-30 transition-3 fix wow fadeInUp" data-wow-delay=".3s">--}}
{{--                        <div class="price__offer mb-15">--}}
{{--                            <span>Free</span>--}}
{{--                        </div>--}}
{{--                        <div class="price__tag mb-15">--}}
{{--                            <h3>$00</h3>--}}
{{--                        </div>--}}
{{--                        <div class="price__text mb-25">--}}
{{--                            <p>Start for free pick a plan later,You can cancel any time.</p>--}}
{{--                        </div>--}}
{{--                        <div class="price__features mb-40">--}}
{{--                            <ul>--}}
{{--                                <li>1GB Cloud Storage</li>--}}
{{--                                <li>Share on Cloud</li>--}}
{{--                                <li>Private & Team Folders</li>--}}
{{--                            </ul>--}}
{{--                        </div>--}}
{{--                        <a href="contact.html" class="w-btn w-btn-4 w-100 price__btn">Try for free</a>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6">--}}
{{--                    <div class="price__item hover__active active white-bg mb-30 transition-3 fix wow fadeInUp"--}}
{{--                         data-wow-delay=".5s">--}}
{{--                        <div class="price__offer mb-15">--}}
{{--                            <span>Basic</span>--}}
{{--                        </div>--}}
{{--                        <div class="price__tag mb-15">--}}
{{--                            <h3>$495<span>Monthly</span></h3>--}}
{{--                        </div>--}}
{{--                        <div class="price__text mb-25">--}}
{{--                            <p>Start for free pick a plan later,You can cancel any time.</p>--}}
{{--                        </div>--}}
{{--                        <div class="price__features mb-40">--}}
{{--                            <ul>--}}
{{--                                <li>Private & Team Folders</li>--}}
{{--                                <li>Comments</li>--}}
{{--                                <li>Embed Share Link</li>--}}
{{--                                <li>Print to PDF</li>--}}
{{--                            </ul>--}}
{{--                        </div>--}}
{{--                        <a href="contact.html" class="w-btn w-btn-4 w-100 price__btn">Try for free</a>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6">--}}
{{--                    <div class="price__item white-bg mb-30 transition-3 fix wow fadeInUp" data-wow-delay=".6s">--}}
{{--                        <div class="price__offer mb-15">--}}
{{--                            <span>Enterprise</span>--}}
{{--                        </div>--}}
{{--                        <div class="price__tag mb-15">--}}
{{--                            <h3>$837<span>Yearly</span></h3>--}}
{{--                        </div>--}}
{{--                        <div class="price__text mb-25">--}}
{{--                            <p>Start for free pick a plan later,You can cancel any time.</p>--}}
{{--                        </div>--}}
{{--                        <div class="price__features mb-40">--}}
{{--                            <ul>--}}
{{--                                <li>Private & Team Folders</li>--}}
{{--                                <li>Comments</li>--}}
{{--                                <li>Embed Share Link</li>--}}
{{--                                <li>Print to PDF</li>--}}
{{--                                <li>Export to PNG</li>--}}
{{--                            </ul>--}}
{{--                        </div>--}}
{{--                        <a href="contact.html" class="w-btn w-btn-4 w-100 price__btn">Try for free</a>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </section>--}}
    <!-- pricing area end -->

    <!-- testimonial area start -->
{{--    <section class="testimonial__area pt-150 pb-70 p-relative overflow-y-visible">--}}
{{--        <div class="circle-animation testimonial">--}}
{{--            <span></span>--}}
{{--        </div>--}}
{{--        <div class="testimonial__shape">--}}
{{--            <img class="testimonial-circle-1"--}}
{{--                 src="{{ asset('wetland') }}/assets/img/icon/testimonial/home-1/circle-1.png" alt="">--}}
{{--            <img class="testimonial-circle-2"--}}
{{--                 src="{{ asset('wetland') }}/assets/img/icon/testimonial/home-1/circle-2.png" alt="">--}}
{{--        </div>--}}
{{--        <div class="container">--}}
{{--            <div class="row">--}}
{{--                <div class="col-xxl-6 offset-xxl-3 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2">--}}
{{--                    <div class="section__title-wrapper text-center section-padding mb-65 wow fadeInUp"--}}
{{--                         data-wow-delay=".3s">--}}
{{--                        <h2 class="section__title">What People Say About Our Products.</h2>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <div class="row">--}}
{{--                <div class="col-xxl-12">--}}
{{--                    <div class="testimonial__slider owl-carousel wow fadeInUp" data-wow-delay=".5s">--}}
{{--                        <div class="testimonial__item white-bg transition-3 mb-110">--}}
{{--                            <div class="testimonial__thumb mb-25">--}}
{{--                                <img src="{{ asset('wetland') }}/assets/img/testimonial/home-1/testi-5.png" alt="">--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__text mb-25">--}}
{{--                                <p>‘’Cobblers posh cras victoria sponge some dodgy chaverat barney only a quid, boot--}}
{{--                                    bubble and squeak wind up bits and boes bleeding up the duff brolly. ’’ </p>--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__author">--}}
{{--                                <h3>Shinna</h3>--}}
{{--                                <span>Developer</span>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="testimonial__item white-bg transition-3 mb-110">--}}
{{--                            <div class="testimonial__thumb mb-25">--}}
{{--                                <img src="{{ asset('wetland') }}/assets/img/testimonial/home-1/testi-6.png" alt="">--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__text mb-25">--}}
{{--                                <p>‘’Cobblers posh cras victoria sponge some dodgy chaverat barney only a quid, boot--}}
{{--                                    bubble and squeak wind up bits and boes bleeding up the duff brolly. ’’ </p>--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__author">--}}
{{--                                <h3>Steve Smith</h3>--}}
{{--                                <span>Designer</span>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="testimonial__item white-bg transition-3 mb-110">--}}
{{--                            <div class="testimonial__thumb mb-25">--}}
{{--                                <img src="{{ asset('wetland') }}/assets/img/testimonial/home-1/testi-1.png" alt="">--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__text mb-25">--}}
{{--                                <p>‘’Cobblers posh cras victoria sponge some dodgy chaverat barney only a quid, boot--}}
{{--                                    bubble and squeak wind up bits and boes bleeding up the duff brolly. ’’ </p>--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__author">--}}
{{--                                <h3>Hilary Ouse</h3>--}}
{{--                                <span>Developer</span>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="testimonial__item white-bg transition-3 mb-110">--}}
{{--                            <div class="testimonial__thumb mb-25">--}}
{{--                                <img src="{{ asset('wetland') }}/assets/img/testimonial/home-1/testi-2.png" alt="">--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__text mb-25">--}}
{{--                                <p>‘’Cobblers posh cras victoria sponge some dodgy chaverat barney only a quid, boot--}}
{{--                                    bubble and squeak wind up bits and boes bleeding up the duff brolly. ’’ </p>--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__author">--}}
{{--                                <h3>Elon Gated</h3>--}}
{{--                                <span>Designer</span>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="testimonial__item white-bg transition-3 mb-110">--}}
{{--                            <div class="testimonial__thumb mb-25">--}}
{{--                                <img src="{{ asset('wetland') }}/assets/img/testimonial/home-1/testi-3.png" alt="">--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__text mb-25">--}}
{{--                                <p>‘’Cobblers posh cras victoria sponge some dodgy chaverat barney only a quid, boot--}}
{{--                                    bubble and squeak wind up bits and boes bleeding up the duff brolly. ’’ </p>--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__author">--}}
{{--                                <h3>Victor </h3>--}}
{{--                                <span>Developer</span>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="testimonial__item white-bg transition-3 mb-110">--}}
{{--                            <div class="testimonial__thumb mb-25">--}}
{{--                                <img src="{{ asset('wetland') }}/assets/img/testimonial/home-1/testi-4.png" alt="">--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__text mb-25">--}}
{{--                                <p>‘’Cobblers posh cras victoria sponge some dodgy chaverat barney only a quid, boot--}}
{{--                                    bubble and squeak wind up bits and boes bleeding up the duff brolly. ’’ </p>--}}
{{--                            </div>--}}
{{--                            <div class="testimonial__author">--}}
{{--                                <h3>Lily Gomz</h3>--}}
{{--                                <span>Developer</span>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </section>--}}
    <!-- testimonial area end -->

    <!-- features area start -->
{{--    <section class="features__area pt-60 pb-155 p-relative overflow-y-visible">--}}
{{--        <div class="circle-animation features">--}}
{{--            <span></span>--}}
{{--        </div>--}}
{{--        <div class="features__shape">--}}
{{--            <img class="features-circle-1" src="{{ asset('wetland') }}/assets/img/icon/features/home-1/circle-1.png"--}}
{{--                 alt="">--}}
{{--        </div>--}}
{{--        <div class="container">--}}
{{--            <div class="row">--}}
{{--                <div class="col-xxl-6 col-xl-6 col-lg-6">--}}
{{--                    <div class="section__title-wrapper mb-65 wow fadeInUp" data-wow-delay=".3s">--}}
{{--                        <h2 class="section__title">Software is Easy Prototyping Features.</h2>--}}
{{--                        <p>Over the last few years, podcasts have become a role in the online landscape.</p>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <div class="row">--}}
{{--                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">--}}
{{--                    <div class="features__item mb-30 wow fadeInUp" data-wow-delay=".3s">--}}
{{--                        <div class="features__icon mb-35">--}}
{{--                            <span class="gradient-pink"><i class="far fa-heart-rate"></i></span>--}}
{{--                        </div>--}}
{{--                        <h3 class="features__title">API management</h3>--}}
{{--                        <div class="features__list">--}}
{{--                            <ul>--}}
{{--                                <li>Secure Access</li>--}}
{{--                                <li>Connectivity</li>--}}
{{--                                <li>Engagement</li>--}}
{{--                                <li>Secure Access</li>--}}
{{--                            </ul>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">--}}
{{--                    <div class="features__item mb-30 wow fadeInUp pl-15" data-wow-delay=".5s">--}}
{{--                        <div class="features__icon mb-35">--}}
{{--                            <span class="gradient-blue"><i class="fal fa-chart-pie-alt"></i></span>--}}
{{--                        </div>--}}
{{--                        <h3 class="features__title">Scheduled Reports</h3>--}}
{{--                        <div class="features__list">--}}
{{--                            <ul>--}}
{{--                                <li>Publish anywhere</li>--}}
{{--                                <li>Influencer</li>--}}
{{--                                <li>Content Creation</li>--}}
{{--                                <li>Prepare your brand</li>--}}
{{--                            </ul>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">--}}
{{--                    <div class="features__item mb-30 wow fadeInUp pl-45" data-wow-delay=".7s">--}}
{{--                        <div class="features__icon mb-35">--}}
{{--                            <span class="gradient-yellow"><i class="fal fa-tag"></i></span>--}}
{{--                        </div>--}}
{{--                        <h3 class="features__title">Compliance Controls</h3>--}}
{{--                        <div class="features__list">--}}
{{--                            <ul>--}}
{{--                                <li>Animations</li>--}}
{{--                                <li>3D Viewer</li>--}}
{{--                                <li>Creation</li>--}}
{{--                                <li>Packaging Designer</li>--}}
{{--                            </ul>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 d-lg-flex justify-content-end">--}}
{{--                    <div class="features__item mb-30 wow fadeInUp" data-wow-delay=".9s">--}}
{{--                        <div class="features__icon mb-35">--}}
{{--                            <span class="gradient-purple"><i class="fal fa-layer-group"></i></span>--}}
{{--                        </div>--}}
{{--                        <h3 class="features__title">Authentication</h3>--}}
{{--                        <div class="features__list">--}}
{{--                            <ul>--}}
{{--                                <li>Print Templates</li>--}}
{{--                                <li>Mockups</li>--}}
{{--                                <li>Statement</li>--}}
{{--                                <li>Recruitment</li>--}}
{{--                            </ul>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <div class="row">--}}
{{--                <div class="col-xxl-12">--}}
{{--                    <div class="features__more text-center mt-50">--}}
{{--                        <a href="services.html" class="w-btn w-btn-6 w-btn-5">View all Features</a>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </section>--}}
    <!-- features area end -->

    <!-- cta area start -->
    {{--    <section class="cta__area mb--149 p-relative">--}}
    {{--        <div class="circle-animation cta-1">--}}
    {{--            <span></span>--}}
    {{--        </div>--}}
    {{--        <div class="circle-animation cta-1 cta-2">--}}
    {{--            <span></span>--}}
    {{--        </div>--}}
    {{--        <div class="circle-animation cta-3">--}}
    {{--            <span></span>--}}
    {{--        </div>--}}
    {{--        <div class="container">--}}
    {{--            <div class="cta__inner p-relative fix z-index-1 wow fadeInUp" data-wow-delay=".5s">--}}
    {{--                <div class="cta__shape">--}}
    {{--                    <img class="circle" src="{{ asset('wetland') }}/assets/img/cta/home-1/cta-circle.png" alt="">--}}
    {{--                    <img class="circle-2" src="{{ asset('wetland') }}/assets/img/cta/home-1/cta-circle-2.png" alt="">--}}
    {{--                    <img class="circle-3" src="{{ asset('wetland') }}/assets/img/cta/home-1/cta-circle-3.png" alt="">--}}
    {{--                    <img class="triangle-1" src="{{ asset('wetland') }}/assets/img/cta/home-1/cta-triangle.png" alt="">--}}
    {{--                    <img class="triangle-2" src="{{ asset('wetland') }}/assets/img/cta/home-1/cta-triangle-2.png"--}}
    {{--                         alt="">--}}
    {{--                </div>--}}
    {{--                  <div class="row">--}}
    {{--                     <div class="col-xxl-12">--}}
    {{--                        <div class="cta__wrapper d-lg-flex justify-content-between align-items-center">--}}
    {{--                           <div class="cta__content">--}}
    {{--                              <h3 class="cta__title">Make Your Own Website <br> Get Started with Theme Pure</h3>--}}
    {{--                           </div>--}}
    {{--                           <div class="cta__btn">--}}
    {{--                              <a href="contact.html" class="w-btn w-btn-white">Try for Free</a>--}}
    {{--                           </div>--}}
    {{--                        </div>--}}
    {{--                     </div>--}}
    {{--                  </div>--}}
    {{--            </div>--}}
    {{--        </div>--}}
    {{--    </section>--}}
    <!-- cta area end -->

</main>

<!-- footer area start -->
@include('master.footer')
<!-- footer area end -->

<!-- JS here -->
@include('master.bottom')

