<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //

    public function login()
    {
        //
        return view('auth.login');
    }

    public function postLogin(Request $request)
    {
        $check  = Auth::attempt(['email' => $request->email, 'password' => $request->password]);

        if($check)
        {
            return redirect()->route('dashboard.index');
        }else
        {
            return redirect()->route('login')->with('info', 'Email / Password salah');
        }
    }
}
