<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import myLogoSrc from '@/assets/weather-logo.svg'
import LangSwitcher from '@/components/Forms/LangSwitcherForm.vue'

const store = useStore()
const favoritesCount = computed(() => {
  return store.getters.favorites.length
})
</script>

<template>
  <header class="header">
    <div class="header__container container">
      <router-link to="/" class="header__logo logo">
        <h1 class="logo__name">
          Weather Info
        </h1>
        <img class="logo__img" :src="myLogoSrc" alt="weather-logo">
      </router-link>
      <nav>
        <ul>
          <li>
            <router-link to="/" active-class="active">
              {{ $t('nav.main') }}
            </router-link>
          </li>
          <li>
            <router-link to="/favorites" active-class="active">
              {{ $t('nav.favorites') }}
              ({{ favoritesCount }})
            </router-link>
          </li>
          <li class="nav__lang">
            <LangSwitcher />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 1rem;
  text-decoration: none;
  color: #333;

  @media (max-width: 680px) {
    font-size: 20px;
    display: block;
    width: 100%;
    text-align: center;
  }

  &__name {
    display: inline-block;
    margin-right: 20px;
  }

  &__img {
    width: 100px;

    @media (max-width: 680px) {
      width: 40px;
    }
  }

}

.nav__lang {
  margin-left: auto;

  @media (max-width: 570px) {
    margin: 0;
    margin-top: 10px;
  }
}

nav ul {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 20px;

  @media (max-width: 570px) {
    flex-direction: column;
  }

  @media (max-width: 425px) {
    font-size: 16px;
  }
}

nav li {
  margin: 0 1rem;
}

nav a {
  color: #333;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
  font-size: 25px;
  color: orange;

  @media (max-width: 425px) {
    font-size: 18px;
  }
}

.active {
  font-weight: 800;
  font-size: 25px;

  @media (max-width: 425px) {
    font-size: 18px;
  }
}
</style>
