<template>
  <div class="loader" />
</template>

<style lang="scss" scoped>
.loader {
  position: relative;
  border: 2px solid var(--dark);
  border-left: 2px solid var(--light);
  animation: loaderRotate 1.1s infinite linear;

  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
}

@keyframes loaderRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
