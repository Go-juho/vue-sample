<script setup>
import {ref} from "vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import TabComponent from "@/components/TabComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter();

// SidebarComponent의 expose()를 참조
const SidebarComponentRef = ref(null);
// TabComponent의 expose()를 참조
const tabComponentRef = ref(null);
// SidebarComponent에서 선택한 메뉴
const selectedMenu = ref({});
// 탭 컨텐츠 캐시를 유지할 컴포넌트 관리하는 변수
const cachedTabs = ref([]);

/**
 * 사이드 메뉴에서 선택한 메뉴 받아오는 함수
 * 받아온 메뉴로 탭을 생성 및 선택
 *
 * @param menu Object
 */
const fnSelectedMenu = (menu) => {
  // console.log(`MainLayout.vue - fnSelectedMenu`, menu);

  // SidebarComponent에서 전달해준 선택된 메뉴를 selectedMenu에 저장
  selectedMenu.value = menu;
  // TabComponent에 직접 참조하여 fnTabHandler 함수를 호출
  tabComponentRef.value?.fnTabHandler(selectedMenu.value.selectedMenu[0]);
}

/**
 * 탭에서 선택된 탭을 반아오는 함수
 * 받아온 탭에 연동되는 사이드 메뉴를 선택
 *
 * @param tab
 */
const fnSelectedTab = (tab) => {
  // console.log(`MainLayout.vue - fnSelectedTab`, tab);

  SidebarComponentRef.value?.fnSelectionMenu(tab.id);
  router.push(tab.id)
}

/**
 * 탭 변경시 유지될 컴포넌트 지정 함수
 *
 * @param tabs
 */
const fnTabCaching = (tabs) => {
  // console.log(`MainLayout.vue - fnTabCaching`);

  // SidebarComponentRef.value?.fnSelectionMenu();
  cachedTabs.value = tabs.map((tab) => tab.componentName);
}
</script>

<template>
  <SidebarComponent ref="SidebarComponentRef" @selectedMenu="fnSelectedMenu"></SidebarComponent>

  <TabComponent ref="tabComponentRef" @cacheTabItems="fnTabCaching" @selectTab="fnSelectedTab"></TabComponent>

  <router-view v-slot="{ Component }">
    <keep-alive :include="cachedTabs">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style scoped>

</style>