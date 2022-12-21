// TDesign Vue Next
// https://tdesign.tencent.com/vue-next/

// 组件
import {
  Button,
  Card,
  ColorPicker,
  ColorPickerPanel,
  Input,
  InputNumber,
  Popup,
  Select,
  Textarea,
  Tooltip,
  Upload,
} from 'tdesign-vue-next';

// CSS
import 'tdesign-vue-next/es/style/index.css';
import './index.css';

/** @param { import('vue').App<Element> } app */
export default function init(app) {
  // 注意：
  // 将基础组件放在前面，防止 CSS 优先级异常。
  return app.use(Button)
    .use(Input)
    .use(InputNumber)
    .use(Textarea)
    .use(Popup)
    .use(Select)
    .use(Card)
    .use(ColorPicker)
    .use(ColorPickerPanel)
    .use(Tooltip)
    .use(Upload);
}
