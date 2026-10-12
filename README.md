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
2. Enable **Authentication > Sign-in method > Google**.
3. Create **Firestore** in production mode.
4. Deploy the rules: `firebase deploy --only firestore`.
5. Admin access goes to verified Google accounts listed in `ADMIN_EMAILS`, set in both `firestore.rules` and `src/lib/firebase/admin-auth.ts`. To add someone, add the email in both places and redeploy. A document at `admins/{UID}`, written from the Firebase console, also grants access.

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

Use the gear icon in the footer, or visit `/admin`, then continue with Google. Manage enquiries: filter by status or type, add private notes, reply by email, and delete. The **Settings** tab controls the availability badge in the hero.

## Security model

- Visitors create enquiries only. The Firestore rule checks every field, its type, and its length.
- Only the allowed Google accounts, or accounts listed in `admins/{uid}`, read, update, or delete enquiries.
- The Firebase web configuration is public by design. Access control sits in [`firestore.rules`](firestore.rules).
