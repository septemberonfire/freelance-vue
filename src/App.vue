<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <Suspense>
    <router-view />
  </Suspense>
  </div>
</template>

<script lang="ts">
import TheNavbar from "./components/TheNavbar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TheNavbar,
  },
});
</script>

<style></style>
