<template>
  <template v-if="shortUrl">
    <UrlCard :url="shortUrl" @onClose="hideUrlCard" />
  </template>
  <FormCard v-else @onShort="handler" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormCard from "./components/FormCard.vue";
import UrlCard from "./components/UrlCard.vue";

export default defineComponent({
  name: "App",
  components: { FormCard, UrlCard },
  setup() {
    const shortUrl = ref<string | null>(null);

    const handler = (shortId: string) => {
      shortUrl.value = `${window.location.origin}/u/${shortId}`;
    };

    const hideUrlCard = () => {
      shortUrl.value = null;
    };

    return { shortUrl, hideUrlCard, handler };
  },
});
</script>

<style>
:root {
  --dark: #112d32;
  --medium: #254e58;
  --medium-2: #1a363d;
  --light: #96cecd;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}

body {
  background: var(--dark);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
