---
title: Why Quark Is Dropping ffmpeg
description: What we learned about video codec patents while building sprocket, and why Quark will make thumbnails on your phone instead of on the device.
date: 2026-09-24
author: James Orson
---

Hello friends! This one is more technical than usual. It's about video, patents, and a few hundred megabytes that are
about to disappear from [Quark](https://quark.autobutler.org).

## What Quark Does With Video Today

Quark is a personal cloud that lives in your home, and you buy it once. When you upload a video, the device makes a
thumbnail, reads details like the length and resolution, and can trim a clip or convert it to another format. Until
now, all of that ran through [ffmpeg](https://ffmpeg.org), the open-source tool that sits underneath a surprising amount
of the world's video software.

iPhone photos have their own wrinkle. They're saved as HEIC, and the device decoded them with
[libheif](https://github.com/strukturag/libheif) (through the Go package [gen2brain/heic](https://github.com/gen2brain/heic))
to make thumbnails and previews.

Both work well. We didn't set out to replace either one.

## How Sprocket Started

We started [sprocket](https://github.com/autobutler-org/sprocket) to make Quark smaller and simpler. It's a Go library,
free under the MIT No Attribution license, that probes, thumbnails, trims, and remuxes video with no cgo and no ffmpeg.
"Remux" means moving the audio and video out of one container, like MKV, and into another, like MP4, without touching
the picture itself.

Thumbnails are the hard part. To make one, you have to decode at least one frame, and most of the video on your phone is
H.264 or HEVC (also called H.265). So we had to decide how sprocket would decode those, and that question sent us
reading about patents. Privately, we have been calling what followed "the licensing debacle."

Before going further: we are not lawyers, and this is not legal advice. It's what we read and what we did about it.

## What the Patent Pools Count

H.264 and HEVC are covered by patents held by many different companies. Rather than negotiate with each one,
products can license them through a pool. For H.264, that's [Via LA's AVC program](https://www.via-la.com/licensing-2/avc-h-264/)
(AVC is another name for H.264).

The pool counts units, and a product that ships a decoder is a unit, at the same rate as an encoder. Via LA's
[published fee schedule](https://www.via-la.com/licensing-2/avc-h-264/) makes the first 100,000 units a company ships
each year free, then charges $0.20 per unit up to 5,000,000 units and $0.10 per unit above that, with an annual cap of
$9.75 million. The free tier is generous, but it's still a license. You sign it either way.

HEVC is licensed separately, through more than one pool, including Via LA's HEVC program and
[Access Advance](https://accessadvance.com). We haven't worked through those numbers, so we won't quote any here.

## When the Patents Run Out

Most of the AVC patents were filed in 2002 and 2003, and patents run about 20 years from filing, so most of the pool
expired around 2022 and 2023. Most, not all. Via LA's
[current list of active AVC patents](https://www.via-la.com/wp-content/uploads/2026/09/Final-Aug.-1-2026-AVC-Active-Attachment-1.pdf)
still includes a Siemens patent mapped to core decoding, [US 9,356,620](https://patents.google.com/patent/US9356620B2/en),
which runs until November 26, 2030 in the US thanks to patent term adjustment.

HEVC was standardized in 2013, a decade after H.264, so its patents have a later clock, too.

## Writing Our Own Decoder Doesn't Help

The obvious workaround is to write the decoder ourselves. Sprocket is our own Go code, after all. But that answers the
wrong question. Copyright covers code; patents cover the method. Any decoder that correctly decodes H.264 practices the
patents essential to H.264, no matter who wrote it or what language it's in. Writing our own only changed who holds the
copyright, and the MIT No Attribution license settles that part.

The other well-known route is Cisco's [openh264](https://www.openh264.org/faq.html). Cisco pays the royalty for the
binary that Cisco builds and distributes, which the end device downloads separately. A copy you build yourself,
including a WebAssembly build, isn't covered by Cisco's
[binary license](https://www.openh264.org/BINARY_LICENSE.txt). It's a generous arrangement, but it doesn't cover a
decoder we'd compile into Quark ourselves.

## What We Did Instead

Sprocket's H.264 and HEVC decoders sit behind Go build tags (`h264` and `hevc`) that Quark doesn't use. A default build
of sprocket decodes only royalty-free codecs, AV1 and VP8. Probing, trimming, and remuxing don't decode anything at
all; they move bytes from one container to another.

Thumbnails move to where decoders already live. Your phone has them: iOS and Android ship platform decoders, licensed by
Apple and Google. So the Quark app will make the thumbnail, and the HEIC preview, on your phone or in your browser,
upload it along with the file, and the device will just store it. ffmpeg comes off the device entirely, and it takes a
few hundred megabytes of the device's software image with it. We're tracking that work in
[quark#2378](https://github.com/autobutler-org/quark/issues/2378).

The result is that the device we sell ships no H.264 or HEVC decoder. That's what the design does, and that's all
we're claiming for it.

## What You Give Up

A few things get worse, and we'd rather say so up front.

- Converting a video becomes container conversion only. Quark can turn an MKV into an MP4, but it can't shrink a video
  or re-encode it.
- HEIC photos uploaded from Chrome or Firefox won't get a preview, because those browsers can't decode HEIC.
- Older formats like AVI, WMV, FLV, OGV, and MPEG drop off the conversion list.

"Save frame" survives. It moves into the app and grabs the exact frame from the player.

## What You Get

A smaller, simpler device. Thumbnails that show up as soon as an upload finishes, because they arrive with the file
instead of being made afterward. Less work for the device, which leaves more of it for everything else.

It's quicker, too. In sprocket's
[performance runs against ffmpeg](https://github.com/autobutler-org/sprocket/actions/workflows/perf.yml) on Linux,
probing a file is 10 to 16 times faster, and remuxing and trimming are 3 to 6 times faster. Thumbnails are faster for
most codecs, though converting MPEG-TS to MP4 is currently slower.

If you're building something with video and run into the same questions, sprocket is open source, and we'd love to hear
from you. Feel free to reach out anytime.

Grace and peace,
James
