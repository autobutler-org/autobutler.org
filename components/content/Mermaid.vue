<template>
  <div ref="el" class="mermaid-diagram" />
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots } from "vue";

const props = defineProps<{ code?: string }>();
const slots = useSlots();
const el = ref<HTMLElement | null>(null);

function extractText(vnodes: unknown[]): string {
  return vnodes
    .map((node: unknown) => {
      if (typeof node === "string") return node;
      if (node && typeof node === "object" && "children" in node) {
        const { children } = node as { children?: string | unknown[] };
        if (typeof children === "string") return children;
        if (Array.isArray(children)) return extractText(children);
      }
      return "";
    })
    .join("");
}

onMounted(async () => {
  let code = props.code;
  if (!code && slots.default) {
    const children = slots.default();
    code = extractText(children).trim();
  }
  if (!code || !el.value) return;

  const mermaid = (await import("mermaid")).default;
  // Diagrams follow the page theme, drawn in the site's ink and hairlines.
  // Mermaid needs literal colors, so read the resolved tokens.
  const token = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables: {
      fontFamily: token("--font-sans"),
      background: token("--color-surface"),
      primaryColor: token("--color-surface"),
      primaryTextColor: token("--color-text-strong"),
      primaryBorderColor: token("--color-border-strong"),
      lineColor: token("--color-text-muted"),
      secondaryColor: token("--color-surface-sunken"),
      tertiaryColor: token("--color-canvas"),
    },
  });

  const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);
  el.value.innerHTML = svg;
});
</script>

<style scoped>
.mermaid-diagram {
  display: flex;
  justify-content: center;
  margin: 0 0 1.5rem;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  overflow-x: auto;
}

.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
