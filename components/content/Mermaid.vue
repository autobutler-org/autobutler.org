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
    .map((node: { children?: string | unknown[] }) => {
      if (typeof node === "string") return node;
      if (node?.children) {
        if (typeof node.children === "string") return node.children;
        if (Array.isArray(node.children)) return extractText(node.children);
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
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    themeVariables: {
      primaryColor: "#1a1a2e",
      primaryTextColor: "#ffffff",
      primaryBorderColor: "#20b2aa",
      lineColor: "#20b2aa",
      secondaryColor: "#2d2d2d",
      tertiaryColor: "#1a1a2e",
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
  margin: 2rem 0;
}

.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
