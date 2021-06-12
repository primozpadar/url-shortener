<template>
  <button>
    <LoaderCSS v-if="isLoading" />
    <slot v-else />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import LoaderCSS from "./LoaderCSS.vue";

export default defineComponent({
  components: { LoaderCSS },
  props: {
    isLoading: { type: Boolean as PropType<boolean>, required: false },
  },
});
</script>

<style lang="scss" scoped>
button {
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 0.9rem;

  border-radius: 0.4rem;
  background: var(--medium);
  color: var(--light);
  padding: 0.8rem 2.6rem;

  outline: none;
  transition: box-shadow 0.2s ease-out, padding 0.2s ease-out;

  &:not([disabled]) {
    cursor: pointer;

    &:focus,
    &:hover {
      box-shadow: 0 0 0 4px var(--medium-2);
    }

    &:hover {
      padding: 0.8rem 2rem;
    }

    &:active {
      filter: brightness(1.05);
    }
  }

  &:disabled {
    filter: saturate(0.9);
    cursor: progress;
  }
}
</style>
