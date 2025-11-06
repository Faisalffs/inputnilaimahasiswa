// grade-model.js
import { db } from './firebase-config.js';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore";

// Nama collection di Firestore
const GRADES_COLLECTION = 'grades';

/**
 * CREATE - Tambah data nilai mahasiswa baru
 */
export async function createGrade(gradeData) {
    try {
        const gradesRef = collection(db, GRADES_COLLECTION);
        const docRef = await addDoc(gradesRef, {
            ...gradeData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        console.log('Data berhasil ditambahkan dengan ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error menambahkan data:', error);
        return { success: false, error: error.message };
    }
}

/**
 * READ - Ambil semua data nilai mahasiswa
 */
export async function getAllGrades() {
    try {
        const gradesRef = collection(db, GRADES_COLLECTION);
        const q = query(gradesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const grades = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return grades;
    } catch (error) {
        console.error('Error mengambil data:', error);
        return [];
    }
}

/**
 * READ - Ambil data nilai mahasiswa berdasarkan ID
 */
export async function getGradeById(gradeId) {
    try {
        const gradeRef = doc(db, GRADES_COLLECTION, gradeId);
        const gradeDoc = await getDoc(gradeRef);
        
        return gradeDoc.exists() ? { id: gradeDoc.id, ...gradeDoc.data() } : null;
    } catch (error) {
        console.error('Error mengambil data:', error);
        return null;
    }
}

/**
 * UPDATE - Update data nilai mahasiswa
 */
export async function updateGrade(gradeId, updatedData) {
    try {
        const gradeRef = doc(db, GRADES_COLLECTION, gradeId);
        await updateDoc(gradeRef, { ...updatedData, updatedAt: new Date().toISOString() });
        return { success: true };
    } catch (error) {
        console.error('Error mengupdate data:', error);
        return { success: false, error: error.message };
    }
}

/**
 * DELETE - Hapus data nilai mahasiswa
 */
export async function deleteGrade(gradeId) {
    try {
        const gradeRef = doc(db, GRADES_COLLECTION, gradeId);
        await deleteDoc(gradeRef);
        return { success: true };
    } catch (error) {
        console.error('Error menghapus data:', error);
        return { success: false, error: error.message };
    }
}

/**
 * REALTIME LISTENER - Dengarkan perubahan data secara realtime
 */
export function listenToGrades(callback) {
    const gradesRef = collection(db, GRADES_COLLECTION);
    const q = query(gradesRef, orderBy('createdAt', 'desc'));

    return onSnapshot(q, (querySnapshot) => {
        const grades = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(grades);
    });
}
