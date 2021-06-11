<template>
  <div class="container">
    <a :href="url">{{ url }}</a>
    <Button @click="copy(url)">copy</Button>
  </div>
  <svg @click="close" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M20 20L4 4m16 0L4 20" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Button from "./Button.vue";
import copy from "copy-to-clipboard";

export default defineComponent({
  components: { Button },
  emits: ["close"],
  props: {
    url: { type: String as PropType<string> },
  },
  methods: { copy },
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  place-items: center;
  gap: 1rem;

  a {
    color: var(--light);
    text-decoration: none;

    border: 4px solid var(--medium);
    padding: 0.4rem 0;
    border-left: none;
    border-right: none;

    &:hover {
      filter: brightness(1.1);
    }
  }
}

svg {
  position: fixed;
  cursor: pointer;
  top: 1rem;
  left: 1rem;
  color: var(--light);
  width: 1.4rem;
  height: 1.4rem;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
