<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRuteKajianTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rute_kajian', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("kajian_islami_id");
            $table->text("keterangan");
            $table->json("rute");

            $table->foreign('kajian_islami_id')->references('id')->on('kajian_islamis');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rute_kajian');
    }
}
