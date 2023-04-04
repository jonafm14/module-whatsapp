require("dotenv").config();
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  Credential: applicationDefault(),
});

export const db = getFirestore();
