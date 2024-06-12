import { initializeApp } from 'firebase/app'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'; 

let config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

class Firebase {
  constructor() {
    this.app = initializeApp(config);
    this.db = getFirestore(this.app);
  }

  getProducts = async (callback) => {
    try {
      const productsCollection = collection(this.db, 'products');
      return onSnapshot(productsCollection, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        callback(data);
      });
    } catch (error) {
      throw new Error('Error getting data from Firestore: ' + error.message);
    }
  }
  
  createProduct = async ( data) => {
    try {
      const docRef = await addDoc(collection(this.db, "products"), data);
      return docRef.id;
    } catch (error) {
      console.error('Error creating document: ', error);
      throw new Error('Error creating document: ' + error.message);
    }
  };

  updateProduct = async (id, data) => {
    try {
      const docRef = doc(this.db, 'products', id);
      await updateDoc(docRef, data);
      console.log('Document updated with ID: ', id);
    } catch (error) {
      console.error('Error updating document:', error);
      throw new Error('Error updating document: ' + error.message);
    }
  };

  deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(this.db, 'products', productId));
      console.log('Product deleted successfully');
    } catch (error) {
      throw new Error('Error deleting product: ' + error.message)
    }
  };

}

const firebase = new Firebase();

export default firebase