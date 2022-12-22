import { createI18n } from 'vue-i18n';

import en from './en';
import zh from './zh';

const l = (localStorage.getItem('APP_LOCALE') || 'zh');
const i18n = createI18n({
  locale: l,
  fallbackLocale: 'zh',
  legacy: false,
  messages: {
    en,
    zh,
  },
});

/** @param { import('vue').App<Element> } app */
export default function init(app) {
  return app.use(i18n);
}
