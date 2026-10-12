<?php

use App\Http\Controllers\Admin\DocumentController;
use App\Models\Document;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $warningDocs = Document::where('category', 'peringatan-dini')->latest()->take(5)->get();
    $recentDocs = Document::latest()->take(6)->get();

    return Inertia::render('welcome', [
        'warningDocs' => $warningDocs,
        'recentDocs' => $recentDocs,
    ]);
})->name('home');

Route::inertia('/pelabuhan', 'pelabuhan')->name('pelabuhan');
Route::redirect('/penyeberangan', 'https://maritim.bmkg.go.id/cuaca/rute')->name('penyeberangan');
Route::inertia('/sejarah', 'sejarah')->name('sejarah');
Route::inertia('/struktur', 'struktur')->name('struktur');
Route::inertia('/visimisi', 'visimisi')->name('visimisi');
Route::inertia('/tupoksi', 'tupoksi')->name('tupoksi');
Route::redirect('/tugas-fungsi', '/tupoksi');
Route::redirect('/tugas-dan-fungsi', '/tupoksi');

Route::get('/provinsi', function () {
    $documents = Document::where('category', 'provinsi')->latest()->get();

    return Inertia::render('provinsi', [
        'documents' => $documents,
    ]);
})->name('provinsi');

Route::inertia('/wisata-bahari', 'wisata-bahari')->name('wisata-bahari');
Route::inertia('/mfy', 'mfy')->name('mfy');

Route::get('/buletin', function () {
    $documents = Document::where('category', 'buletin')->latest()->get();

    return Inertia::render('buletin', [
        'documents' => $documents,
    ]);
})->name('buletin');

Route::redirect('/login', '/panel-stamar/login');
Route::redirect('/admin', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $recentDocuments = Document::latest()->take(8)->get();
        $totalDocuments = Document::count();
        $categoryCounts = [
            'peringatan-dini' => Document::where('category', 'peringatan-dini')->count(),
            'provinsi' => Document::where('category', 'provinsi')->count(),
            'buletin' => Document::where('category', 'buletin')->count(),
            'mfy' => Document::where('category', 'mfy')->count(),
            'bahari' => Document::where('category', 'bahari')->count(),
        ];

        return Inertia::render('dashboard', [
            'recentDocuments' => $recentDocuments,
            'totalDocuments' => $totalDocuments,
            'categoryCounts' => $categoryCounts,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');
});
