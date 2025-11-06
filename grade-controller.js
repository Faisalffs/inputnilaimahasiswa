// grade-controller.js
import { 
    createGrade, 
    getAllGrades, 
    getGradeById,
    updateGrade, 
    deleteGrade,
    listenToGrades 
} from './grade-model.js';
import { displayGrades, showMessage } from './grade-view.js';

// Variabel untuk menyimpan unsubscribe function
let unsubscribeListener = null;

/**
 * Initialize - Panggil saat halaman dimuat
 */
export function initGradeApp() {
    // Setup realtime listener
    setupRealtimeListener();
    
    // Setup event listeners untuk form
    setupFormListeners();
}

/**
 * Setup Realtime Listener
 */
function setupRealtimeListener() {
    unsubscribeListener = listenToGrades((grades) => {
        console.log('Data updated:', grades);
        displayGrades(grades);
    });
}

/**
 * Setup Form Listeners
 */
function setupFormListeners() {
    const form = document.getElementById('gradeForm');
    if (form) {
        form.addEventListener('submit', handleSubmitGrade);
    }
}

/**
 * Handle Submit Form (CREATE atau UPDATE)
 */
async function handleSubmitGrade(event) {
    event.preventDefault();
    
    const formData = {
        nim: document.getElementById('nim').value,
        nama: document.getElementById('nama').value,
        mataKuliah: document.getElementById('mataKuliah').value,
        nilai: parseFloat(document.getElementById('nilai').value)
    };
    
    const gradeId = document.getElementById('gradeId').value;
    
    if (gradeId) {
        // UPDATE
        const result = await updateGrade(gradeId, formData);
        if (result.success) {
            showMessage('Data berhasil diupdate!', 'success');
            resetForm();
        } else {
            showMessage('Gagal mengupdate data: ' + result.error, 'error');
        }
    } else {
        // CREATE
        const result = await createGrade(formData);
        if (result.success) {
            showMessage('Data berhasil ditambahkan!', 'success');
            resetForm();
        } else {
            showMessage('Gagal menambahkan data: ' + result.error, 'error');
        }
    }
}

/**
 * Edit Grade - Isi form dengan data yang akan diedit
 */
export async function editGrade(gradeId) {
    const grade = await getGradeById(gradeId);
    if (grade) {
        document.getElementById('gradeId').value = grade.id;
        document.getElementById('nim').value = grade.nim;
        document.getElementById('nama').value = grade.nama;
        document.getElementById('mataKuliah').value = grade.mataKuliah;
        document.getElementById('nilai').value = grade.nilai;
        
        // Ubah tombol submit
        const submitBtn = document.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Update Data';
    }
}

/**
 * Delete Grade dengan konfirmasi
 */
export async function handleDeleteGrade(gradeId) {
    if (confirm('Yakin ingin menghapus data ini?')) {
        const result = await deleteGrade(gradeId);
        if (result.success) {
            showMessage('Data berhasil dihapus!', 'success');
        } else {
            showMessage('Gagal menghapus data: ' + result.error, 'error');
        }
    }
}

/**
 * Reset Form
 */
function resetForm() {
    document.getElementById('gradeForm').reset();
    document.getElementById('gradeId').value = '';
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Tambah Data';
}

/**
 * Cleanup saat aplikasi ditutup
 */
export function cleanup() {
    if (unsubscribeListener) {
        unsubscribeListener();
    }
}