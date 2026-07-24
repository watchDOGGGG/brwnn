# BRWNN — Move. Laugh. Thrive.

React + Vite + Tailwind site for BRWNN (Black Resilient Women in Nature
Network): public marketing pages plus a member portal behind login.

## Setup

```bash
npm install
cp .env.example .env   # then fill in the real values below
npm run dev
```

### Supabase (auth)

1. Create a project at [supabase.com](https://supabase.com).
2. Project Settings → API → copy the **Project URL** and **anon public key**
   into `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Authentication → Providers → Email — on by default, that's all this app
   uses (no extra config needed).
4. Authentication → Sign In / Providers → toggle **"Confirm email"** off if
   you want new signups to log straight into the dashboard instead of
   waiting on a confirmation email (the app handles either setting — with
   it left on, new users see a "check your email" screen after signing up).

Profile fields (name, bio, location, avatar) are stored in Supabase Auth's
`user_metadata` — no extra database table needed for this app's current
features.

### Cloudinary (image uploads)

Used for the profile photo upload in the member dashboard.

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Copy your **Cloud name** from the dashboard into
   `VITE_CLOUDINARY_CLOUD_NAME`.
3. Settings → Upload → Upload presets → **Add upload preset** → set
   **Signing Mode** to **Unsigned** → save, then copy its name into
   `VITE_CLOUDINARY_UPLOAD_PRESET`.

Without these two Cloudinary vars set, everything else in the app still
works — only the avatar upload button will show a config error.

## Real campaign photos

Drop additional/replacement photos in `public/images/` using the existing
filenames (see that folder, and `scripts/process-images.cjs` if you want to
batch-resize new source photos the same way the current ones were processed).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
