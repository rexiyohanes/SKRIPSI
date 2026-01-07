document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen yang diperlukan dari DOM
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Tambahkan event listener untuk link "Daftar di sini"
    showRegisterLink.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah link berpindah halaman
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    // Tambahkan event listener untuk link "Login di sini"
    showLoginLink.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah link berpindah halaman
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });
});