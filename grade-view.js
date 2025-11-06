// grade-view.js
import { editGrade, handleDeleteGrade } from './grade-controller.js';

/**
 * Display semua data nilai mahasiswa ke tabel
 */
export function displayGrades(grades) {
    const tableBody = document.getElementById('gradesTableBody');
    
    if (!tableBody) {
        console.error('Element gradesTableBody tidak ditemukan');
        return;
    }
    
    // Kosongkan tabel terlebih dahulu
    tableBody.innerHTML = '';
    
    if (grades.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 20px;">
                    Belum ada data nilai mahasiswa
                </td>
            </tr>
        `;
        return;
    }
    
    // Loop semua data dan tambahkan ke tabel
    grades.forEach((grade, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${grade.nim || '-'}</td>
            <td>${grade.nama || '-'}</td>
            <td>${grade.mataKuliah || '-'}</td>
            <td>${grade.nilai || 0}</td>
            <td>${getGradeLetter(grade.nilai)}</td>
            <td>
                <button class="btn-edit" onclick="window.editGrade('${grade.id}')">
                    Edit
                </button>
                <button class="btn-delete" onclick="window.deleteGrade('${grade.id}')">
                    Hapus
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Konversi nilai angka ke huruf
 */
function getGradeLetter(nilai) {
    if (nilai >= 85) return 'A';
    if (nilai >= 70) return 'B';
    if (nilai >= 60) return 'C';
    if (nilai >= 50) return 'D';
    return 'E';
}

/**
 * Tampilkan pesan notifikasi
 */
export function showMessage(message, type = 'info') {
    // Hapus pesan lama jika ada
    const oldMessage = document.getElementById('messageBox');
    if (oldMessage) {
        oldMessage.remove();
    }
    
    // Buat elemen pesan baru
    const messageBox = document.createElement('div');
    messageBox.id = 'messageBox';
    messageBox.className = `message message-${type}`;
    messageBox.textContent = message;
    
    // Tambahkan ke body
    document.body.appendChild(messageBox);
    
    // Auto hide setelah 3 detik
    setTimeout(() => {
        messageBox.classList.add('fade-out');
        setTimeout(() => messageBox.remove(), 300);
    }, 3000);
}

// Export fungsi ke window agar bisa dipanggil dari onclick
window.editGrade = editGrade;
window.deleteGrade = handleDeleteGrade;