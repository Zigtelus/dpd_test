<script setup lang="ts">
  // modules
  import { useRoute, useRouter } from "vue-router";

  const { filters } = defineProps(['filters']);

	const route = useRoute();
	const router = useRouter();

  function chengeSort(key: string) {
		const {name, numberPage} = route.query;

		const query = {
			numberPage,
			[key]: route.query[key] === 'hight' ? 'low' : 'hight'
		};

		if (name) query.name = name;
		
		router.push({ query});
	}
	
</script>


<template>
	<div class="header">
			<div class="header_item header-photo">PHOTO  </div>
			<template v-for="key in Object.keys(filters)" :key="key">
				<div @click="chengeSort(key)" :class="!!filters[key] ? 'header_item active' : 'header_item'" >
					 {{key.toUpperCase()}}
					
          <span v-if="filters[key] === 'hight'">↑</span>
          <span v-else-if="filters[key] === 'low'">↓</span>
				</div>
			</template>
	  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Headers',
  });
</script>