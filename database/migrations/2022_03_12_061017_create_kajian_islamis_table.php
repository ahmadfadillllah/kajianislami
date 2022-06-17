<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKajianIslamisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kajian_islamis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('tempat');
            $table->string('waktu');
            $table->string('judul');
            $table->string('latlong');
            $table->string('pemateri');
            $table->timestamps();
//            $table->string('no_hp')->nullable();
//            $table->string('jeniskajian')->nullable();
//            $table->string('gambar')->nullable();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kajian_islamis');
    }
}
