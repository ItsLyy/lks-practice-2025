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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId("form_id")->constrained()->cascadeOnDelete();
            $table->string("name");
            $table->enum("choice_type", ['short answer', 'paragraph', 'date', 'multiple choice', 'dropdown', 'checkboxes']);
            $table->string("choices")->nullable();
            $table->boolean("is_required");
        });

        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId("response_id")->constrained()->cascadeOnDelete();
            $table->foreignId("question_id")->constrained("questions", "id")->cascadeOnDelete();
            $table->text("value");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
