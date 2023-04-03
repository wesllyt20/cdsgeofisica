<template>
  <header class="header">
    <Container tag="nav" class="header__container">
      <a>
        <img
          src="https://www.igp.gob.pe/programas-de-investigacion/images/logo-minan.png"
          alt=""
          class="header__logo"
        />
      </a>
      <button
        type="button"
        class="header__btn"
        target=".header__nav"
        @click="handleSidebar"
      >
        <span :class="[sidebarShow ? 'active' : '', 'header__btn-icon']"></span>
      </button>
      <div :class="[sidebarShow ? 'active' : '', 'header__wrapper']" @click="closeSidebar">
        <List horizontal :class="[sidebarShow ? 'active' : '', 'header__nav']" @click.stop>
            <Menu v-for="(item, index) in menu" :key="index" :menu="item" />
        </List>
      </div>
      <div class="igp-logo">
        <a>
          <img
            src="https://www.igp.gob.pe/programas-de-investigacion/images/logo_igp_normal.png"
            alt=""
            class="header__logo header__logo--complete"
          />
        </a>
        <a>
          <img
            src="https://www.igp.gob.pe/programas-de-investigacion/images/logo_igp_small.png"
            alt=""
            class="header__logo header__logo--partial"
          />
        </a>
      </div>
    </Container>
  </header>
</template>

<script>
import { getMenu } from "@/interface-data.js";

import Container from "@/components/ui/objects/Container";
import List from "@/components/ui/objects/List";
import Menu from "@/components/ui/atoms/Menu";

import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Container,
    List,
    Menu
  },
  emits: ['setOverlay'],
  setup(props, {emit}) {
    const route = useRoute();
    const menu = getMenu(process.env.VUE_APP_PREFIX);
    let sidebarShow = ref(false);

    let handleSidebar = () => {
      sidebarShow.value = !sidebarShow.value; 
      
    };
    let closeSidebar = () => {
      sidebarShow.value = false;
    };
    
    watch(() => route.fullPath, closeSidebar);
    watch(sidebarShow, () => { emit('setOverlay', sidebarShow.value) });

    return {
      menu,
      sidebarShow,
      handleSidebar,
      closeSidebar
    };
  }
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/settings/_variables.scss";
@use "@/assets/styles/tools/_mixins.scss";
.header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: variables.$z-menu;
  width: 100%;
  background: variables.$background-header-color;
  border-bottom: 1px solid variables.$border-header-color;
  text-transform: uppercase;
  &__container {
    @include mixins.justify(center, flex-start);
  }
  &__wrapper {
    position: fixed;
    top: 67px;
    left: 0;
    background-color: variables.$overlay-color;
    visibility: hidden;
    opacity: 0;
    height: calc(100vh - 67px);
    transition: opacity .2s;
    width: 100%;
    &.active{
        visibility: visible;
        opacity: 1;
    }
  }
  &__nav {
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    background: variables.$background-header-color;
    left: -100%;
    transition: all .3s;
    max-width: 100%;
    height: 100%;
    overflow: auto;
    flex-wrap: nowrap;
    &.active {
      left: 0;
    }
  }
  &__overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }
  &__logo {
    height: 36px;
    display: block;
    margin-right: .5em;
    &--complete {
      display: none;
    }
    &--partial {
      display: block;
    }
  }
  &__btn {
    height: 66px;
    user-select: none;
    border: none;
    background-color: inherit;
    cursor: pointer;
    outline: none;
    z-index: 2;
    order: 2;
    margin-left: auto;
    &-icon {
      background: variables.$text-header-hover-color;
      display: block;
      height: 2px;
      position: relative;
      transition: background 0.2s ease-out;
      width: 18px;
      &::before,
      &::after {
        background: variables.$text-header-hover-color;
        content: "";
        display: block;
        height: 100%;
        position: absolute;
        transition: all 0.2s ease-out;
        width: 100%;
      }
      &::before {
        top: 5px;
      }
      &::after {
        top: -5px;
      }
      &.active {
        background: transparent;
        &::before {
          top: 0;
          transform: rotate(45deg);
        }
        &::after {
          top: 0;
          transform: rotate(-45deg);
        }
      }
    }
  }
}
@media (min-width: 992px) {
  .header__logo {
    height: 40px;
    margin-right: 1em;
    &--complete {
      display: block;
    }
    &--partial {
      display: none;
    }
  }
}
@media (min-width: 1200px) {
  .header {
    &__container {
      & > *:last-child {
        margin-left: auto;
      }
    }
    .igp-logo {
      .header__logo {
        margin-right: 0;
      }
    }
    &__btn {
      display: none;
    }
    &__wrapper {
        position: initial;
        top: 0;
      padding-top: 0;
      width: auto;
      height: auto;
      min-height: auto;
      visibility: visible;
      opacity: 1;
    }
    &__nav {
      position: relative;
      flex-direction: row;
      left: initial;
      z-index: 1;
      overflow: initial;
    }
  }
}
</style>
