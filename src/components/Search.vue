<script setup lang="ts">
import { toRefs } from 'vue';

  const props = defineProps(['lookingName', 'changeSearchName']);
  const { lookingName, changeSearchName } = toRefs(props);
</script>


<template>
	<input 
	  @input="changeSearchName"
		:value="lookingName"
		placeholder="firstname or lastname or title " 
		type="search"
	>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Search',
  });
</script>