---
title: We've Been Quiet, But We Haven't Been Idle - v0.35
description:
  A non-technical rundown of everything we've shipped since our last update — faster file handling, a password vault,
  real search, and yes, we're finally on your phone.
date: 2026-09-07
author: Brandon Apol
---

Hey folks. It's been a minute since we've written one of these. Not because we stopped working — actually the opposite.
We got heads-down for a few months and just built, and then looked up and realized we owed you an update. So here it is:
everything worth knowing about since our last post back in April, in plain English, no engineering degree required.

Quick note before we dive in: the device is now renamed to Quark.

## We Rebuilt the Plumbing

The biggest thing we did this stretch, you'll never actually see directly, and that's kind of the point. Underneath
Quark, there's a layer that decides how files actually get read from and written to your disk. We rewrote that whole
thing from the ground up, piece by piece, over about two months. Think of it like replacing the pipes in your house
while the water is still running — boring to describe, but everything downstream (photos loading, files downloading,
folders opening) is faster and more dependable because of it.

Some of what that unlocked directly: you can now pause partway through downloading a big file and pick it back up later
instead of starting over, big files stream instead of getting fully loaded into memory first (so things don't choke),
and deleted files now go to a trash folder instead of vanishing immediately, in case you change your mind.

## Photos and Files Got Smarter

- We added support for more file types — RAW camera photos, audio files, WebP/GIF/BMP/TIFF images, and a generic viewer
  for anything else so you're never just staring at an error.
- Videos now get thumbnails, and you can trim them or grab a still frame right from the viewer.
- We built duplicate photo detection, so if you've got the same picture saved three times from three different backups,
  we can tell you.
- The photo viewer now loads the next few pictures ahead of time, so flipping through your library feels instant instead
  of laggy.

## Search That Actually Finds Things

You can now search inside the contents of your documents and spreadsheets, not just file names. There's also a proper
find bar (Ctrl+F or Cmd+F) inside documents now, like you'd expect from any real editor.

## Locking Things Down

This one's less flashy but it matters: we upgraded the encryption used when your data moves around your network, added
proper session management (so you can see what's logged in and kick anything you don't recognize), and built out an
admin system so the first person who sets up a Quark automatically becomes the admin, with proper controls from there.
We also patched a handful of security issues quickly as we found them — nothing that affected anyone, just good hygiene.

## A Password Vault

We shipped a first version of a password vault — a private, encrypted place to store your passwords, built the same way
as everything else here: it lives on your Quark, not on someone else's server. You can import and export your existing
passwords too.

## We're On Your Phone Now

This is probably the one you'll actually notice: we've built a real app for iOS and Android. It's not on the App Store
or Google Play yet — it's still in testing — but if you want to try it out early, reach out and we'll see if your setup
is a fit.

## Backups

We also laid the groundwork for real backup support, so your data isn't just local, it's protected from the "oops, the
hard drive died" scenario too. More to come here.

## The Boring but Important Stuff

We fixed a long list of smaller things: folder uploads that weren't working right, navigation that could hang, dialogs
that looked broken on certain screens, and a few spots where we were being sloppier with memory and performance than we
should've been. None of it is exciting to read about, but it all adds up to a product that just works better day to day.

---

That's the recap. We know we went quiet for a while, and that's on us — we'd rather ship than narrate, but we hear you
that you want to know what's happening under the hood too. We'll try to close that gap going forward. As always, if
something's bugging you or you want to see something built, open a GitHub issue and tell us. Stay rad, and we'll see you
in the next update.

Grace and peace, Brandon
