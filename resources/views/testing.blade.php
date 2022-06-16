<html>
    <head>
        <title>Simple Map</title>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bootstrap demo</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}" />
        <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossorigin=""/>
        {{-- <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" /> --}}
        <link rel="stylesheet" href="{{ asset('leaflet-routing-machine-3.2.12/dist/leaflet-routing-machine.css') }}" />
    </head>
    <body>
        <div class="row">
            <div class="col-md-12" style="min-height: 500px">
                <div id="mapid"></div>
            </div>
            <div class="col-md-12">
                <div id="capa"></div>
                <div id="latlong"></div>
            </div>
        </div>

        <script
            src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
            integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
            crossorigin="">
        </script>
        {{-- <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script> --}}

        <script src="{{ asset('geo-location-javascript/js/geo-min.js') }}"></script>

        <script src="https://code.jquery.com/jquery-3.6.0.slim.js" integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
        <script src="{{asset('axios.min.js')}}"></script>
        <!-- END: Footer-->
        <script src="{{ asset('leaflet-routing-machine-3.2.12/dist/leaflet-routing-machine.js') }}"></script> 
        <script src="{{ asset('js/helpers.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>

    </body>
</html>
