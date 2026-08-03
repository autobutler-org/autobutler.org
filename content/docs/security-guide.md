---
title: Things You Should Know (Security Guide)
description: Practical security guidance for AutoButler owners — written in plain English, not jargon.
navigation:
  title: Security Guide
  order: 6
---

# Things You Should Know

AutoButler is designed so your files stay private by default. But "private by design" doesn't mean "impossible to lose." This page covers a handful of things every butler owner should do.

None of this is scary. You've probably done most of it already for other important things in your life.

---

## Your Master Password

The vault — where AutoButler stores sensitive things like credentials and recovery phrases — is encrypted with your master password. That encryption is done with Argon2id, a modern algorithm designed to be slow on purpose. Even if someone stole your butler's hard drive, cracking the vault would take them years of compute time if your password is reasonable.

**What makes a reasonable password:**

- At least 12 characters
- Not a dictionary word on its own
- Not something you've used elsewhere

A passphrase like `correct-horse-battery-staple` is better than `P@ssw0rd1` — longer beats cleverer.

**There is no "forgot password" button.** This is intentional. Your master password is never sent anywhere, never stored, and never recoverable by anyone — including us. If you forget it, the vault is gone. Write it down somewhere physical and store it safely.

---

## Your Recovery Phrase

When you first set up AutoButler, it gave you a 6-word recovery phrase. That phrase is your emergency key — it can unlock the vault if you forget your master password.

**What to do with it:**

- Write it on paper. Not a sticky note.
- Store it somewhere you'd store an important document — a fireproof box, a filing cabinet with a lock, or a safety deposit box.
- Do **not** store it in a Google Doc, Dropbox, or iCloud note. That defeats the purpose.
- Make sure your spouse or a trusted person knows where it is. If something happens to you, they'll need it.

You only see this phrase once. If you've lost it and still have your password, you can generate a new one in Settings → Security.

---

## The 3-2-1 Backup Rule

AutoButler stores your files. But AutoButler is a physical device that can fail, flood, or burn.

The 3-2-1 rule is simple:

- **3** copies of your data
- **2** different storage types (e.g., the butler's internal drive + an external USB drive)
- **1** offsite copy (e.g., a hard drive at a relative's house)

AutoButler helps with the first two: it can mirror your files to an attached external drive automatically. The third copy is on you. A USB drive at your parents' house that you swap out once a month is enough.

There is no backup strategy that can save you from *no backup at all.*

---

## Physical Security

Your butler is a small computer that holds your files. Treat it accordingly.

**Where to put it:**

- Inside your home, not in an unheated garage or shed where it can overheat or freeze
- Off the floor — water and flooding are real risks
- Out of sight if possible — you don't need to advertise that there's a storage device on your network

**Your backup drives:**

- Don't keep your only backup drive right next to the butler. If there's a fire or a break-in, you lose both.
- A fireproof bag or small safe is a worthwhile investment for a drive holding years of family photos.

---

## Network Security

AutoButler runs on your local network. It does not need the public internet to function, and by default it's not reachable from outside your home.

**What this means in practice:**

- Someone sitting at a coffee shop cannot reach your butler.
- Your ISP cannot see your files (they flow entirely on your local network).
- The butler doesn't "call home" to any AutoButler servers. Our code is public if you want to verify.

**What you need to do:**

- Password-protect your WiFi with WPA2 or WPA3. If it's still open, fix that first.
- Don't give your WiFi password to people you don't trust.
- If you enable remote access via Tailscale, treat your Tailscale account as carefully as your AutoButler password — it's the key to your network.

---

## Estate Planning

If something happens to you, can your family access the files you've stored?

Consider:

1. **Writing down** your AutoButler login and master password (or recovery phrase) and storing them with your important documents — will, insurance policies, that kind of thing.
2. **Telling a trusted person** where the butler is, what it does, and where the login info is stored.
3. **AutoButler's trusted contact feature** (coming soon) will let you designate someone who can request access after a configurable waiting period.

This isn't morbid — it's the same reason you keep a spare key with a neighbor.

---

## If You Think Your Device Was Compromised

If you suspect someone unauthorized has accessed your butler:

1. **Change your password immediately.** Go to Settings → Security → Change Password.
2. **Review active sessions.** Settings → Security → Sessions shows every device currently logged in. Revoke anything you don't recognize.
3. **Rotate your API tokens** if you use them.
4. **Change your WiFi password** if you suspect your network was the entry point.
5. **Review your files** for anything unexpected — deletions, new folders, modified timestamps.

If you use Tailscale for remote access, also rotate your Tailscale auth keys and remove any unrecognized nodes from your tailnet.

---

## What AutoButler Does Not Do

To be direct about the limits:

- **It doesn't scan for viruses or malware** in your uploaded files. It stores what you give it.
- **It doesn't protect against physical theft** of the device — if someone takes the hardware, encryption protects the vault, but your files are readable unless you've enabled per-file encryption (a future feature).
- **It doesn't protect you if your WiFi password is compromised.** Someone on your network can reach the butler. The password prompt protects specific sensitive areas, but not file browsing.

Knowing the limits helps you make good decisions about what you store and how.

---

## The Short Version

1. Pick a strong master password. Write it down. Store it safely.
2. Keep your recovery phrase somewhere physical and fireproof.
3. Set up an external backup drive. Swap it out periodically.
4. Use WPA2/WPA3 on your WiFi.
5. Tell someone you trust how to access things if you can't.

That's it. AutoButler handles the rest.
