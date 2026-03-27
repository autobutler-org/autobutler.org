---
title: Help & Support
description: Get help and support for AutoButler
navigation:
  title: Help
  order: 3
---

# Help & Support

---

## Troubleshooting

### I can't reach AutoButler in my browser

- Make sure the device running AutoButler is powered on
- Make sure you're on the same WiFi network as the AutoButler device
- Try `http://autobutler.home.local` — if you changed the hostname during setup, use that instead
- Try restarting your router and the AutoButler device

### I'm getting an error when I try to install AutoButler

Make sure you're using the installer for your operating system and architecture. The [nerd notes](/docs/nerd-notes) page has installation details. If you're still stuck, [open a GitHub issue](https://github.com/autobutler-org/autobutler/issues) and someone will help.

### AutoButler doesn't work with my VPN

This is expected. AutoButler runs entirely on your local network — connecting through a VPN routes traffic outside your home, so the two conflict. Disable your VPN when accessing AutoButler on your home network. (We're working on built-in remote access so you won't need a third-party VPN to reach your butler from outside your home.)

### I'm having performance issues

1. Check the **Health** page in AutoButler — high disk usage or high temperatures can cause slowdowns
2. In Settings, click **Export Performance Metrics** — this saves recent health data to a `metrics.sqlite` file
3. Share that file in a [GitHub issue](https://github.com/autobutler-org/autobutler/issues) or email it to [support@autobutler.org](mailto:support@autobutler.org) and we'll take a look

### My files aren't showing up after I uploaded them

Try refreshing the page. If they still don't appear, check that your upload completed successfully (the progress indicator should have reached 100%). Very large files can take a minute.

---

## Get Help

**GitHub Issues** for questions, bug reports, and feature requests:
→ [github.com/autobutler-org/autobutler/issues](https://github.com/autobutler-org/autobutler/issues)

**Email** for private matters:
→ [support@autobutler.org](mailto:support@autobutler.org)
