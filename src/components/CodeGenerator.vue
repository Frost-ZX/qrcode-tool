<template>
  <!-- 二维码生成 -->
  <div class="qr-encode">

    <!-- 生成结果 -->
    <t-card
      class="content-card code-result"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
      :title="$t('codePreview')"
    >
      <template v-if="isNormal" #actions>
        <!-- 生成二维码 -->
        <t-tooltip :content="$t('btnGenerateDesc')">
          <t-button
            theme="primary"
            variant="text"
            @click="generateCode"
          >{{ $t('btnGenerate') }}</t-button>
        </t-tooltip>
        <!-- 复制地址 -->
        <t-tooltip :content="$t('btnCopyDesc')">
          <t-button
            theme="primary"
            variant="text"
            @click="copyCodeURL"
          >{{ $t('btnCopy') }}</t-button>
        </t-tooltip>
      </template>
      <div
        class="code-image-wrapper"
        :style="{ '--code-size': state.codeSize }"
      >
        <img
          v-if="state.codeURL"
          class="code-image"
          :alt="$t('qrcode')"
          :src="state.codeURL"
        />
      </div>
      <div
        v-show="state.readonly"
        class="code-tips"
      >{{ $t('codeTips') }}</div>
    </t-card>

    <!-- 内容设置 -->
    <t-card
      v-if="isNormal"
      class="content-card set-text"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
      :title="$t('codeContent')"
    >
      <t-textarea v-model="state.text" />
    </t-card>

    <!-- 颜色设置 -->
    <t-card
      v-if="isNormal"
      class="content-card set-color"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
      :title="$t('codeColor')"
    >
      <!-- 前景颜色 -->
      <div class="config-item">
        <span class="label">{{ $t('setColorForeground') }}</span>
        <t-color-picker
          v-model="state.colorForeground"
          :color-modes="['monochrome']"
          :recent-colors="null"
          format="HEX"
        />
      </div>
      <!-- 背景颜色 -->
      <div class="config-item">
        <span class="label">{{ $t('setColorBackground') }}</span>
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
      v-if="isNormal"
      class="content-card set-size"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
      :title="$t('codeSize')"
    >
      <!-- 尺寸 -->
      <div class="config-item">
        <t-input-number
          v-model="state.size"
          theme="column"
          :allow-input-over-limit="false"
          :decimal-places="0"
          :min="128"
          :max="1024"
          :step="1"
          :label="$t('setSize')"
        />
      </div>
      <!-- 边距 -->
      <div class="config-item">
        <t-input-number
          v-model="state.margin"
          theme="column"
          :allow-input-over-limit="false"
          :decimal-places="0"
          :min="0"
          :max="100"
          :step="1"
          :label="$t('setMargin')"
        />
      </div>
    </t-card>

  </div>
</template>

<script setup>
import {
  computed,
  shallowReactive,
  onBeforeMount,
  onMounted,
} from 'vue';

import {
  useI18n,
} from 'vue-i18n';

import {
  $message,
  dataURLtoBlob,
  generateQRCode,
  getURLQueries,
  toURLQueries,
} from '@/assets/js/utils';

const $t = useI18n().t;

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

/** 是否为常规模式 */
const isNormal = computed(() => {
  return !state.readonly;
});

/** 初始化数据 */
function initData() {
  const { readonly = '0', text = '' } = getURLQueries();
  state.readonly = (readonly === '1');
  state.text = text;
}

/** 复制二维码地址 */
function copyCodeURL() {


  const origin = location.origin; // 协议 + 域名
  const path = location.pathname; // 访问路径
  const queries = toURLQueries({
    readonly: '1',
    text: state.text,
  });
  const text = `${origin}${path}?${queries}`;

  navigator.clipboard.writeText(text).then(() => {
    $message('success', { content: '复制成功' });
  }).catch(() => {
    $message('error', { content: '复制失败，可能是没有权限' });
  });

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
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .code-image-wrapper {
    width: 100%;
    line-height: 1;
  }

  .code-image {
    width: auto;
    height: calc(var(--code-size, 256) * 1px);
    max-height: 16rem;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
  }

  .code-tips {
    color: #505050;
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
