import { getApps, initializeApp, cert } from "firebase-admin/app";

// IMPORTANT: Replace with your service account credentials
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

if (!serviceAccount) {
  console.warn(
    "Firebase service account credentials not found. Firebase Admin SDK will not be initialized."
  );
}

const adminApp =
  getApps().find((app) => app.name === "admin") ||
  (serviceAccount
    ? initializeApp(
        {
          credential: cert(serviceAccount),
        },
        "admin"
      )
    : undefined);

export { adminApp };
