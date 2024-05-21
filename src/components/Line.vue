<script setup lang="ts">
	const {
		id, 
		picture, 
		name, 
		gender, 
		location, 
		dob, 
		email, 
		phone
	} = defineProps(['id', 'picture', 'name', 'gender', 'location', 'dob', 'email', 'phone']);
</script>


<template :key="id">
	<div class="table_item">
		<div class="item_avatar">
			<img :src="picture.large" alt="user avatar">
		</div>
		<div class="item_fullname">{{name.title + " " + name.first + " " + name.last}}</div>
		<div class="item_gender"  >{{gender}}</div>
		<div class="item_country" >{{location.country}}</div>
		<div class="item_bithday" >{{

      new Date(dob.date).getFullYear() + " " +
			new Date(dob.date).getMonth() + " " +
			new Date(dob.date).getDate()


		}}</div>
		<div class="item_email"  >{{email}}</div>
		<div class="item_phone"  >{{phone}}</div>
	</div>
</template>


<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Line',
  });
</script>