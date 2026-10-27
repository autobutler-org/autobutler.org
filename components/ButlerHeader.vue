<template>
  <header class="masthead">
    <div class="bar">
      <NuxtLink to="/" class="wordmark">
        <img
          class="mark"
          src="/android-chrome-192x192.png"
          alt=""
          width="192"
          height="192"
        />
        AutoButler
      </NuxtLink>
      <nav id="site-nav" aria-label="Site" :class="{ open: menuOpen }">
        <!-- Single forward to the Quark product site — only one product exists today.
             Revert to a "Products" dropdown when a second product ships, see #121. -->
        <a href="https://quark.autobutler.org" @click="closeMenu">Quark</a>
        <a href="https://quark.autobutler.org/support" @click="closeMenu"
          >Support</a
        >
        <NuxtLink to="/community" @click="closeMenu">Community</NuxtLink>
        <NuxtLink to="/blogs" @click="closeMenu">Blog</NuxtLink>
        <NuxtLink to="/about" @click="closeMenu">About</NuxtLink>
      </nav>
      <div class="end">
        <NuxtLink to="/waitlist" class="cta" @click="closeMenu"
          >Sign Up</NuxtLink
        >
        <button
          type="button"
          class="menu-toggle"
          aria-label="Menu"
          aria-controls="site-nav"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const menuOpen = ref(false);

const closeMenu = () => {
  menuOpen.value = false;
};

const closeOnEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeMenu();
};

onMounted(() => document.addEventListener("keydown", closeOnEscape));
onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
</script>

<style scoped>
.masthead {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-canvas-veil);
  -webkit-backdrop-filter: saturate(1.4) blur(12px);
  backdrop-filter: saturate(1.4) blur(12px);
}

.bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: var(--content-width);
  height: var(--header-height);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: var(--tracking-snug);
  color: var(--color-text-strong);
  text-decoration: none;
}

/* The icon is a circle on an opaque square; clip to the circle. */
.mark {
  width: 1.5rem;
  height: auto;
  border-radius: 50%;
}

nav {
  display: flex;
  gap: 1.75rem;
  margin-right: auto;
  font-size: var(--text-small);
}

nav a {
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}

nav a:hover,
nav a.router-link-active {
  color: var(--color-text-strong);
}

.end {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cta {
  display: inline-flex;
  align-items: center;
  height: 2.25rem;
  padding: 0 1rem;
  border-radius: var(--radius-md);
  background: var(--color-ink);
  color: var(--color-on-ink);
  font-size: var(--text-small);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color var(--duration-fast) ease,
    transform var(--duration-fast) var(--ease-out);
}

.cta:hover {
  background: var(--color-ink-hover);
}

.cta:active {
  transform: var(--press);
}

.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  cursor: pointer;
}

.menu-icon,
.menu-icon::before {
  display: block;
  width: 0.95rem;
  height: 1.5px;
  background: var(--color-text-strong);
}

.menu-icon {
  position: relative;
  top: -0.15rem;
}

.menu-icon::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.35rem;
}

@media (max-width: 760px) {
  .bar {
    justify-content: space-between;
  }

  .menu-toggle {
    display: flex;
  }

  nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    margin: 0;
    padding: 0.5rem var(--gutter) 1rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-canvas);
    font-size: var(--text-body);
  }

  nav.open {
    display: flex;
  }

  nav a {
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-strong);
  }

  nav a:last-child {
    border-bottom: none;
  }
}
</style>
