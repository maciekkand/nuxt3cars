<template>
  <ul class="flex qjustify-center text-xl text-blue-600">
    <li class="ml-14">
      <NuxtLink to="/">
        Home
      </NuxtLink>
    </li>

    <li class="ml-6">
      <NuxtLink to="/AboutPage">
        About
      </NuxtLink>
    </li>
  </ul>

  <slot />
</template>
