    @include('master.top')
      <!-- back to top end -->

      <!-- header area start -->
    @include('master.header')
      <!-- header area end -->

      <!-- sidebar area start -->
    @include('master.sidebar')
      <!-- sidebar area end -->

      <main>


         <!-- sign up area start -->
         <section class="signup__area po-rel-z1 pt-100 pb-145">
            <div class="sign__shape">
               <img class="man-1" src="{{ asset('wetland') }}/assets/img/icon/sign/man-1.png" alt="">
               <img class="man-2" src="{{ asset('wetland') }}/assets/img/icon/sign/man-2.png" alt="">
               <img class="circle" src="{{ asset('wetland') }}/assets/img/icon/sign/circle.png" alt="">
               <img class="zigzag" src="{{ asset('wetland') }}/assets/img/icon/sign/zigzag.png" alt="">
               <img class="dot" src="{{ asset('wetland') }}/assets/img/icon/sign/dot.png" alt="">
               <img class="bg" src="{{ asset('wetland') }}/assets/img/icon/sign/sign-up.png" alt="">
            </div>
            <div class="container">

               <div class="row">
                  <div class="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
                     <div class="page__title-wrapper text-center mb-55">
                        <h2 class="page__title-2">Sign in</h2>
                        <p>Jika belum punya akun silahkan <b><a href="{{ route('register') }}">Daftar disini!</a></b></p>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                     <div class="sign__wrapper white-bg">
                        <div class="sign__form">
                            @if (session('info'))

                            <div class="alert alert-info alert-dismissible fade show" role="alert">
                              <strong>Upps!</strong> {{ session('info') }}
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>

                            @endif
                           <form action="{{ route('post-login') }}" method="POST">
                            @csrf
                              <div class="sign__input-wrapper mb-25">
                                 <h5>Email</h5>
                                 <div class="sign__input">
                                    <input type="email" name="email" placeholder="E-mail address">
                                    <i class="fal fa-envelope"></i>
                                 </div>
                              </div>
                              <div class="sign__input-wrapper mb-10">
                                 <h5>Password</h5>
                                 <div class="sign__input">
                                    <input type="password" name="password" placeholder="Password">
                                    <i class="fal fa-lock"></i>
                                 </div>
                              </div>
                              <div class="sign__action d-sm-flex justify-content-between mb-30">
                                 <div class="sign__agree d-flex align-items-center">
                                    <input class="m-check-input" type="checkbox" id="m-agree">
                                    <label class="m-check-label" for="m-agree">Keep me signed in
                                       </label>
                                 </div>
                                 <div class="sign__forgot">
                                    <a href="#">Forgot your password?</a>
                                 </div>
                              </div>
                              <button class="w-btn w-btn-11 w-100"> <span></span> Sign In</button>
                              <div class="sign__new text-center mt-20">
                                 <p> Pengguna Baru ? <a href="{{ route('register') }}">Daftar</a></p>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- sign up area end -->
      </main>


      <!-- footer area start -->
      @include('master.footer')
      <!-- footer area end -->

      <!-- JS here -->
      @include('master.bottom')

