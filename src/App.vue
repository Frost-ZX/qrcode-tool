<template>

  <div class="app-header">
    <div class="app-wrapper">
      <div
        v-for="item in tabList"
        v-text="$t(item.label)"
        :key="item.key"
        :class="{ active: state.currTabKey === item.key }"
        class="tab-item"
        @click="changeTab(item)"
      ></div>
      <div class="placeholder"></div>
      <div class="locale" @click="changeLocale">
        <span class="label">{{ locale }}</span>
        <span class="icon mdi mdi-earth"></span>
      </div>
    </div>
  </div>

  <t-config-provider
    class="app-content"
    :global-config="state.tDesignLocale"
  >
    <component
      v-if="state.currTabComponent"
      :is="state.currTabComponent"
      class="app-wrapper"
    ></component>
  </t-config-provider>

</template>

<script setup>
import {
  markRaw,
  shallowReactive,
  onBeforeMount,
  onMounted,
} from 'vue';

import { useI18n } from 'vue-i18n';

import enConfig from 'tdesign-vue-next/es/locale/en_US';
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN';

import CodeGenerator from '@/components/CodeGenerator.vue';
import CodeReader from '@/components/CodeReader.vue';

const { locale, t: $t } = useI18n();

const state = shallowReactive({
  currTabComponent: null,
  currTabKey: '',
  tDesignLocale: null,
});

const tabList = markRaw([
  {
    key: 'encode',
    label: 'generate',
    c: CodeGenerator,
  },
  {
    key: 'decode',
    label: 'parse',
    c: CodeReader,
  },
]);

/** 切换语言 */
function changeLocale() {
  let curr = locale.value;
  if (curr === 'zh') {
    locale.value = 'en';
  } else {
    locale.value = 'zh';
  }
  updateLocale();
}

/**
 * @description 切换页面
 * @param {typeof tabList[number]} data
 */
function changeTab(data = {}) {
  state.currTabComponent = data.c;
  state.currTabKey = data.key;
}

/** 更新语言配置 */
function updateLocale() {
  let v = locale.value;
  if (v === 'en') {
    state.tDesignLocale = enConfig;
  } else {
    state.tDesignLocale = zhConfig;
  }
  localStorage.setItem('APP_LOCALE', v);
}

onBeforeMount(() => {
  updateLocale();
});

onMounted(() => {
  changeTab(tabList[0]);
});
</script>

<style lang="less">
.app-header, .app-content {
  display: block;
  padding: 1rem;
  text-align: center;

  .app-wrapper {
    width: 100%;
    max-width: 40rem;
    text-align: left;
  }
}

.app-header {
  flex-shrink: 0;
  background-color: var(--td-brand-color);
  color: #FFF;

  .app-wrapper {
    display: inline-flex;
    align-items: center;
  }

  .tab-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.8em;
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

  .placeholder {
    flex-grow: 1;
  }

  .locale {
    font-size: 0.875rem;
    cursor: pointer;

    .icon, .label {
      vertical-align: middle;
    }

    .label {
      font-family: sans-serif;
      text-transform: uppercase;
    }
  }
}

.app-content {
  flex-grow: 1;
  height: 0;
  overflow-y: auto;

  .app-wrapper {
    display: inline-block;
  }

  .content-card:not(:first-child) {
    margin-top: 1rem;
  }

  .t-card__body {
    padding: 1rem;
  }
}
</style>
