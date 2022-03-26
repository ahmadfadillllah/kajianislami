<?php

namespace App\Http\Controllers;

use App\Models\FloydWarshall;
use App\Models\KajianIslami;
use Illuminate\Http\Request;

class AStarController extends Controller
{
    //
    public function index()
    {

        return view('dashboard.astar.index');
    }

    public function showMosque(Request $request)
    {
        $KajianIslami = KajianIslami::all();
        $datas = [];

        if ($request->type != 'all') {
            $latFrom = $request->lat;
            $longFrom = $request->long;
            foreach ($KajianIslami as $key => $value) {
                $latLong = trim(str_replace(")", "", str_replace('LatLng(', '', $value->latlong)), '');
                $explodeLatlong = explode(',', $latLong);
                $lat = trim($explodeLatlong[0], " ");
                $long = trim($explodeLatlong[1], " ");
                $distance = round($this->haversineGreatCircleDistance($latFrom,$longFrom,$lat,$long));
                if($distance <= 7000){
                    array_push($datas,$value);
                }
            }
        }else{
            $datas = $KajianIslami;
        }
        return response()->json($datas);
    }

    /**
     * Calculates the great-circle distance between two points, with
     * the Haversine formula.
     * @param float $latitudeFrom Latitude of start point in [deg decimal]
     * @param float $longitudeFrom Longitude of start point in [deg decimal]
     * @param float $latitudeTo Latitude of target point in [deg decimal]
     * @param float $longitudeTo Longitude of target point in [deg decimal]
     * @param float $earthRadius Mean earth radius in [m]
     * @return float Distance between points in [m] (same as earthRadius)
     */
    function haversineGreatCircleDistance(
        $latitudeFrom,
        $longitudeFrom,
        $latitudeTo,
        $longitudeTo,
        $earthRadius = 6371000
    ) {
        // convert from degrees to radians
        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($latitudeTo);
        $lonTo = deg2rad($longitudeTo);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
        return $angle * $earthRadius;
    }

    public function store(Request $request)
    {
        $saveData = new FloydWarshall();
        $saveData->id_masjid = $request->id_masjid;
        $saveData->save();
        return back();
    }
}
