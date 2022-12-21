<template>

  <div class="app-header">
    <div class="app-wrapper">
      <div
        v-for="item in tabList"
        v-text="item.label"
        :key="item.key"
        :class="{ active: state.currTabKey === item.key }"
        class="tab-item"
        @click="changeTab(item)"
      ></div>
    </div>
  </div>

  <div class="app-content">
    <component
      v-if="state.currTabComponent"
      class="app-wrapper"
      :is="state.currTabComponent"
    ></component>
  </div>

</template>

<script setup>
import { markRaw, shallowReactive, onMounted } from 'vue';

import CodeGenerator from '@/components/CodeGenerator.vue';
import CodeReader from '@/components/CodeReader.vue';

const state = shallowReactive({
  currTabComponent: null,
  currTabKey: '',
});

const tabList = markRaw([
  { key: 'encode', label: '生成', c: CodeGenerator },
  { key: 'decode', label: '解析', c: CodeReader },
]);

/** 初始化 */
function init() {
  changeTab(tabList[0]);
}

/**
 * @description 切换页面
 * @param {typeof tabList[number]} data
 */
function changeTab(data = {}) {
  state.currTabComponent = data.c;
  state.currTabKey = data.key;
}

onMounted(() => {
  init();
});
</script>

<style lang="less">
.app-header, .app-content {
  display: block;
  padding: 1rem;
  text-align: center;

  .app-wrapper {
    display: inline-block;
    width: 100%;
    max-width: 40rem;
    text-align: left;
  }
}

.app-header {
  flex-shrink: 0;
  background-color: var(--td-brand-color);
  color: #FFF;
}

.app-content {
  flex-grow: 1;
  height: 0;
  overflow-y: auto;

  .content-card:not(:first-child) {
    margin-top: 1rem;
  }

  .t-card__body {
    padding: 1rem;
  }
}

.tab-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4em;
  height: 2em;
  font-size: 0.8rem;
  line-height: 1;
  border-radius: 1em;
  background-color: transparent;
  transition: background-color 0.25s;
  cursor: pointer;

  &:not(:first-child) {
    margin-left: 0.5rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.25);
  }
}
</style>
