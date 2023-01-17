<template>
  <h1 class="not-found text-9xl italic">404</h1>
  <h2 class="not-found text-4xl">{{  $t('notFound.title') }}</h2>
  <div class="w-fit mx-auto mt-10">
    <router-link
        to="/"
        class="back-btn">
      {{ $t('notFound.back') }}
    </router-link>
  </div>
</template>

<style scoped>
.not-found {
  @apply text-center font-bold leading-tight text-content;
}

.back-btn {
  @apply rounded-md border border-transparent px-5 py-3 text-base text-2xl
  font-medium leading-6 text-white transition-colors duration-150 ease-in-out focus:outline-1;
  background-color: var(--color-primary);
}

.back-btn:hover {
  background-color: var(--color-primary-light);
}

.back-btn:active, .back-btn:focus {
  background-color: var(--color-primary-dark);
}
</style>