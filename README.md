# Fauwzziyyah Umar: professional profile website

Source for [fauwzziyyah.web.app](https://fauwzziyyah.web.app). A single-page profile with a private admin inbox for enquiries.

## Stack

- Next.js 16 (App Router) with static export, TypeScript, Tailwind CSS 4
- Firebase Hosting, Cloud Firestore, and Firebase Authentication on the free Spark plan
- GitHub Actions for build and deploy on each push to `main`

All public copy lives in [`src/content/profile.ts`](src/content/profile.ts). Edit that file to change text, roles, figures, or links.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the Firebase web app values
npm run dev                  # http://localhost:3000
```

Without `.env.local` the site still renders. The contact form shows a preview notice and the admin page explains the missing setup.

## Firebase setup (one time)

1. In the Firebase console for project `fauwzziyyah`, add a **Web app** and copy its configuration into `.env.local`.
2. Enable **Authentication > Sign-in method > Email/Password**.
3. Create **Firestore** in production mode.
4. Deploy the rules: `firebase deploy --only firestore`.
5. Create the admin user under **Authentication > Users**, copy the user's UID, then add a Firestore document at `admins/{UID}` with a field `email` (string). Only this collection grants admin access, and no browser writes to it.

## Deploy

Manual:

```bash
npm run build
firebase deploy --only hosting,firestore
```

Automatic: the workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`. Add these repository secrets under **Settings > Secrets and variables > Actions**:

| Secret | Value |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | JSON key of a service account with the Firebase Hosting Admin role |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | From the web app configuration |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | From the web app configuration |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | From the web app configuration |

## Admin

Visit `/admin`, sign in, and manage enquiries: filter by status or type, add private notes, reply by email, and delete. The **Settings** tab controls the availability badge in the hero.

## Security model

- Visitors create enquiries only. The Firestore rule checks every field, its type, and its length.
- Only accounts listed in `admins/{uid}` read, update, or delete enquiries.
- The Firebase web configuration is public by design. Access control sits in [`firestore.rules`](firestore.rules).
