<footer class="footer footer-static footer-light">
    <p class="clearfix mb-0"><span class="float-md-start d-block d-md-inline-block mt-25">Copyright &copy; 2022<span class="d-none d-sm-inline-block">, All rights Reserved</span></span><span class="float-md-end d-none d-md-block">Ahmad Fadillah<i data-feather="heart"></i></span></p>
</footer>
<button class="btn btn-primary btn-icon scroll-top" type="button"><i data-feather="arrow-up"></i></button>

<!-- BEGIN: Vendor JS-->
<script src="{{ asset('vuexy') }}/app-assets/vendors/js/vendors.min.js"></script>
<!-- BEGIN Vendor JS-->

<!-- BEGIN: Page Vendor JS-->
<script src="{{ asset('vuexy') }}/app-assets/vendors/js/charts/apexcharts.min.js"></script>
<script src="{{ asset('vuexy') }}/app-assets/vendors/js/extensions/toastr.min.js"></script>
<script src="{{ asset('vuexy') }}/app-assets/vendors/js/extensions/moment.min.js"></script>
<script src="{{ asset('vuexy') }}/app-assets/vendors/js/tables/datatable/jquery.dataTables.min.js"></script>
<script src="{{ asset('vuexy') }}/app-assets/vendors/js/tables/datatable/datatables.buttons.min.js"></script>
<script src="{{ asset('vuexy') }}/app-assets/vendors/js/tables/datatable/dataTables.bootstrap5.min.js"></script>
<script src="{{ asset('vuexy') }}/app-assets/vendors/js/tables/datatable/dataTables.responsive.min.js"></script>
<script src="{{ asset('vuexy') }}/app-assets/vendors/js/tables/datatable/responsive.bootstrap5.js"></script>
<!-- END: Page Vendor JS-->

<!-- BEGIN: Theme JS-->
<script src="{{ asset('vuexy') }}/app-assets/js/core/app-menu.js"></script>
<script src="{{ asset('vuexy') }}/app-assets/js/core/app.js"></script>
<!-- END: Theme JS-->

<!-- BEGIN: Page JS-->
<script src="{{ asset('vuexy') }}/app-assets/js/scripts/pages/dashboard-analytics.js"></script>
<script src="{{ asset('vuexy') }}/app-assets/js/scripts/pages/app-invoice-list.js"></script>
<!-- END: Page JS-->

{{-- Leaflet JS --}}
<script
              src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
              integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
              crossorigin="">
            </script>
<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>

<script src="{{ asset('geo-location-javascript/js/geo-min.js') }}"></script>

<script>
    $(window).on('load', function() {
        if (feather) {
            feather.replace({
                width: 14,
                height: 14
            });
        }
    })
</script>
</body>
<!-- END: Body-->

</html>
