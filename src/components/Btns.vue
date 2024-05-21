<script setup lang="ts">
  const {pages, changeNumberPage, numberPage} = defineProps(['pages', 'changeNumberPage', 'numberPage']);

	function getActiveClass(numberPage: string, key: string): string {
		return numberPage === key ? 'btn-active' : '';
	};
</script>

<template>
	<div class="btns">
		<template v-for="(value, key) in pages" :key="key">
			<button class="btn" :class="getActiveClass(String(numberPage), String(key))" @click="changeNumberPage(key)" :to=key >{{key}}</button>
		</template>
	</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Btns',
  });
</script>