<template>
  <div class="card">
    <input
      type="text"
      placeholder="Paste URL here ..."
      :class="{ invalid: err }"
      @change="err = false"
      v-model="url"
    />
    <Button @click="handleShorten" :isLoading="loading" :disabled="loading">
      Shorten it!
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { isValidUrl } from "../../utils/isValidUrl";
import Button from "./Button.vue";

export default defineComponent({
  components: { Button },
  setup(_props, { emit }) {
    const url = ref<string>("");
    const err = ref<boolean>(false);
    const loading = ref<boolean>(false);

    const handleShorten = async () => {
      const isValid = isValidUrl(url.value);
      if (!isValid) {
        err.value = true;
      } else {
        try {
          loading.value = true;

          // generate short url with backend function
          const res = await fetch(`/shorten?url=${url.value}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          const { status, data } = await res.json();

          // if status is success, emit onShort event with id for short url
          if (status === "success") {
            emit("onShort", data.shortId);
            loading.value = false;
          }
        } catch (e) {
          err.value = true;
          loading.value = false;
          console.log(err);
        }
      }
    };

    return { url, err, loading, handleShorten };
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  place-items: center;
  gap: 1.4rem;

  width: 40vw;

  padding: 2rem;
  background: var(--dark);
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(136, 189, 188, 0.04);
  border-radius: 0.4rem;

  @media (max-width: 1000px) {
    width: 80vw;
  }
  @media (max-width: 400px) {
    width: 100vw;
    background: transparent;
    box-shadow: none;
    border: none;
  }
}

input {
  width: 100%;
  padding: 1rem 1.2rem;
  font-size: 1rem;
  background: var(--light);
  color: var(--dark);
  border-radius: 0.4rem;
  outline: none;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-out;
  font-weight: bold;

  &:focus {
    box-shadow: 0 0 0 4px var(--medium);
  }

  &::placeholder {
    color: var(--dark);
    font-weight: bold;
  }
}

.invalid {
  box-shadow: 0 0 0 4px rgb(226, 44, 44);
}
</style>
