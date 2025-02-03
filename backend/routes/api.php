<?php

use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post("v1/auth/signout", [AuthenticationController::class, "signout"]);
    Route::get("v1/admins", [AdministratorController::class, "index"]);

    Route::get("v1/users", [UserController::class, "index"]);
    Route::post("v1/users", [UserController::class, "store"]);
    Route::put("v1/users/{user:id}", [UserController::class, "update"]);
    Route::delete("v1/users/{user:id}", [UserController::class, "destroy"]);
});

Route::post("v1/auth/signup", [AuthenticationController::class, "signup"]);
Route::post("v1/auth/signin", [AuthenticationController::class, "signin"]);
