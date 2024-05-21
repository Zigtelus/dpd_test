<script setup lang="ts">
  // modules 
  import { ref, toRef, watch } from 'vue';
  import { useRoute, useRouter, RouterView } from "vue-router";

  // types
  import type { RouteLocationNormalizedLoaded } from 'vue-router';

  // components
  import Search from './components/Search.vue';

  interface InputFileEvent extends Event {
    target: HTMLInputElement;
  };

  const route: RouteLocationNormalizedLoaded = useRoute();
	const router = useRouter();
  const lookingName = ref<string>(route.query.name as string || '');

  watch(() => route.query.name, (newName) => {
    lookingName.value = typeof newName === 'string' ? newName : '';
  });

  function changeSearchName(e: InputFileEvent) {
    const name = e.target.value?.trim();

    const query = {
      ...route.query,
      numberPage: 1,
      name
    } as { numberPage: number; name?: string };;

    if (!name) delete query.name;

    lookingName.value = name;

    // каждый новый символ преключает на первую страницу
    router.push({ query });
  };
</script>

<template>
  <Search :lookingName="lookingName" :changeSearchName="changeSearchName"/>
  <RouterView :lookingName="lookingName"/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
  });
</script>