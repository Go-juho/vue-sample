<script setup>
import {defineEmits, onMounted, ref} from "vue";
import DxTreeView from 'devextreme-vue/tree-view';
import {sidebarMenuList} from "@/components/sidebarModel";
import {useRoute} from "vue-router";  // 사이드바 데이터

// MainLayout로 선택한메뉴를 전달하기 위해 emit 정의
const emit = defineEmits([`selectedMenu`]);

const route = useRoute();

// DxTreeView의 ref="sidebarRef"를 참조
const sidebarRef = ref();
// 선택한 메뉴를 저장
const selectedMenu = ref({});

/**
 * 사이드바 메뉴를 선택하거나 선택이 해제될 시
 */
const fnItemSelectionChanged = () => {
  // 선택한 메뉴
  selectedMenu.value = sidebarRef.value.instance
      .getSelectedNodes()
      .filter((node) => node.itemData !== selectedMenu.value)
      .map((node) => node.itemData);

  // 선택한 메뉴를 MainLayout로 전달
  if (selectedMenu.value.length > 0) {
    emit(`selectedMenu`, {selectedMenu: selectedMenu.value});
  }
}

onMounted(() => {
  // url로 페이지를 호출시 route.name으로 해당 탭과 콘텐츠 영역을 제어
  if (route.name) {
    sidebarRef.value.instance.selectItem(route.name);
  }
})
</script>

<template>
  <DxTreeView
      id="sidebar"
      ref="sidebarRef"
      :items="sidebarMenuList"
      :selection-mode="`single`"
      :select-by-click="true"
      @item-selection-changed="fnItemSelectionChanged"
      :width="300"
  >
    <template #item="{data}">
      {{ data.text }}
    </template>
  </DxTreeView>
</template>

<style scoped>
.dx-treeview-item-without-checkbox.dx-state-selected {
  background-color: transparent !important;
  color: inherit !important;
}
</style>