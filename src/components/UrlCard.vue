<template>
  <div class="container">
    <a :href="url">{{ url }}</a>
    <Button @click="handleCopy">
      <div v-if="copied" class="copiedContainer">
        <span>copied</span>
        <svg
          class="okIcon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M4 12l6 6L20 6" />
        </svg>
      </div>
      <template v-else>copy</template>
    </Button>
  </div>
  <svg
    @click="onClose"
    viewBox="0 0 24 24"
    stroke="currentColor"
    class="closeIcon"
  >
    <path d="M20 20L4 4m16 0L4 20" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Button from "./Button.vue";
import copy from "copy-to-clipboard";

export default defineComponent({
  components: { Button },
  props: {
    url: { type: String as PropType<string>, required: true },
  },
  setup(props, { emit }) {
    const copied = ref<boolean>(false);

    const handleCopy = () => {
      copy(props.url);
      copied.value = true;
    };

    const onClose = () => {
      emit("onClose");
    };

    return { onClose, handleCopy, copied };
  },
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

.copiedContainer {
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-right: 0.6rem;
  }

  .okIcon {
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 4;
    display: block;
    width: 1rem;
    height: 1rem;
  }
}

.closeIcon {
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
