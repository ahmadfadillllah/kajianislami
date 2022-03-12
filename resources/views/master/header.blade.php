<header>
    <div id="header-sticky" class="header__area header__transparent header__padding">
       <div class="container">
          <div class="row align-items-center">
             <div class="col-xxl-3 col-xl-3 col-lg-2 col-md-6 col-6">
                <div class="logo">
                   <a href="">
                      <h4>{{ env('APP_NAME') }}</h4>
                   </a>
                </div>
             </div>
             <div class="col-xxl-6 col-xl-6 col-lg-7 d-none d-lg-block">
                <div class="main-menu">
                   <nav id="mobile-menu">
                      <ul>
                        <li><a href="/">Home</a></li>
                         <li><a href="/about">About</a></li>
                         <li><a href="/saran">Saran</a></li>
                      </ul>
                   </nav>
                </div>
             </div>
             <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-6">
                <div class="header__right text-end d-flex align-items-center justify-content-end">
                   <div class="header__right-btn d-none d-md-flex align-items-center">
                      <a href="{{ route('login') }}" class="header__btn">login</a>
                      <a href="{{ route('register') }}" class="w-btn ml-45">sign up</a>
                   </div>
                   <div class="sidebar__menu d-lg-none">
                      <div class="sidebar-toggle-btn" id="sidebar-toggle">
                          <span class="line"></span>
                          <span class="line"></span>
                          <span class="line"></span>
                      </div>
                  </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </header>
