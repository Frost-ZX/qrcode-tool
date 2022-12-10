<template>
  <!-- 二维码生成 -->
  <div class="qr-encode">

    <!-- 生成结果 -->
    <t-card
      class="content-card code-result"
      title="二维码预览"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
    >
      <template #actions>
        <t-button
          theme="primary"
          variant="text"
          @click="generateCode"
        >生成 / 刷新</t-button>
        <t-button
          theme="primary"
          variant="text"
          disabled
        >复制地址</t-button>
      </template>
      <div
        class="code-image-wrapper"
        :style="{ '--code-size': state.codeSize }"
      >
        <img
          v-if="state.codeURL"
          alt="二维码"
          class="code-image"
          :src="state.codeURL"
        />
      </div>
    </t-card>

    <!-- 内容设置 -->
    <t-card
      class="content-card set-text"
      title="二维码内容"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
    >
      <t-input v-model="state.text" />
    </t-card>

    <!-- 颜色设置 -->
    <t-card
      class="content-card set-color"
      title="二维码颜色"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
    >
      <div class="config-item">
        <span class="label">前景色：</span>
        <t-color-picker
          v-model="state.colorForeground"
          :color-modes="['monochrome']"
          :recent-colors="null"
          format="HEX"
        />
      </div>
      <div class="config-item">
        <span class="label">背景色：</span>
        <t-color-picker
          v-model="state.colorBackground"
          :color-modes="['monochrome']"
          :recent-colors="null"
          format="HEX"
        />
      </div>
    </t-card>

    <!-- 大小设置 -->
    <t-card
      class="content-card set-size"
      title="二维码大小"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
    >
      <div class="config-item">
        <t-input-number
          v-model="state.size"
          label="尺寸："
          theme="column"
          :allow-input-over-limit="false"
          :decimal-places="0"
          :min="128"
          :max="1024"
          :step="1"
        />
      </div>
      <div class="config-item">
        <t-input-number
          v-model="state.margin"
          label="边距："
          theme="column"
          :allow-input-over-limit="false"
          :decimal-places="0"
          :min="0"
          :max="100"
          :step="1"
        />
      </div>
    </t-card>

  </div>
</template>

<script setup>
import {
  shallowReactive,
  onBeforeMount,
  onMounted,
} from 'vue';

import {
  dataURLtoBlob,
  generateQRCode,
  getURLQueries,
} from '@/assets/js/utils';

const props = defineProps({

  /** 是否为只读模式 */
  readonly: {
    type: Boolean,
    default: false
  },

});

const state = shallowReactive({

  /** 二维码图片大小 */
  codeSize: 0,
  /** 二维码图片 URL */
  codeURL: '',
  /** 是否为只读 */
  readonly: false,

  /** 背景颜色 */
  colorBackground: '#FFFFFF',
  /** 前景颜色 */
  colorForeground: '#000000',
  /** 二维码边距 */
  margin: 10,
  /** 二维码尺寸 */
  size: 256,
  /** 二维码内容 */
  text: '',

});

/** 初始化数据 */
function initData() {
  const { readonly = '0', text = '' } = getURLQueries();
  state.readonly = (readonly === '1');
  state.text = text;
}

/** 生成二维码 */
async function generateCode() {

  const { error, result, success } = await generateQRCode(state);

  if (!success) {
    console.error('生成二维码失败：');
    console.error(error);
  }

  const blob = dataURLtoBlob(result);
  const url = blob ? URL.createObjectURL(blob) : null;

  // 销毁原对象地址
  if (state.codeURL) {
    URL.revokeObjectURL(state.codeURL);
  }

  // 更新预览图片
  state.codeSize = state.size;
  state.codeURL = url;

}

onBeforeMount(() => {
  initData();
});

onMounted(() => {
  generateCode();
});
</script>

<style lang="less" scoped>
:deep(.code-result) {
  .t-card__body {
    display: flex;
    justify-content: center;
  }

  .code-image-wrapper {
    width: 100%;
    line-height: 1;
    text-align: center;
  }

  .code-image {
    width: auto;
    height: calc(var(--code-size, 256) * 1px);
    max-height: 16rem;
    object-fit: contain;
    object-position: center;
  }
}

:deep(.set-color) {
  .t-card__body {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .config-item {
    display: flex;
    align-items: center;
    margin: 0.2em 0;
    white-space: nowrap;

    &:not(:last-child) {
      margin-right: 2em;
    }
  }

  .label {
    margin-right: 0.5em;
  }
}

:deep(.set-size) {
  .t-card__body {
    display: flex;
    align-items: center;
  }

  .config-item {
    width: 0;
    flex-grow: 1;

    &:not(:first-child) {
      margin-left: 0.5em;
    }
  }

  .t-input-number {
    width: 100%;
  }
}
</style>
