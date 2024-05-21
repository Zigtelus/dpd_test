<script setup lang="ts">
  // modules
  import { toRefs, ref, computed, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";

  // data
	//@ts-ignore
  import data from "@/assets/api.json";

	// types
	import type { IUser } from "../types/main";

	// components
  import Line from "../components/Line.vue";
  import Btns from "../components/Btns.vue";
  import Headers from "../components/Headers.vue";


  // Props
  const props = defineProps(['lookingName']);
  const { lookingName } = toRefs(props);

  // Vue Router
  const route = useRoute();
	const router = useRouter();

	const results = data.results as IUser[];

	const numberPageRef = ref<string>(route.query.numberPage as string);

	if (!numberPageRef.value) {
		router.push({ query: {numberPage: 1}});

		numberPageRef.value = String(1);
	}

  const filterKeys = ['fullname', 'gender', 'country', 'phone', 'email', 'bithday'];

  const filters = ref(Object.fromEntries(filterKeys.map(key => [key, route.query[key] || ''])));

  // Обновление фильтров при изменении маршрута
  router.afterEach(() => {
    Object.keys(filters.value).forEach(key => {
      filters.value[key] = route.query[key] || '';
    });
  });

	// разбивка юзеров на страницы

	interface IGetListPages {
		[key: number]: IUser[];
	}

	function getListPages(data: IUser[]): IGetListPages {
		return data.reduce((acum: IGetListPages, item: IUser, index: number)=> {
      const pageIndex = Math.ceil((index + 1) / 20);
      if (!acum[pageIndex]) {
        acum[pageIndex] = [];
      };

      acum[pageIndex].push(item);
      return acum;
	  }, {});
	}

	// список юзуеров после филтров
	const searchUsers = computed(() => {

	  type TfilterKeys = typeof filterKeys[number];
		
		// поиск по какому столбцу делать
		let [keyFilter, valueFilter] = (Object.entries(filters.value).find(([key, value]) => value) || []) as [TfilterKeys | undefined, 'hight' | 'low' | undefined];

		//сортируем
		const result = results.sort((a, b) => {
			
      let valA = undefined;
      let valB = undefined;

      if (keyFilter === 'country') {
        valA = a.location.country;
        valB = b.location.country;
      } else if (keyFilter === 'fullname') {
        valA = a.name.first + a.name.last;
        valB = b.name.first + b.name.last;
			} else if (keyFilter === 'bithday') {

				function getDate(date: string) {
				  const year = new Date(date).getFullYear();
				  const month = new Date(date).getDate();
				  const day = new Date(date).getDate();

					return year + '' + month + '' + day;
				};

        valA = getDate(a.dob.date);
        valB = getDate(b.dob.date);
			} else if (keyFilter === 'phone') {
        valA = a.phone.replace(/[\s()-]/g, '');
        valB = b.phone.replace(/[\s()-]/g, '');
			} else if (keyFilter === "gender" || keyFilter === "email"){
				valA = a[keyFilter];
        valB = b[keyFilter];
			};

			if (valA && valB) {
				if (valueFilter === 'hight') {
          return valA.localeCompare(valB);
        } else if (valueFilter === 'low') {
          return valB.localeCompare(valA);
        }
			}


      return 0; // на случай, если valueFilter не 'hight' и не 'low'
    });
		
    if (!lookingName?.value?.trim()) return getListPages(result);

    const lowerLookingName = lookingName.value.toLowerCase();

		const newdata = results.filter((item)=> {
			function checkData(key: 'first' | 'last' | 'title') {
        return item.name[key].toLowerCase().includes(lowerLookingName);
      };
		
			return checkData('title') || checkData('first') || checkData('last');
	  })

		numberPageRef.value = String(1);

		return getListPages(newdata);
  });
	
	function changeNumberPage(numberPage: string) {
		const query = {
			...route.query,
			numberPage,
		};
		
		router.push({ query});

		numberPageRef.value = numberPage;
	};



</script>


<template>

	<div class="table">

		<Headers :filters="filters"/>

		<template 
		  v-for="{id, picture, name, gender, location, dob, email, phone} in searchUsers[Number(numberPageRef)]" 
			:key="id"
		>
			<Line 
   			:id       ="id" 
				:picture  ="picture" 
				:name     ="name" 
				:gender   ="gender" 
				:location ="location" 
				:dob      ="dob" 
				:email    ="email"
				:phone    ="phone"
			/>
		</template>

		<Btns 
			:numberPage       ="numberPageRef"
			:pages            ="searchUsers" 
			:changeNumberPage ="changeNumberPage"
		/>

	</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Table',
  });
</script>