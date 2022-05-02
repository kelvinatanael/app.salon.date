<template>
  <div>
    <!-- Top Navbar -->
    <f7-navbar class="content-header" :sliding="false">
      <!-- <f7-nav-left>
        <f7-link
          icon-ios="f7:menu"
          icon-aurora="f7:menu"
          icon-md="material:menu"
          panel-open="left"
        ></f7-link>
      </f7-nav-left> -->
      <f7-nav-title>
        <svg
          class="icon-left"
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="cut"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <g class="fa-group">
            <path
              fill="#fff"
              d="M96 224a96.49 96.49 0 0 0 13.36-.93L142.29 256l67.88-67.88-24.85-24.86A96 96 0 1 0 96 224zm0-128a32 32 0 1 1-32 32 32 32 0 0 1 32-32zm348.48 326.43a12 12 0 0 1 0 17 84 84 0 0 1-118.79 0L210.17 323.88 278.06 256z"
              class="fa-secondary"
            ></path>
            <path
              fill="#6585eb"
              d="M444.48 89.57a12 12 0 0 0 0-17 84 84 0 0 0-118.79 0L109.36 288.93a95.9 95.9 0 1 0 76 59.81zM96 416a32 32 0 1 1 32-32 32 32 0 0 1-32 32z"
              class="fa-primary"
            ></path>
          </g>
        </svg>
        Salon Date
        <svg
          class="icon-right"
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="cut"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <g class="fa-group">
            <path
              fill="#6585eb"
              d="M96 224a96.49 96.49 0 0 0 13.36-.93L142.29 256l67.88-67.88-24.85-24.86A96 96 0 1 0 96 224zm0-128a32 32 0 1 1-32 32 32 32 0 0 1 32-32zm348.48 326.43a12 12 0 0 1 0 17 84 84 0 0 1-118.79 0L210.17 323.88 278.06 256z"
              class="fa-secondary"
            ></path>
            <path
              fill="#fff"
              d="M444.48 89.57a12 12 0 0 0 0-17 84 84 0 0 0-118.79 0L109.36 288.93a95.9 95.9 0 1 0 76 59.81zM96 416a32 32 0 1 1 32-32 32 32 0 0 1-32 32z"
              class="fa-primary"
            ></path>
          </g>
        </svg>
      </f7-nav-title>
    </f7-navbar>
    <!------------------>
    <!---------------->
    <search />
    <!-- INPUT SEARCH -->
  </div>
</template>

<script>
import search from "./search.vue";

export default {
  components: {
    search,
  },
};
</script>

<style lang="scss">
.content-header {
  position: fixed;
  top: 0;
  height: 56px;
  .navbar-bg {
    background: #104069;
    &::before, &::after {
      content: none !important;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    color: #fff;
    display: flex;
    justify-content: center;
    .icon-left {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .icon-right {
      width: 30px;
      height: 30px;
      transform: rotate(180deg);
      margin-left: 10px;
    }
  }
  .material-icons {
    color: #fff;
  }
}
</style>