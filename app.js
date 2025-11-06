// app.js
import { initGradeApp } from './grade-controller.js';

// Initialize aplikasi saat halaman selesai dimuat
window.addEventListener('DOMContentLoaded', () => {
    console.log('Aplikasi dimulai...');
    initGradeApp();
});