<template>
  <!-- 二维码解析 -->
  <div class="qr-decode">

    <!-- 选择图片 -->
    <t-card
      class="content-card code-picker"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
      :title="$t('codeImagePick')"
    >
      <t-upload
        v-model="state.files"
        accept="image/*"
        theme="image"
        :auto-upload="true"
        :multiple="false"
        :request-method="handleSelImage"
        draggable
      />
      <div class="code-tips">
        <span>{{ $t('codeImageTips') }}</span>
      </div>
    </t-card>

    <!-- 识别结果 -->
    <t-card
      class="content-card code-result"
      :bordered="false"
      :header-bordered="true"
      :shadow="true"
      :title="$t('codeImageResult')"
    >
      <t-textarea v-model="state.text" readonly />
    </t-card>

  </div>
</template>

<script setup>
import jsQR from 'jsqr';

import { shallowReactive, onBeforeUnmount, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { $message } from '@/assets/js/utils';

/** @typedef { import('tdesign-vue-next').RequestMethodResponse } UploadRes */
/** @typedef { import('tdesign-vue-next').UploadFile } UploadFile */

const $t = useI18n().t;

const state = shallowReactive({

  /** 文件列表 */
  files: [],

  /** 选择图片预览地址 */
  imageURL: '',

  /** 解析到的文本 */
  text: '',

});

/**
 * @description 处理粘贴事件
 * @param {ClipboardEvent} ev
 */
function handlePaste(ev) {

  const data = ev.clipboardData;
  const items = data ? data.items : null;

  /** 从剪切板中读取到的图片文件 */
  let file = null;

  if (items) {

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.kind === 'file' && item.type.includes('image/')) {
        file = item.getAsFile();
        break;
      }
    }

    if (file) {
      handleSelImage({ raw: file });
    } else {
      $message('warning', {
        content: '剪贴板中没有图片',
        duration: 2000,
      });
    }

  }

}

/**
 * @description 处理选择图片
 * @param   {UploadFile} fileInfo
 * @returns {Promise<UploadRes>}
 */
function handleSelImage(fileInfo) {

  if (!fileInfo) {
    return Promise.resolve({
      error: '参数错误',
      status: 'fail',
    });
  }

  const file = fileInfo.raw;
  const url = URL.createObjectURL(file);

  // 销毁旧 URL
  if (state.imageURL) {
    URL.revokeObjectURL(state.imageURL);
  }

  // 记录新 URL
  state.imageURL = url;

  // 解析二维码
  parseCode(url);

  return Promise.resolve({
    status: 'success',
    response: { url },
  });

}

/**
 * @description 解析图片中的二维码
 * @param {string} url 图片地址
 */
function parseCode(url = '') {

  let canvas = document.createElement('canvas');
  let ctx = null;
  let image = new Image();

  image.onload = function () {

    const w = image.naturalWidth;
    const h = image.naturalHeight;

    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, w, h);
    const codeData = jsQR(imageData.data, w, h);

    if (codeData) {
      $message('success', {
        content: '解析成功',
        duration: 2000,
      });
      state.text = codeData.data;
    } else {
      $message('warning', {
        content: '未在图片中识别到二维码',
        duration: 2000,
      });
      state.text = '';
    }

  };

  image.src = url;

}

onMounted(() => {
  document.addEventListener('paste', handlePaste);
});

onBeforeUnmount(() => {
  document.removeEventListener('paste', handlePaste);
});
</script>

<style lang="less" scoped>
:deep(.code-picker) {
  .t-upload__dragger {
    width: 100%;
  }

  .code-tips {
    margin-top: 1em;
    color: #808080;
  }
}
</style>
