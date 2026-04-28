---
title: How AutoButler Works
description: >-
  How your files stay on your home network — no cloud required
navigation:
  title: How It Works
  order: 4
---

<!-- markdownlint-disable MD003 MD013 MD022 MD024 -->

# How AutoButler Works

AutoButler is a small device that sits on your home network and stores
your files on hard drives you own. Nothing leaves your house.

Here's what that looks like.

## Your files, your network

## ::mermaid

code: |
graph LR
Phone["📱 Your Phone"] -->|WiFi| Router["🏠 Home Router"]
Router --> Butler["🤖 AutoButler"]
Butler --> Drive["💾 Your Drive"]
Laptop["💻 Your Laptop"] -->|WiFi| Router
Tablet["📱 Tablet"] -->|WiFi| Router

---

::

Every device on your home WiFi can access AutoButler.
Your files are stored on the hard drive you plug in —
not on Google's servers, not on Apple's servers, not anywhere else.

## How this is different from iCloud or Google Photos

## ::mermaid

code: |
graph TD
subgraph cloud["❌ Cloud Storage — your data leaves home"]
P1["📱 Your Phone"] -->|Internet| CS["☁️ Google / Apple Servers"]
CS -->|Internet| P2["💻 Your Laptop"]
end
subgraph local["✅ AutoButler — your data stays home"]
P3["📱 Your Phone"] -->|Local WiFi| AB["🤖 AutoButler"]
AB --> D["💾 Your Drive"]
AB -->|Local WiFi| P4["💻 Your Laptop"]
end

---

::

With cloud storage, your photos and files travel over the internet
to a server you don't own. Every photo you take, every document you
save — it all goes to someone else's computer first.

With AutoButler, your files go straight to a device sitting in your
home. You own the hardware, you own the data.

## Accessing from outside your home (coming soon)

We're adding the ability to access your files from anywhere — at
work, traveling, or on your phone's data connection.

When you set up AutoButler, your phone and your device establish a
private, encrypted tunnel between them. This happens automatically —
you don't need to configure anything.

## ::mermaid

code: |
graph TD
Phone["📱 Your Phone\n(anywhere in the world)"]
Pi["🤖 AutoButler\n(at home)"]
Coord["AutoButler\nCoordination Server"]
Drive["💾 Your Drive"]
Phone <-->|"Encrypted direct tunnel"| Pi
Pi --- Drive
Phone -.->|"Connection setup only"| Coord
Coord -.->|"Connection setup only"| Pi

---

::

The coordination server only helps your phone and your AutoButler
find each other. Once they're connected, all your actual data travels
directly between them — encrypted, and never passing through our
servers.

Think of it like FaceTime — Apple helps your devices find each other,
but your actual call goes directly between them.

## What AutoButler stores

When you plug a drive into AutoButler, it organizes your files into a
simple structure:

- **Photos & Videos** — Synced from your phone or uploaded from your
  computer. Organized by date, easy to browse.
- **Documents** — PDFs, spreadsheets, notes — anything you want to
  keep safe on your own hardware.
- **Backups** — Back up one drive to another with a single tap, so
  you always have a second copy.
- **Books & Media** — Read EPUBs, watch videos, and browse your
  files from any device on your network.

Everything is stored in plain folders on your drive. No proprietary
format, no lock-in. If you ever want to unplug and move to something
else, your files are just files.
