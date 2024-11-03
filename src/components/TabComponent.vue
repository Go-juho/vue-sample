<script setup>
import {defineEmits, defineExpose, ref} from "vue";
import DxTabs from 'devextreme-vue/tabs';
import {tabItemList} from "@/components/tabModel";  // 탭 데이터

const emit = defineEmits([`cacheTabItems`, `selectTab`])

// tabItemList를 복사하여 tabItems 저장
const tabItems = ref([...tabItemList]);
// 활성화 된 탭의 인덱스
const selectedTabIndex = ref(0);
// 각 탭의 고유 key값
const tabkey = ref(0);

/**
 * 탭을 추가하거나 선택
 *
 * @returns {boolean}
 * @param newTab
 */
const fnTabHandler = (newTab) => {
  // 선택된 탭이 없으면 아무것도 하지 않음
  if (!newTab || !newTab.id) return false;

  // console.log(`TabComponent.vue - fnTabHandler`, newTab)

  // 탭이 없는 경우 -1
  const existingTabIndex = tabItems.value.findIndex((item) => item.id === newTab.id);

  if (existingTabIndex === -1) {
    // 탭이 없는 경우 탭을 추가하고 탭을 선택
    tabItems.value = [...tabItems.value, {id: newTab.id, text: newTab.text, componentName: newTab.componentName}];
    selectedTabIndex.value = tabItems.value.length - 1;
  } else {
    // 탭이 있는경우 탭을 선택
    selectedTabIndex.value = existingTabIndex;
  }

  if (selectedTabIndex.value >= 0) {
    // MainLayout로 선택된 탭을 알려줌
    emit(`selectTab`, tabItems.value[selectedTabIndex.value]);
  }

  // MainLayout로 현재 켜져있는 탭을 알려줌
  emit(`cacheTabItems`, tabItems.value);
}

/**
 * 탭 닫기
 *
 * @param index
 */
const fnCloseTab = (index) => {
  if (index < 0 || index >= tabItems.value.length) return; // 유효한 인덱스인지 확인

  // 현재 탭을 제거 (VUE에서 splice() 등으로 배열을 변경하면 인식하지 못해 다시그려주지 않는 현상 일어남)
  const copyTabItems = [...tabItems.value]; // tabItems를 copyTabItems에 복사
  copyTabItems.splice(index, 1); // copyTabItems에서 닫은 탭을 제거
  tabItems.value = null;
  tabItems.value = [...copyTabItems]; // tabItems를 copyTabItems으로 대체

  // 삭제 후 새로운 선택된 인덱스 설정
  if (index === tabItems.value.length) {
    // 마지막 탭을 닫은 경우, 바로 왼쪽 탭을 선택
    selectedTabIndex.value = tabItems.value.length - 1;

    // console.log(`TabComponent.vue - fnCloseTab - 마지막 탭 닫음`, selectedTabIndex.value)
  } else {
    // 중간 탭을 닫은 경우, 바로 오른쪽 탭을 선택
    selectedTabIndex.value = index;
    // 탭 영역의 키를 변경시켜 강제로 탭 영역을 다시 그리도록 유도
    tabkey.value += 1;
  }

  if (selectedTabIndex.value >= 0) {
    // MainLayout로 선택된 탭을 알려줌
    emit(`selectTab`, tabItems.value[selectedTabIndex.value]);
  }

  // MainLayout로 현재 켜져있는 탭을 알려줌
  emit(`cacheTabItems`, tabItems.value);
}

/**
 * 탭 선택 시
 * @param e
 */
const fnSelectedTab = (e) => {
  // console.log(`TabComponent.vue - fnSelectedTab`)
  fnTabHandler(e.itemData);
}

// 부모(MainLayout)에게 함수를 전달
defineExpose({fnTabHandler, tabItems});
</script>

<template>
  <DxTabs
    id="tab"
    :key="tabkey"
    ref="tabRef"
    :data-source="tabItems"
    :selected-index="selectedTabIndex"
    @item-click="fnSelectedTab"
  >
    <template #item="{ data, index }">
      <span>{{ data.text }}</span>
      <button v-if="data.id !== `main`" @click="fnCloseTab(index)">X</button>
    </template>
  </DxTabs>
</template>

<style scoped>

</style>