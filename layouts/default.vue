<template>
  <div class="layout">
    <ButlerHeader />
    <div class="layout-main">
      <slot />
    </div>
    <ButlerFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-main {
  flex: 1;
}
</style>
