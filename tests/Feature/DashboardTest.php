<?php

use App\Models\Role;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/')->assertRedirect(route('login'));
});

test('authenticated users can visit the map page', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('map'))->assertOk();
});