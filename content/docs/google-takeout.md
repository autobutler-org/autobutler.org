---
title: Migrating from Google — Google Takeout Guide
description: How to export your data from Google and import it into AutoButler using Google Takeout
navigation:
  title: Google Takeout Guide
  order: 5
---

# Migrating from Google — Google Takeout Guide

Google Takeout lets you download a copy of everything you've stored with Google — your photos, Drive files, emails, and more. This guide walks you through exporting your Google data and importing it into AutoButler, where it lives **on your own hardware, on your own home network** — not on anyone else's server.

---

## Step 1: Request your Google Takeout export

1. Go to **[takeout.google.com](https://takeout.google.com)** (sign in if prompted)
2. You'll see a list of Google products. Deselect everything, then check only the ones you want:
   - **Google Photos** — your photos and videos
   - **Google Drive** — documents, spreadsheets, and files
   - (You can add others later — start small for your first export)
3. Click **Next step**
4. Under "Delivery method," choose **Send download link via email**
5. Set file type to **`.zip`** and choose a size — **2 GB** works well (larger sizes can be harder to upload)
6. Click **Create export**

Google will take anywhere from a few minutes to a few days to prepare your export, depending on how much data you have. You'll get an email when it's ready.

> **Heads up:** Large Google Photos libraries often split into multiple zip files (e.g. `takeout-20240101-001.zip`, `takeout-20240101-002.zip`). That's normal — just repeat the upload steps below for each one.

---

## Step 2: Download your export

When Google emails you that your export is ready:

1. Open the email from Google
2. Click the download link for each zip file
3. Save them somewhere you can find them (your Downloads folder works fine)

---

## Step 3: Upload to AutoButler

AutoButler runs on your home network — your files go from your computer directly to the device in your home, without passing through the internet or any cloud service.

1. Make sure you're connected to your home WiFi
2. Open AutoButler in your browser and navigate to **Files**
3. Create a folder for your Google data if you want to keep things organized (e.g. `Google Import`)
4. Navigate into that folder
5. Click **Upload** and select your Takeout zip file(s)
6. Wait for the upload to complete — large files may take a few minutes depending on your home network speed

> **Tip:** You can upload multiple zip files at once by selecting them all in the file picker.

---

## Step 4: Extract the contents

Once uploaded, your zip file is sitting in AutoButler but still compressed. To get your actual photos and files out:

1. Find the uploaded `.zip` file in the Files view
2. Right-click it (or tap the **⋮** menu)
3. Select **Extract here**
4. AutoButler will unpack the zip in place — this may take a moment for large archives

> **About Google Photos' nested structure:** Google Photos exports put your photos inside a folder called `Google Photos`, then inside year folders like `Photos from 2022`. Inside each year folder you'll find your photos alongside `.json` sidecar files containing metadata. The `.json` files are Google's metadata — you can keep them or delete them; your actual photos are the `.jpg`, `.heic`, `.mp4`, etc. files.

After extraction you can delete the original zip file to reclaim space.

---

## Step 5: Browse your files

Your photos and documents are now stored on **your device, in your home** — not on Google's servers, not on anyone else's. You can access them from any device connected to your home WiFi:

- Browse them in the **Files** section
- View photos in the **Photos** section (AutoButler automatically finds images in your files)
- Access them from any phone, tablet, or computer on your home network

---

## Tips

**Start with a small export first.** Export just one year of photos to get comfortable with the process before importing everything.

**Multiple zip files?** Upload and extract each one the same way. Google splits large libraries into separate zips — they all contain different files, so you want to import all of them.

**Zip inside a zip?** Google sometimes packages exports as a zip containing other zips. If you see nested zips after extracting, just extract those too — AutoButler handles zip extraction at any level.

**What about Google Docs files?** Google Docs, Sheets, and Slides export as Microsoft Office formats (`.docx`, `.xlsx`, `.pptx`) or as `.pdf`. They'll show up in your files just like any other document.

---

## What about other Google services?

This guide covers Photos and Drive, but Google Takeout supports many other products. Once you're comfortable with the process, you can also export:

- **Gmail** (as `.mbox` format) — email clients like Thunderbird can import these
- **Google Calendar** (as `.ics`) — most calendar apps can import these
- **YouTube** — your videos, watch history, and liked videos

AutoButler is primarily a file and photo manager, so the Photos and Drive exports are the most useful to store there directly.

---

*Need help? Visit the [support page](/support) or [community forums](/community).*
