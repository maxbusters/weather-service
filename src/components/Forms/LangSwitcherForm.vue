<script setup>
import { ref } from 'vue'
import Config from '@/Config'

const locales = ref(Config.LOCALES)
function saveState(e) {
  localStorage.setItem('locale', e.target.value)
}
</script>

<template>
  <div class="header__lang lang">
    <div class="lang__select">
      <select v-model="$i18n.locale" @change="saveState">
        <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
          {{ $t(`locale.${locale}`) }}
        </option>
      </select>
    </div>
    <flag :iso="$t(`locale.flag_iso`)" />
  </div>
</template>

<style lang="scss" scoped>
.lang {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;

  &__select {
    margin-right: 10px;
  }

}
</style>
