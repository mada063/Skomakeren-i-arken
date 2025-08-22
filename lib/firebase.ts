import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, where, orderBy, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialiserer Firebase
const app = initializeApp(firebaseConfig)

// Setter opp Firebase Authentication
export const auth = getAuth(app)

// Setter opp Cloud Firestore
export const db = getFirestore(app)

// Definerer hvordan en bil ser ut i databasen
export interface Car {
  id: string
  brand: string
  model: string
  keyTypes: string[]
  years: number[]
}

// Funksjoner for å jobbe med bilnøkkel-databasen
export const carKeyDB = {
  // Henter alle biler fra databasen
  async getAllCars(): Promise<Car[]> {
    const carsRef = collection(db, 'cars')
    const snapshot = await getDocs(carsRef)
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Car[]
  },

  // Henter biler etter merke
  async getCarsByBrand(brand: string): Promise<Car[]> {
    const carsRef = collection(db, 'cars')
    const q = query(carsRef, where('brand', '==', brand), orderBy('model'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Car[]
  },

  // Henter biler etter modell
  async getCarsByModel(model: string): Promise<Car[]> {
    const carsRef = collection(db, 'cars')
    const q = query(carsRef, where('model', '==', model))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Car[]
  },

  // Henter alle unike bilmerker
  async getUniqueBrands(): Promise<string[]> {
    const carsRef = collection(db, 'cars')
    const snapshot = await getDocs(carsRef)
    const brands = new Set<string>()
    
    snapshot.docs.forEach(doc => {
      const data = doc.data()
      if (data.brand) {
        brands.add(data.brand)
      }
    })
    
    return Array.from(brands).sort()
  },

  // Henter alle unike nøkkeltyper
  async getUniqueKeyTypes(): Promise<string[]> {
    const carsRef = collection(db, 'cars')
    const snapshot = await getDocs(carsRef)
    const keyTypes = new Set<string>()
    
    snapshot.docs.forEach(doc => {
      const data = doc.data()
      if (data.keyTypes && Array.isArray(data.keyTypes)) {
        data.keyTypes.forEach((type: string) => keyTypes.add(type))
      }
    })
    
    return Array.from(keyTypes).sort()
  }
}

export default app 