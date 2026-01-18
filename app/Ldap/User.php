<?php

namespace App\Ldap;

use LdapRecord\Models\Model;

/**
 * Class User
 * * Model ini merepresentasikan entitas pengguna di server LDAP Universitas YARSI.
 * Digunakan untuk proses autentikasi SSO (Single Sign-On) dan sinkronisasi data profil.
 * * @package App\Ldap
 */
class User extends Model
{
    /**
     * Object classes yang digunakan untuk pencarian model di LDAP.
     * Biarkan kosong jika ingin mencari semua object class (Global).
     * * @var array
     */
    public static array $objectClasses = [];

    /**
     * Mendapatkan Username (UID atau CN).
     * Digunakan sebagai kunci utama untuk proses Login.
     * * @return string|null
     */
    public function getUsername(): ?string
    {
        return $this->getFirstAttribute('uid') ?? $this->getFirstAttribute('cn');
    }

    /**
     * Mendapatkan Nama Lengkap pengguna.
     * * @return string|null
     */
    public function getFullName(): ?string
    {
        return $this->getFirstAttribute('displayName');
    }

    /**
     * Mendapatkan Nomor Induk (NPM/NIK).
     * Catatan: LDAP YARSI menyimpan NPM di atribut 'description'.
     * * @return string|null
     */
    public function getIdNumber(): ?string
    {
        return $this->getFirstAttribute('description');
    }

    /**
     * Mendapatkan tipe user (Mahasiswa/Karyawan/Dosen).
     * Diambil dari atribut 'title'.
     * * @return string|null
     */
    public function getUserType(): ?string
    {
        return $this->getFirstAttribute('title');
    }

    /**
     * Mendapatkan Email Institusi.
     * * @return string|null
     */
    public function getEmail(): ?string
    {
        return $this->getFirstAttribute('mail');
    }

    /**
     * Mendapatkan Nomor Telepon.
     * * @return string|null
     */
    public function getPhone(): ?string
    {
        return $this->getFirstAttribute('telephoneNumber');
    }

    /**
     * Mendapatkan Alamat Jalan.
     * * @return string|null
     */
    public function getAddress(): ?string
    {
        return $this->getFirstAttribute('street');
    }

    /**
     * Mendapatkan Kode Pos.
     * * @return string|null
     */
    public function getPostalCode(): ?string
    {
        return $this->getFirstAttribute('homePostalAddress');
    }

    /**
     * Accessor untuk atribut Username.
     * Memprioritaskan 'uid' karena biasanya merupakan komponen utama dalam DN (Distinguished Name).
     * * @return string|null
     */
    public function getUsernameAttribute()
    {
        return $this->getFirstAttribute('uid') ?? $this->getFirstAttribute('samaccountname');
    }
}