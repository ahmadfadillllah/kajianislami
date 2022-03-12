<?php

namespace App\Http\Controllers;

use App\Models\KajianIslami;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KajianIslamiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $kajian = KajianIslami::all();

        return view('dashboard.kajian-islami.index', compact('kajian'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('dashboard.kajian-islami.tambah');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //

        $kajian = new KajianIslami;
        $kajian->user_id = Auth::user()->id;
        $kajian->namamasjid = $request->namamasjid;
        $kajian->alamat = $request->alamat;
        $kajian->namapengurusmasjid = $request->namapengurusmasjid;
        $kajian->no_hp = $request->no_hp;
        $kajian->jeniskajian = $request->jeniskajian;
        $kajian->materidanwaktukajian = $request->materidanwaktukajian;
        $kajian->latlong = $request->latlong;
        if($request->hasFile('gambar')){
            $request->file('gambar')->move('gambar/',$request->file('gambar')->getClientOriginalName());
            $kajian->gambar = $request->file('gambar')->getClientOriginalName();
            $kajian->save();

            return redirect()->route('kajianislami')->with('info', 'Kajian Islami telah bertambah');
        }

        return redirect()->route('kajianislami')->with('info', 'Kajian Islami gagal ditambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $kajian = KajianIslami::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $kajian = KajianIslami::find($id);
        $kajian->delete();

        if($kajian){
            return redirect()->route('kajianislami')->with('info', 'Kajian Islami telah dihapus');
        }

        return redirect()->route('kajianislami')->with('info', 'Kajian Islami gagal dihapus');
    }
}
