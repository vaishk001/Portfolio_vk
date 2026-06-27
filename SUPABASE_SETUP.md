# Deployed Portfolio Supabase Setup Guide

This guide will walk you through setting up a free Supabase account and database to power your live portfolio edits and cloud image storage.

---

## Step 1: Create a Supabase Account & Project
1. Go to [supabase.com](https://supabase.com) and click **Sign Up** (or login with GitHub).
2. Click **New Project** in your dashboard.
3. Choose a name (e.g. `personal-portfolio`), set a secure Database Password, and select the region closest to you.
4. Wait a couple of minutes for your database to provision.

---

## Step 2: Configure Environment Variables
1. Once your project is created, navigate to **Project Settings** (the gear icon on the bottom left sidebar) > **API**.
2. Copy your **Project URL** and your **anon public key**.
3. Create a `.env` file in the root of your code repository (copy it from `.env.example`) and fill in the values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. Restart your development server (`npm run dev`) so Vite loads the new variables.

---

## Step 3: Setup the Database Table
1. In your Supabase Dashboard, click on **SQL Editor** on the left menu.
2. Click **New Query** (or the "+ New Query" button).
3. Paste the following SQL script to create the table:

```sql
-- 1. Create the portfolio state table
create table public.portfolio_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.portfolio_state enable row level security;

-- 3. Create RLS Policies
-- Policy: Allow anyone (anonymous visitors) to read the portfolio data
create policy "Allow public read access"
on public.portfolio_state
for select
using (true);

-- Policy: Allow only authenticated users (You, the logged-in admin) to insert/update data
create policy "Allow authenticated insert/update"
on public.portfolio_state
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
```

4. Click **Run** on the bottom right. You should see "Success".

---

## Step 4: Setup Cloud Storage for Project Images
We need to create a storage bucket to host the images you upload so they are saved as clean URLs rather than large browser-crashing strings.

1. In your Supabase Dashboard, click on **Storage** (the bucket icon on the left menu).
2. Click **New Bucket**.
3. Name it exactly: `portfolio-assets`.
4. Turn **Public** to **ON** (so anyone visiting your portfolio can view the project screenshots).
5. Click **Save**.
6. **Set up RLS policies for storage** (this is vital to allow uploading):
   - Click on the new `portfolio-assets` bucket.
   - Click on **Policies** or **Set up RLS**.
   - Create a policy for **Upload/Insert**:
     - Choose **Target role**: `authenticated` (so only you can upload).
     - Give it a name like `Allow admin upload`.
     - Check **Upload** (or all write operations).
     - Save policy.
   - Create a policy for **Select**:
     - Choose **Target role**: `public` or `all` roles.
     - Allow read access (usually public bucket handles this, but creating a select policy allowing all to read ensures images render).

---

## Step 5: Register Yourself as the Admin User
To log in securely on `/vk-studio` using your email (`vnkumavat05@gmail.com`) and a password:

1. In your Supabase Dashboard, click on **Authentication** (the key icon on the left menu) > **Users**.
2. Click **Add User** > **Create User**.
3. Fill in:
   - **Email**: `vnkumavat05@gmail.com`
   - **Password**: (Set a strong secret password for yourself)
4. Uncheck **Auto-confirm User** or leave it checked. We recommend keeping it checked so you don't have to verify by email to get started.
5. Click **Create User**.

---

## Done! 🎉
Open your `/vk-studio` admin panel.
1. The login form will now ask for **Email** and **Password**.
2. Log in using `vnkumavat05@gmail.com` and the password you set in **Step 5**.
3. Now, whenever you save data or upload project images, everything will write directly to your live Supabase cloud database and storage bucket!
