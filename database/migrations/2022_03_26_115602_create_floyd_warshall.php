<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFloydWarshall extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('floyd_warshall', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_masjid')->unsigned();
            $table->string('ruteyangdilewati')->nullable();
            $table->integer('jaraktempuh')->nullable();
            $table->timestamps();
            $table->foreign('id_masjid')
                ->references('id')->on('kajian_islamis')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('floyd_warshall', function (Blueprint $table) {
            $table->dropForeign('floyd_warshall_id_masjid_foreign');
        });
        Schema::dropIfExists('floyd_warshall');
    }
}
