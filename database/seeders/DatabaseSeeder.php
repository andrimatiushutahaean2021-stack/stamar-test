<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Hindari pembuatan user default 'admin' / 'test@example.com'.
        // Buat user admin spesifik untuk BMKG Ambon.
        $adminEmail = 'stamar.ambon@bmkg.go.id';
        
        if (!User::where('email', $adminEmail)->exists()) {
            User::factory()->create([
                'name' => 'Administrator Stamar Ambon',
                'email' => $adminEmail,
                'password' => bcrypt('SecureP@ssw0rd!2026'), // Harap segera diganti saat production
            ]);
        }
    }
}
