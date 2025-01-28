<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('v1/auth/login', [AuthenticationController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('v1/forms', [FormController::class, 'store']);
    Route::get('v1/forms', [FormController::class, 'index']);
    Route::get('v1/forms/{form:slug}', [FormController::class, 'show']);

    Route::post('v1/forms/{form:slug}/questions', [QuestionController::class, 'store']);
    Route::delete('v1/forms/{form:slug}/questions/{question:id}', [QuestionController::class, 'destroy']);

    Route::post('v1/forms/{form:slug}/responses', [ResponseController::class, 'store']);
    Route::get('v1/forms/{form:slug}/responses', [ResponseController::class, 'index']);

    Route::post('v1/auth/logout', [AuthenticationController::class, 'logout']);
});
