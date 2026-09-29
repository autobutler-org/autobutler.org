---
title: Your Whole Household, Not Just Your Files - v0.43
description:
  Everyone in the house gets an account, you can reach your files from the road, and two bigger things are in
  review right now.
date: 2026-09-29
author: AutoButler Team
---

Our last update was v0.35, three weeks ago. We are on v0.43.1 now, which is eight releases, and the honest summary is
that Quark stopped being a box that holds your files and started being something your whole household uses.

Here is what landed, and two things that have not landed yet but are close enough that you should know about them.

## Everyone in the house gets an account

This is the big one. Until now a Quark had one login, which is fine for a drawer of documents and useless for a family.

Now each person gets their own account and their own private space. You can share a folder with one person or with
everyone, and what you have not shared stays invisible. People can ask for an account and whoever set up the Quark
approves it. That admin can also create accounts directly, turn one off without deleting anything, or remove an account
without orphaning the files it owned.

If you already set up a Quark, you are the admin, and nothing you have changes.

## You can reach it from outside the house

We said this was coming for a while. It shipped in v0.43.0 on the 24th.

Remote access is off until an admin turns it on, and when it is on, your Quark and the devices you pair with it join one
small private network that belongs to your household alone. Traffic between them is encrypted the whole way. Each Quark
gets its own network, so households are never pooled together.

The distinction we care about: this is a private path to your own box, not a copy of your files on our hardware. We
still do not have your data. Turning it off again is one switch. And you do not need to be the admin to pair your own
phone.

## The app finds your Quark by itself

You used to have to type an address to connect. Now the phone and desktop apps look on your WiFi and list the Quarks
they find, and you pick yours. One less thing to write on a sticky note.

## Deleting is no longer permanent

Deletes go to a trash folder now, per person, and you can put them back. A misclick costs you ten seconds instead of a
photo.

## Search looks inside your files

Searching used to match file names. Now it also reads the contents of your documents and spreadsheets, so you can find
the thing you wrote without remembering what you called it.

## Video and audio

You can play what is on the drive in the browser, including audio files. Videos can be trimmed, you can pull a single
frame out and save it as a picture, and you can convert a file into a format your other devices will actually open.
Long conversions run in the background and there is a page that shows you how they are going.

## One page for the state of the machine

Storage devices, health readings and background jobs used to be three separate pages. They are one page called System
now, with tabs, and every tab has its own address so you can bookmark the one you check.

## Two things in review right now

Neither of these is in your hands yet. Both are written and being reviewed, and we would rather tell you what is
coming than let it show up unannounced.

**Chat.** Messaging for your household, encrypted end to end. The reason we are excited about this one is what it
proves. Your Quark stores the messages and cannot read them, and that is not a promise we are asking you to take on
trust, it is a property of where the keys live, which is on your devices and not on the box. Remove someone's access to
a conversation and the key for that conversation is replaced. Even the reactions are encrypted, so the Quark knows that
you reacted to a message and when, but not with what. Any other company can promise not to read your messages. We would
rather ship something that cannot.

**Calendar.** A shared calendar for the house, on your own hardware, with day, week and month views, repeating events
and reminders. Family calendars are one of the more revealing things people hand to an advertising company without
thinking about it.

Both will arrive labelled as beta, and chat has a switch that turns it off entirely if you would rather it not exist on
your Quark.

## The unglamorous half

We also spent this stretch on things nobody writes a blog post about: faster file listings, correct permissions for the
service on the device itself, a pile of interface fixes, and a long tail of small bugs in uploads, dialogs and
navigation. We replaced our dependency update tooling and split the test suites so our own builds stop wasting time.

---

That is v0.36 through v0.43.1. If something here is broken for you, or you want something we have not built, open an
issue on [GitHub](https://github.com/autobutler-org/quark/issues) and tell us. We read all of them.

Grace and peace.
