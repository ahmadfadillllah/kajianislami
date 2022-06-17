<div class="sidebar__area">
    <div class="sidebar__wrapper">
       <div class="sidebar__close">
          <button class="sidebar__close-btn" id="sidebar__close-btn">
          <span><i class="fal fa-times"></i></span>
          <span>close</span>
          </button>
       </div>
       <div class="sidebar__content">
          <div class="logo mb-40">
             <a href="index.html">
             <h4>{{ env('APP_NAME') }}</h4>
             </a>
          </div>
          <div class="mobile-menu mobile-menu-2"></div>
          <div class="sidebar__info mt-350">
             <a href="{{ route('login') }}" class="w-btn w-btn-blue-2 w-btn-4 d-block mb-15 mt-15">login</a>
             <a href="{{ route('register') }}" class="w-btn w-btn-blue d-block">sign up</a>
          </div>
       </div>
    </div>
 </div>

 <div class="body-overlay"></div>
