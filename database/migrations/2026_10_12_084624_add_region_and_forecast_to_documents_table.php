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
        Schema::table('documents', function (Blueprint $table) {
            $table->string('region_code')->nullable()->after('category'); // e.g. AH001, P_AH001
            $table->unsignedSmallInteger('region_number')->nullable()->after('region_code'); // 1-18 for provinsi, 1-37 for pelabuhan
            $table->date('forecast_date')->nullable()->after('region_number');
            $table->string('period_type')->default('daily')->nullable()->after('forecast_date'); // daily, weekly
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn(['region_code', 'region_number', 'forecast_date', 'period_type']);
        });
    }
};
