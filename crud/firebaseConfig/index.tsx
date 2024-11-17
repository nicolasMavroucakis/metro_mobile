import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function StartFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyD42XH8Nforq4G52AZOg_gyf_LJYbcva1s",
        authDomain: "pi40-51876.firebaseapp.com",
        projectId: "pi40-51876",
        storageBucket: "pi40-51876.firebasestorage.app",
        messagingSenderId: "232854846033",
        appId: "1:232854846033:web:8edf51e7061e6229429670"
    };
    
    // Inicializar o Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app); 
    return db;
}

export default StartFirebase;