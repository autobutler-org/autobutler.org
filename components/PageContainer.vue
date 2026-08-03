<template>
  <div class="page-wrapper">
    <div class="gradient-overlay" />
    <div class="content-card">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  left: 0;
  right: 0;
}

.gradient-overlay {
  /* position: absolute so the overlay is scoped to .page-wrapper.
     Using position: fixed here caused the overlay to cover viewport-relative
     coordinates regardless of scroll position, which stacked on top of
     scrolled-past content and produced the visual element-duplication
     reported in #91. */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a1a1a, #232323);
  pointer-events: none;
  z-index: -1;
}

.content-card {
  background: rgba(28, 32, 34, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 0;
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 0;
  }

  .content-card {
    padding: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
}
</style>
