import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  initialProfile,
  initialExperience,
  initialEducation,
  initialSkills,
  initialProjects,
  initialCertifications,
  initialAchievements,
  initialReferees,
  initialDocument
} from '../src/data/initialData';

const firebaseConfig = {
  apiKey: "AIzaSyCJF8Up16Fs_gbIHMIevxaT3-rAYCtS5-w",
  authDomain: "jevance-portfolio-700d4.firebaseapp.com",
  projectId: "jevance-portfolio-700d4",
  storageBucket: "jevance-portfolio-700d4.firebasestorage.app",
  messagingSenderId: "394254467354",
  appId: "1:394254467354:web:d81b6e54e7e7727caeaca3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function seed() {
  console.log("Seeding Firestore database with initial portfolio data...\n");

  // Attempt authentication first if security rules require auth
  try {
    await signInAnonymously(auth);
    console.log("✓ Authenticated anonymously with Firebase Auth.");
  } catch (authErr: any) {
    try {
      await signInWithEmailAndPassword(auth, "jevanceochieng@gmail.com", "password123!");
      console.log("✓ Signed in as admin user.");
    } catch (signInErr: any) {
      try {
        await createUserWithEmailAndPassword(auth, "jevanceochieng@gmail.com", "password123!");
        console.log("✓ Created and signed in as admin user.");
      } catch (createErr) {
        console.log("Proceeding with write operations...");
      }
    }
  }

  try {
    // 1. Profile
    await setDoc(doc(db, 'profiles', initialProfile.id), initialProfile);
    console.log("✓ Seeded profile collection (1 document)");

    // 2. Experience
    for (const item of initialExperience) {
      await setDoc(doc(db, 'experience', item.id), item);
    }
    console.log(`✓ Seeded experience collection (${initialExperience.length} documents)`);

    // 3. Education
    for (const item of initialEducation) {
      await setDoc(doc(db, 'education', item.id), item);
    }
    console.log(`✓ Seeded education collection (${initialEducation.length} documents)`);

    // 4. Skills
    for (const item of initialSkills) {
      await setDoc(doc(db, 'skills', item.id), item);
    }
    console.log(`✓ Seeded skills collection (${initialSkills.length} documents)`);

    // 5. Projects
    for (const item of initialProjects) {
      await setDoc(doc(db, 'projects', item.id), item);
    }
    console.log(`✓ Seeded projects collection (${initialProjects.length} documents)`);

    // 6. Certifications
    for (const item of initialCertifications) {
      await setDoc(doc(db, 'certifications', item.id), item);
    }
    console.log(`✓ Seeded certifications collection (${initialCertifications.length} documents)`);

    // 7. Achievements
    for (const item of initialAchievements) {
      await setDoc(doc(db, 'achievements', item.id), item);
    }
    console.log(`✓ Seeded achievements collection (${initialAchievements.length} documents)`);

    // 8. Referees
    for (const item of initialReferees) {
      await setDoc(doc(db, 'referees', item.id), item);
    }
    console.log(`✓ Seeded referees collection (${initialReferees.length} documents)`);

    // 9. Documents
    await setDoc(doc(db, 'documents', initialDocument.id), initialDocument);
    console.log("✓ Seeded documents collection (1 document)");

    console.log("\nSuccessfully seeded initial data to Firestore database!");
    process.exit(0);
  } catch (error: any) {
    console.error("\nError seeding Firestore:", error);
    if (error?.code === 'permission-denied' || error?.toString()?.includes('PERMISSION_DENIED')) {
      console.log("\n-------------------------------------------------------------");
      console.log("FIRESTORE SECURITY RULES NOTICE:");
      console.log("Your Firestore database in Firebase Console is blocking write requests.");
      console.log("Please open Firebase Console -> Firestore Database -> Rules tab,");
      console.log("and temporarily set your rules to:");
      console.log("\nrules_version = '2';");
      console.log("service cloud.firestore {");
      console.log("  match /databases/{database}/documents {");
      console.log("    match /{document=**} {");
      console.log("      allow read, write: if true;");
      console.log("    }");
      console.log("  }");
      console.log("}");
      console.log("-------------------------------------------------------------\n");
    }
    process.exit(1);
  }
}

seed();
