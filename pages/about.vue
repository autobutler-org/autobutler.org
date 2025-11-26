<template>
  <div class="landing-page">
    <div class="gradient-overlay" />
    <div class="card">
      <h1>About Us</h1>
      <img
        src="/assets/images/brandon-james-atlanta.jpeg"
        alt="Brandon and James in Atlanta"
        class="about-image"
      />
      <p>
        Autobutler is Brandon Apol, James Orson, and the host of people who help
        out with this.
      </p>
      <p>
        AutoButler started as a project to help Brandon's parents keep their
        data private. Rather than spending a ton of time setting up a finicky
        NAS or just paying the stupid subscription for Google Drive, Brandon and
        James recognized a need that they could help out with.
      </p>
      <NuxtLink to="/" class="btn">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style>
@import "@/assets/css/common.css";

.about-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem auto;
  display: block;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
