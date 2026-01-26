<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Auth;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'check.profile' => \App\Http\Middleware\CheckProfile::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\HttpException $e, $request) {
            if (in_array($e->getStatusCode(), [403, 419])) {
                Log::channel('security')->warning('Security Triggered: '.$e->getStatusCode(), [
                    'user' => Auth::user()?->email ?? 'Guest',
                    'url' => $request->fullUrl(),
                    'ip' => $request->ip(),
                    'method' => $request->method(),
                ]);
            }
        });
    })->create();
