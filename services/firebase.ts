import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

// Firebase configuration com suas credenciais reais
const firebaseConfig = {
  apiKey: "AIzaSyCb1lVCXQrafwmmDDnVwqY7QdUOwiXWT8o",
  authDomain: "myspyplatform.firebaseapp.com",
  projectId: "myspyplatform",
  storageBucket: "myspyplatform.appspot.com",
  messagingSenderId: "902746346647",
  appId: "1:902746346647:web:YOUR_APP_ID", // Você precisará adicionar o App ID completo
}

// Initialize Firebase
let app
let auth
let db

// Verificar se já estamos no lado do cliente e se o Firebase já foi inicializado
if (typeof window !== "undefined") {
  try {
    // Verificar se o Firebase já foi inicializado
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)

    console.log("Firebase inicializado com sucesso")
  } catch (error) {
    console.error("Erro ao inicializar Firebase:", error)
  }
}

// Auth functions
export const loginUser = async (email: string, password: string) => {
  if (!auth) {
    throw new Error("Firebase Auth não inicializado")
  }

  try {
    console.log(`Tentando login com email: ${email}`)
    const result = await signInWithEmailAndPassword(auth, email, password)
    console.log("Login bem-sucedido:", result.user.uid)
    return result
  } catch (error: any) {
    console.error("Erro no login:", error.code, error.message)
    throw error
  }
}

export const registerUser = async (email: string, password: string, userData: any) => {
  if (!auth || !db) {
    throw new Error("Firebase não inicializado")
  }

  try {
    console.log(`Tentando registrar usuário com email: ${email}`)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    console.log("Usuário registrado com sucesso:", user.uid)

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
      ...userData,
    })

    console.log("Dados do usuário salvos no Firestore")

    return user
  } catch (error: any) {
    console.error("Erro no registro:", error.code, error.message)
    throw error
  }
}

export const logoutUser = async () => {
  if (!auth) {
    throw new Error("Firebase Auth não inicializado")
  }

  try {
    await signOut(auth)
    console.log("Logout realizado com sucesso")
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    throw error
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  if (!auth) {
    console.error("Firebase Auth não inicializado")
    return Promise.resolve(null)
  }

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        console.log("Usuário atual:", user.uid)
      } else {
        console.log("Nenhum usuário autenticado")
      }
      resolve(user)
    })
  })
}

// Firestore functions
export const getUserData = async (userId: string) => {
  if (!db) {
    throw new Error("Firestore não inicializado")
  }

  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("Nenhum documento encontrado para o usuário:", userId)
      return null
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error)
    throw error
  }
}

export const updateUserData = async (userId: string, data: any) => {
  if (!db) {
    throw new Error("Firestore não inicializado")
  }

  try {
    const userRef = doc(db, "users", userId)
    await setDoc(userRef, data, { merge: true })
    console.log("Dados do usuário atualizados com sucesso")
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário:", error)
    throw error
  }
}

export const getSubscriptionStatus = async (userId: string) => {
  if (!db) {
    throw new Error("Firestore não inicializado")
  }

  try {
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      return userData.subscription || { status: "inactive" }
    }

    return { status: "inactive" }
  } catch (error) {
    console.error("Erro ao verificar status da assinatura:", error)
    throw error
  }
}

export { auth, db }
