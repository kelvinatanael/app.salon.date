<template>
  <f7-app :params="f7params">
    <!-- Left panel with cover effect-->
    <f7-panel left cover theme-dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Left Panel"></f7-navbar>
          <f7-block>Left panel content goes here</f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="safe-areas" url="/">
    </f7-view>
    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="text"
              name="username"
              placeholder="Your username"
              :value="username"
              @input="username = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="password"
              name="password"
              placeholder="Your password"
              :value="password"
              @input="password = $event.target.value"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button
              title="Sign In"
              @click="alertLoginData"
            ></f7-list-button>
            <f7-block-footer>
              Some text about login information.<br />Click "Sign In" to close
              Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
    <!-- COMPONENT LOADING -->
    <loading />
    <!------------------------>
    <!-- MENU FOOTER -->
    <menu-footer v-if="this.f7Start" />
    <!------------------------>
  </f7-app>
</template>
<script>
import { Device } from "framework7/framework7-lite.esm.bundle.js";
import cordovaApp from "../js/cordova-app.js";
import routes from "@/router/routes.js";
import loading from "@/components/loading.vue";
import menuFooter from "@/components/menu-footer.vue";


export default {
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        id: "io.framework7.agendesalao", // App bundle ID
        name: "Salon Date", // App name
        theme: "auto", // Automatic theme detection

        // App routes
        routes: routes,

        // Input settings
        input: {
          scrollIntoViewOnFocus: Device.cordova && !Device.electron,
          scrollIntoViewCentered: Device.cordova && !Device.electron,
        },
        // Cordova Statusbar settings
        statusbar: {
          iosOverlaysWebView: true,
          androidOverlaysWebView: false,
        },
      },
      // Login screen data
      username: "",
      password: "",
      f7Start: false,
    };
  },
  methods: {
    alertLoginData() {
      this.$f7.dialog.alert(
        "Username: " + this.username + "<br>Password: " + this.password,
        () => {
          this.$f7.loginScreen.close();
        }
      );
    },
  },
  components: {
    loading,
    menuFooter
  },
  computed: {
    f7Ready() {
      return this.$f7;
    }
  },
  mounted() {
    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
      // VISIBLE FOOTER MENU
      this.f7Start = true;
    });
  },
};
</script>
<style lang="scss">
button {
  position: relative;
  outline: none;
}
.vld-overlay.is-full-page {
  z-index: 999999;
}
@media (max-width: 576px){
  #onesignal-bell-container.onesignal-reset .onesignal-bell-launcher.onesignal-bell-launcher-bottom-right {
    right: 5px !important;
  }
  #onesignal-bell-container.onesignal-reset .onesignal-bell-launcher.onesignal-bell-launcher-md .onesignal-bell-launcher-button {
    width: 26px !important;
    height: 26px !important;
  }
}
</style>