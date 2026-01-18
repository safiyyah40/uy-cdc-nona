<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use LdapRecord\Connection;

class TestLdapConnection extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ldap:test {username?}';
    
     /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Uji koneksi LDAP dan cari pengguna';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Menguji Koneksi LDAP ke YARSI...');
        $this->info('LDAP Host: 10.10.1.10');
        $this->info('LDAP Port: 389');
        $this->info('LDAP Base DN: ou=Users,dc=yarsi,dc=ac,dc=id');
        $this->newLine();

        // Cek Koneksi Fisik
        $fp = @fsockopen('10.10.1.10', 389, $errno, $errstr, 2);
        if (!$fp) {
            $this->error('GAGAL KONEKSI: Tidak bisa menghubungi 10.10.1.10');
            $this->error('Pastikan VPN YARSI aktif!');
            return 1;
        }
        fclose($fp);
        $this->info('Koneksi fisik ke server berhasil!');

        // Minta Credential
        $username = $this->argument('username') ?? $this->ask('Masukkan Username LDAP Anda (uid)');
        $password = $this->secret('Masukkan Password LDAP Anda');
        
        $bindDn = "uid={$username},ou=Users,dc=yarsi,dc=ac,dc=id";

        try {
            // Setup Koneksi
            $connection = new Connection([
                'hosts' => ['10.10.1.10'],
                'port' => 389,
                'base_dn' => 'ou=Users,dc=yarsi,dc=ac,dc=id',
                'username' => $bindDn,
                'password' => $password,
                'use_ssl' => false,
                'use_tls' => false,
                'timeout' => 10,
            ]);

            $connection->connect();
            $this->info('Login LDAP Berhasil!');

            // Test Search User - AMBIL SEMUA ATRIBUT
            $this->newLine();
            $this->info("Mencari data user: {$username}");

            $query = $connection->query();
            $user = $query->select(['*'])->where('uid', '=', $username)->first();

            if ($user) {
                $this->info('User ditemukan!');
                $this->newLine();
                
                // Tampilkan data penting
                $this->table(
                    ['Attribute', 'Value'],
                    [
                        ['DN', $user['dn'] ?? '-'],
                        ['Username (uid)', $user['uid'][0] ?? '-'],
                        ['Name (displayName)', $user['displayname'][0] ?? '-'],
                        ['Given Name (givenName)', $user['givenname'][0] ?? '-'],
                        ['Surname (sn)', $user['sn'][0] ?? '-'],
                        ['NPM/NIP (description)', $user['description'][0] ?? '-'],
                        ['Type (title)', $user['title'][0] ?? '-'],
                        ['Pager', $user['pager'][0] ?? '-'],
                        ['Email Institusi (mail)', $user['mail'][0] ?? '-'],
                        ['Email Alternatif (mailAlternateAddress)', $user['mailalternateaddress'][0] ?? '-'],
                        ['Phone (telephoneNumber)', $user['telephonenumber'][0] ?? '-'],
                        ['Home Phone (homePhone)', $user['homephone'][0] ?? '-'],
                        ['Street', $user['street'][0] ?? '-'],
                        ['Home Postal Address', $user['homepostaladdress'][0] ?? '-'],
                        ['Mail Host', $user['mailhost'][0] ?? '-'],
                        ['UID Number', $user['uidnumber'][0] ?? '-'],
                        ['GID Number', $user['gidnumber'][0] ?? '-'],
                    ]
                );

                // Tampilkan SEMUA atribut yang ada (Debug mode)
                $this->newLine();
                $this->warn('DEBUG: Semua atribut yang tersedia di LDAP:');
                $this->newLine();
                
                $allAttributes = [];
                
                // Iterasi langsung dari array
                foreach ($user as $key => $value) {
                    // Skip numeric keys dan 'count'
                    if (is_numeric($key) || $key === 'count') continue;
                    
                    if (is_array($value)) {
                        $displayValue = isset($value[0]) ? $value[0] : json_encode($value);
                    } else {
                        $displayValue = $value;
                    }
                    
                    $allAttributes[] = [$key, $displayValue];
                }
                
                $this->table(['Attribute Name', 'Value'], $allAttributes);
            } else {
                $this->warn('User tidak ditemukan');
            }

        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            return 1;
        }
        return 0;
    }
}