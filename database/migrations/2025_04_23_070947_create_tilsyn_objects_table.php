<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tilsyn_objects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->geometry('geom', 'point');
            $table->integer('gnr');
            $table->integer('bnr');
            $table->integer('fnr')->nullable();
            $table->string('adresse', 100)->nullable();
            $table->string('bygning', 20)->nullable();
            $table->integer('sone');
            $table->string('status', 10);
            $table->string('saksnr', 20)->nullable();
            $table->text('kommentar')->nullable();
            $table->date('frist')->nullable();
            $table->string('saksbeh', 50)->nullable();
            $table->string('endret_av', 50)->nullable();
            $table->text('svarskjema')->nullable();
            $table->text('komtek')->nullable();
            $table->text('slam')->nullable();
            $table->text('kontroll')->nullable();
            $table->text('arkiv')->nullable();
            $table->string('hjemmel', 50)->nullable();
            $table->integer('project_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tilsyn_objects');
    }
};
