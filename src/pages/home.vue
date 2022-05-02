<template>
  <f7-page class="home" name="home">
    <header-default />

    <f7-block class="content-home">
      <div class="content-home-header">
        <h2>Salões e cabeleireiros</h2>
      </div>
      <div class="content-home-body">
        <template v-for="(companyList, n) in company" >
          <template v-if="!searchCompanys || companyList.name.toLowerCase().indexOf(searchCompanys) !== -1">
            <a :key="n" @click="routerPages(n)" class="content-cards">
              <div class="content-cards-image">
                <img
                  class="img-fluid"
                  v-if="companyList.picture"
                  :src="companyList.picture"
                  alt="Logo Company"
                  title="Logo Company"
                />
                <img class="img-fluid"
                  v-else
                  src="static/icons/image-default-salon.png"
                  alt="Logo Company"
                  title="Logo Company"
                />
              </div>
              <div class="content-cards-text">
                <div class="content-cards-text-header">
                  <h2>{{ companyList.name }}</h2>
                </div>
                <div class="content-cards-text-km">
                  <p>{{ companyList.address }}</p>
                  <p>Bairro: {{ companyList.neighborhood }}</p>
                  <p>Cidade: {{ companyList.city }}</p>
                  <p>Estado: {{ companyList.state }}</p>
                </div>
                <!-- <div class="content-cards-text-time">
                  <p>Tempo aproximado de serviços: <span>30-65 min</span></p>
                </div> -->
              </div>
            </a>
          </template>
        </template>
      </div>
      <!-- <button @click="setFullScreen()">Go fullscreen</button> -->
    </f7-block>


    <!-- Page content-->
    <!-- <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>

    <f7-block-title>Modals</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised popup-open="#my-popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised login-screen-open="#my-login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Panels</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised panel-open="left">Left Panel</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-list>
      <f7-list-item
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      ></f7-list-item>
      <f7-list-item
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      ></f7-list-item>
      <f7-list-item
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      ></f7-list-item>
    </f7-list> -->
  </f7-page>
</template>
<script>
import headerDefault from "@/components/header.vue";
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  components: {
    headerDefault,
  },
  computed: {
    ...mapGetters({
      company: "company",
    }),
    ...mapGetters(['searchCompanys']),
  },
  methods: {
    routerPages(key){
      this.$store.dispatch('fecthPageInternId', key);
      this.$f7router.navigate({
        name: 'salaoInterna'
      });
    },
    // setFullScreen(){
    //   const elem = document.documentElement;
    //   if (document.fullscreenElement){
    //     document.exitFullscreen();
    //   }else {
    //     elem.requestFullscreen();
    //   }
    // }
  },
  mounted() {
    // VERIFY DATABASE COMPANYS DATA
    this.$store.commit('SET_IS_LOADING', true);
    this.$store.dispatch('consultCompanys')
    .then((response) => {
      console.log('SUCESS:', response);
      this.$store.dispatch('fecthCompany', response);
      this.$store.commit('SET_IS_LOADING', false);
    }).catch((error) => {
      console.log('ERROR:', error);
      this.$store.commit('SET_IS_LOADING', false);
    })
    /////////////////////////////////
  },
};
</script>
<style lang="scss">
.home {
  background: #f8f8f8;
}
.content-home {
  padding-top: 100px;
  padding-bottom: 100px;
  &-header {
    margin-bottom: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      font-size: 24px;
      color: #414143;
      line-height: 1;
      font-family: "Font Bold";
      margin: 0;
      @media (max-width: 359px) {
        font-size: 20px;
      }
    }
    .icon-right {
      width: 40px;
      height: 40px;
      transform: rotate(90deg);
      margin-left: 10px;
      @media (max-width: 359px) {
        width: 30px;
        height: 30px;
      }
    }
  }
  &-body {
    .content-cards {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 4px;
      border: 1px solid #f2f2f2;
      margin-bottom: 12px;
      // box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05);
      background: #fff;
      &-image {
        width: 60px;
        height: 60px;
        border: 1px solid #f2f2f2;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        img {
          max-width: 60px;
          max-height: 60px;
          border-radius: 100%;
        }
      }
      &-text {
        border-left: 1px solid #f2f2f2;
        padding-left: 10px;
        width: calc(100% - 83px);
        &-header {
          margin-bottom: 10px;
          h2 {
            font-size: 14px;
            color: #3e3e3e;
            font-family: "Font Bold";
            line-height: 1;
            margin-bottom: 0;
          }
        }
        &-km {
          margin-bottom: 10px;
          p {
            font-size: 12px;
            font-family: "Font Light";
            color: #717171;
            margin-bottom: 3px;
            line-height: 1.2;
          }
        }
        &-time {
          p {
            font-size: 12px;
            font-family: "Font Light";
            color: #717171;
            margin-bottom: 0;
            line-height: 1;
            span {
              display: block;
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
}
</style>