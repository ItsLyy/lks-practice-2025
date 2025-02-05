<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth:sanctum"])->group(function () {
    Route::get("/user", function (Request $request) {
        return $request->user();
    });

    Route::post("/logout", [AuthenticationController::class, 'logout']);
    Route::post("/news", [NewsController::class, 'store'])->middleware(['journalPermission']);
    Route::post("/news/{new:id}/comments", [CommentController::class, 'store']);
});

Route::post("/login", [AuthenticationController::class, 'login']);
Route::post("/register", [AuthenticationController::class, 'register']);
Route::get("/news", [NewsController::class, 'index']);
