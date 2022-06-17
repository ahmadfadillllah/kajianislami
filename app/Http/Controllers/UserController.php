<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    public function index()
    {
        $users = User::all()->where('role', 'masyarakatumum');
        return view('users.index', compact('users'));
    }

    public function destroy($id)
    {
        $users = User::find($id);
        $users->delete();

        return redirect()->route('user.index')->with('notif', 'Anda telah menghapus user tersebut');
    }
}
