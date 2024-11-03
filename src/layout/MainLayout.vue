<script setup>
import {ref} from "vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import TabComponent from "@/components/TabComponent.vue";

// const route = useRoute();

// SidebarComponent에서 선택한 메뉴
const selectedMenu = ref({});
// TabComponent의 expose()를 참조
const tabComponentRef = ref(null);

/**
 * 선택된 메뉴 받아오는 함수
 *
 * @param menu Object
 */
const fnSelectedMenu = (menu) => {
  // SidebarComponent에서 전달해준 선택된 메뉴를 selectedMenu에 저장
  selectedMenu.value = menu;
  // TabComponent에 직접 참조하여 fnTabHandler 함수를 호출
  tabComponentRef.value?.fnTabHandler(selectedMenu.value.selectedMenu[0]);
}
</script>

<template>
  <SidebarComponent @selectedMenu="fnSelectedMenu"></SidebarComponent>

  <TabComponent ref="tabComponentRef"></TabComponent>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style scoped>

</style>