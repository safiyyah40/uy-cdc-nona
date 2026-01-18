<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use LdapRecord\Connection;

class ImportLdapUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ldap:import-dosen-staf';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import user LDAP khusus Dosen dan Staf';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Memulai proses import user LDAP...');
        $this->info('   - Target: Khusus Dosen dan Staf');
        $this->info('   - Filter: Mahasiswa akan otomatis dilewati');

        // Cek Koneksi Fisik
        $fp = @fsockopen('10.10.1.10', 389, $errno, $errstr, 2);
        if (!$fp) {
            $this->error('GAGAL KONEKSI: Tidak bisa menghubungi 10.10.1.10. Cek VPN.');
            return;
        }
        fclose($fp);

        // Minta Credential
        $username = $this->ask('Masukkan Username LDAP Anda (uid)');
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
            $this->info('Login Berhasil. Memulai pencarian data Dosen/Staf...');

            $abjad = array_merge(range('a', 'z'), range('0', '9'));
            $totalImported = 0;
            $totalSkippedMahasiswa = 0;

            foreach ($abjad as $char) {
                $this->info('Checking awalan: [ ' . strtoupper($char) . ' ] ...');

                $query = $connection->query();
                $query->where('uid', 'starts_with', $char);
                $query->select(['*']);

                $query->chunk(200, function ($entries) use (&$totalImported, &$totalSkippedMahasiswa) {
                    foreach ($entries as $entry) {
                        $uid = $entry['uid'][0] ?? null;
                        if (!$uid) continue;

                        $userType = strtoupper($entry['title'][0] ?? 'M');

                        // FILTER: HANYA DOSEN (D) DAN STAF (S)
                        // Jika bukan D atau S, maka dianggap mahasiswa/lainnya dan dilewati
                        if (!str_starts_with($userType, 'D') && !str_starts_with($userType, 'S')) {
                            $totalSkippedMahasiswa++;
                            continue;
                        }

                        $role = 'dosen_staf';
                        $idNumber = $entry['description'][0] ?? null;
                        $name = $entry['displayname'][0] ?? $uid;
                        
                        // EXTRACT DATA EMAIL
                        $emailGmail = $entry['mailalternateaddress'][0] ?? null;
                        $emailInstitusi = $entry['mail'][0] ?? null;
                        
                        if (!empty($emailGmail) && filter_var($emailGmail, FILTER_VALIDATE_EMAIL)) {
                            $email = $emailGmail;
                        } elseif (!empty($emailInstitusi) && filter_var($emailInstitusi, FILTER_VALIDATE_EMAIL)) {
                            $email = $emailInstitusi;
                        } else {
                            $email = $uid . '@yarsi.ac.id';
                        }

                        // Proteksi Email Duplikat
                        $emailConflict = User::where('email', $email)
                            ->where('username', '!=', $uid)
                            ->exists();

                        if ($emailConflict) {
                            $email = $uid . '.' . rand(100, 999) . '@duplicate.yarsi.ac.id';
                        }

                        // 3. EXTRACT DATA TELEPON
                        $phone = $entry['telephonenumber'][0] ?? $entry['homephone'][0] ?? null;
                        if ($phone) {
                            $phone = preg_replace('/[^0-9]/', '', $phone);
                            if (strlen($phone) >= 8) {
                                if (str_starts_with($phone, '0')) {
                                    $phone = '62' . substr($phone, 1);
                                } elseif (!str_starts_with($phone, '62')) {
                                    $phone = '62' . $phone;
                                }
                            } else {
                                $phone = null;
                            }
                        }

                        // FAKULTAS (Dosen/Staf biasanya di atribut street atau ou)
                        $faculty = $entry['street'][0] ?? $entry['ou'][0] ?? 'Universitas YARSI';

                        // SIMPAN KE DATABASE
                        User::updateOrCreate(
                            ['username' => $uid],
                            [
                                'name' => $name,
                                'email' => $email,
                                'password' => Hash::make('ldap-default'),
                                'role' => $role,
                                'id_number' => $idNumber,
                                'phone' => $phone,
                                'faculty' => $faculty,
                                'study_program' => null, // Dosen tidak memiliki prodi mahasiswa
                                'gender' => null,
                                'is_profile_complete' => false,
                            ]
                        );

                        $totalImported++;
                    }
                });
            }

            $this->newLine();
            $this->info('========================================');
            $this->info('            SELESAI TOTAL!              ');
            $this->info('========================================');
            $this->info("Total Berhasil Import Dosen/Staf: {$totalImported}");
            $this->info("Total Mahasiswa Dilewati: {$totalSkippedMahasiswa}");
            $this->newLine();

        } catch (\Exception $e) {
            $this->error('ERROR: ' . $e->getMessage());
        }
    }
}