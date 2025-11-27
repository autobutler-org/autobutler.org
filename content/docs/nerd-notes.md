---
title: Getting Started
description: Get up and running quickly with AutoButler
navigation:
  title: Getting Started
  order: 2
---

# Getting Started

This guide will help you get up and running quickly with your new device. Or, if you're a nerd like us, you can install the Autobutler software on whatever Unix-based device you'd like. 





## Quick Installation

To install autobutler, you simply need to download the binary for your hardware from
[our releases page](https://github.com/autobutler-org/autobutler.org/releases).

Once downloaded, you can extract the binary and run the `install` command with your
API key, and `sudo` privileges.

```bash
sudo /path/to/autobutler install 
```

If you wish to install it via `curl`, you can run the following command:

```bash
OS="$(uname -s)"
ARCH="$(uname -m)"
curl --fail -L \
  "https://github.com/exokomodo/autobutler.org/releases/latest/download/autobutler_${OS}_${ARCH}.tar.gz" | tar -xvz
sudo ./autobutler install
```

or if you prefer to use `wget`, you can run:

```bash
OS="$(uname -s)"
ARCH="$(uname -m)"
wget -qO- \
  "https://github.com/exokomodo/autobutler.org/releases/latest/download/autobutler_${OS}_${ARCH}.tar.gz" | tar -xvz
sudo ./autobutler install
```

Autobutler should now be running in the background, and you can check it out at [http://localhost:8081](http://localhost:8081).

## Next Steps

- Check out the [Help & Support](/docs/help) section for troubleshooting and community resources
