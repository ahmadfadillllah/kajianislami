        @include('master.top')
      <!-- back to top end -->

      <!-- header area start -->
      @include('master.header')
      <!-- header area end -->

      <!-- sidebar area start -->
      @include('master.sidebar')
      <!-- sidebar area end -->
      <div class="body-overlay"></div>
      <!-- sidebar area end -->

      {{-- sweetalert2 area end --}}



      {{-- sweetalert2 area end --}}

      <main>

         <!-- page title area start -->
         <section class="page__title-area page__title-height d-flex align-items-center fix p-relative z-index-1" data-background="assets/img/page-title/page-title.jpg">
            <div class="page__title-shape">
               <img class="page-title-dot-4" src="assets/img/page-title/dot-4.png" alt="">
               <img class="page-title-dot" src="assets/img/page-title/dot.png" alt="">
               <img class="page-title-dot-2" src="assets/img/page-title/dot-2.png" alt="">
               <img class="page-title-dot-3" src="assets/img/page-title/dot-3.png" alt="">
               <img class="page-title-plus" src="assets/img/page-title/plus.png" alt="">
               <img class="page-title-triangle" src="assets/img/page-title/triangle.png" alt="">
            </div>
            <div class="container">
               <div class="row">
                  <div class="col-xxl-12">
                     <div class="page__title-wrapper text-center">
                        <h3>Contact </h3>
                           <nav aria-label="breadcrumb">
                              <ol class="breadcrumb justify-content-center">
                                 <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                 <li class="breadcrumb-item active" aria-current="page">Contact</li>
                              </ol>
                           </nav>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- page title area end -->

          <!-- contact area start  -->
          <section class="contact__area pb-150 p-relative z-index-1">
              <div class="container">
                  <div class="row">
                      <div class="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                          <div class="contact__wrapper white-bg mt--70 p-relative z-index-1 wow fadeInUp" data-wow-delay=".3s">

                            @if (session('info'))

                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                              <strong>Terimakasih!</strong> {{ session('info') }}
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>

                            @endif

                         <div class="row">
                            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                               <div class="contact__info pr-80">
                                  <h3 class="contact__title">Let's talk</h3>

                                  <div class="contact__details">
                                     <ul>
                                        <li>
                                           <h4>Our Location</h4>
                                           <p>Makassar, South Sulawesi, Indonesia </p>
                                        </li>
                                        <li>
                                           <h4>Email Adress</h4>
                                           <p><a href="https://themepure.net/cdn-cgi/l/email-protection#26555356564954524243554d66414b474f4a0845494b"><span class="__cf_email__" data-cfemail="63101613130c11170706100823040e020a0f4d000c0e">[email&#160;protected]</span></a></p>
                                           <p><a href="https://themepure.net/cdn-cgi/l/email-protection#86efe8e0e9f4ebe7efe9e8c6e1ebe7efeaa8e5e9eb"><span class="__cf_email__" data-cfemail="d8b1b6beb7aab5b9b1b7b698bfb5b9b1b4f6bbb7b5">[email&#160;protected]</span></a></p>
                                        </li>
                                        <li>
                                           <h4>Hotline Number</h4>
                                           <p><a href="tel:+(046)-320-474-458">+ (62) 85 213 067 944</a></p>
                                        </li>
                                     </ul>
                                  </div>
                               </div>
                            </div>
                            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                               <div class="contact__form">
                                  <form action="{{ route('saran-post') }}" method="POST">
                                    @csrf
                                     <input type="text" name="name" placeholder="Name" required>
                                     <input type="email" name="email" placeholder="Email" required>
                                     <input type="subject" name="subject" placeholder="Subject" required>
                                     <textarea placeholder="Message" name="message" required></textarea>
                                     <button type="submit" class="w-btn w-btn-blue-5 w-btn-6 w-btn-14">Send Massage</button>
                                  </form>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>
          <!-- contact area end  -->
      </main>

      <!-- footer area start -->
      @include('master.footer')
      <!-- footer area end -->

      <!-- JS here -->
      @include('master.bottom')

