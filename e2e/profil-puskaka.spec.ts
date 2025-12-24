import { test, expect } from '@playwright/test';

test.describe('Halaman Profil Puskaka', () => {

  const PAGE_URL = '/profil/puskaka'; 

  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
  });

  test('Judul halaman harus benar', async ({ page }) => {
    await expect(page).toHaveTitle(/Profil Puskaka UY - CDC Universitas YARSI/);
  });

  test('Hero section harus menampilkan judul utama', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Pusat Kemahasiswaan, Karir dan Alumni/i });
    await expect(heading).toBeVisible();
    
    const badge = page.getByText('Pusat Kemahasiswaan, Karir dan Alumni-UY');
    await expect(badge).toBeVisible();
  });

  test('Bagian Struktur Organisasi harus ada', async ({ page }) => {
    const strukturHeading = page.getByRole('heading', { name: 'Struktur Organisasi' });
  
    await strukturHeading.scrollIntoViewIfNeeded();
    
    await expect(strukturHeading).toBeVisible();
    await expect(page.getByText('Mengenal tim inti yang mengelola')).toBeVisible();
  });

  test('Tombol CTA "Lihat Semua Layanan" harus berfungsi', async ({ page }) => {
    const ctaButton = page.getByRole('link', { name: 'Lihat Semua Layanan' });
    
    await ctaButton.scrollIntoViewIfNeeded();
    await expect(ctaButton).toBeVisible();

    // Validasi href attribute
    await expect(ctaButton).toHaveAttribute('href', /.*#layanan-tes/);
  });

  test('Footer harus dirender', async ({ page }) => {
    const footer = page.locator('footer'); 
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });

});