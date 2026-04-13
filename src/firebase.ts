import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDlGzEMhJwI0VONjAzIPRlr50kX67BOD5s',
  authDomain: 'cold-plan-app.firebaseapp.com',
  projectId: 'cold-plan-app',
  storageBucket: 'cold-plan-app.firebasestorage.app',
  messagingSenderId: '749091324260',
  appId: '1:749091324260:web:f197be27beeede51af3a71',
  measurementId: 'G-FXN0HR3GCF',
};

const app = initializeApp(firebaseConfig);

// Analytics — only init if supported (not in SSR, not blocked by ad blockers)
let analytics: ReturnType<typeof getAnalytics> | null = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

/**
 * Track a custom event. Safe to call even if analytics isn't loaded.
 */
export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
}

export { app, analytics };
