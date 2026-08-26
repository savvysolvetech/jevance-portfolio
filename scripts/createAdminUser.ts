import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJF8Up16Fs_gbIHMIevxaT3-rAYCtS5-w",
  authDomain: "jevance-portfolio-700d4.firebaseapp.com",
  projectId: "jevance-portfolio-700d4",
  storageBucket: "jevance-portfolio-700d4.firebasestorage.app",
  messagingSenderId: "394254467354",
  appId: "1:394254467354:web:d81b6e54e7e7727caeaca3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const EMAIL = "jevanceochieng@gmail.com";
const PASSWORD = "Jevance-MRF@2026";

async function main() {
  console.log(`Setting up Firebase Auth user for ${EMAIL}...`);
  try {
    const cred = await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
    console.log(`✓ Firebase Auth user ${EMAIL} already exists and logged in successfully!`);
    console.log(`User UID: ${cred.user.uid}`);
    process.exit(0);
  } catch (err: any) {
    if (err?.code === 'auth/user-not-found' || err?.code === 'auth/invalid-credential') {
      try {
        console.log(`Creating new Firebase Auth user ${EMAIL}...`);
        const cred = await createUserWithEmailAndPassword(auth, EMAIL, PASSWORD);
        if (cred.user) {
          await updateProfile(cred.user, { displayName: "Jevance Ochieng" });
        }
        console.log(`✓ Successfully created Firebase Auth user ${EMAIL}!`);
        console.log(`User UID: ${cred.user.uid}`);
        process.exit(0);
      } catch (createErr: any) {
        console.error("Error creating Firebase Auth user:", createErr);
        process.exit(1);
      }
    } else {
      console.error("Firebase Auth sign-in error:", err);
      process.exit(1);
    }
  }
}

main();
