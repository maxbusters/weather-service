<script setup>
import LangSwitcher from '@/components/Forms/LangSwitcherForm.vue'
</script>

<template>
  <div class="footer">
    <div class="footer__container container">
      <LangSwitcher />
      <div class="footer__copy">
        <span>&copy; Skvortsov Maksym {{ new Date().getFullYear() }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  background-color: #fff;
  -webkit-box-shadow: -1px -4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: -1px -4px 4px rgba(0, 0, 0, 0.1);
  padding: 3rem;

  &__copy {
    margin-top: 20px;
  }
}
</style>
