<template>
  <f7-page class="salon-intern" name="salon-intern">
    <f7-navbar>
      <a class="link" href="/" data-animate="false" data-reload-current="true">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="chevron-left"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
        >
          <path
            d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z"
            class=""
          ></path>
        </svg>
        <p>{{ company.name}}</p>
      </a>
    </f7-navbar>
    <div class="content-salon-intern">
      <div class="content-salon-intern-header"> 
        <div class="content-salon-intern-logo">
          <div class="content-image" v-if="company.picture">
            <img
              class="img-fluid"
              :src="company.picture"
              alt="logo company"
              title="logo company"
            />
          </div>
          <div class="content-text" v-else>
            <h2>{{ company.name}}</h2>
          </div>
        </div>
        <div class="content-salon-intern-description" :class="{'not-image': !company.picture}">
          <div class="content-text-name" v-if="company.picture">
            <h2>{{ company.name}}</h2>
          </div>
          <div class="content-text-name-not-image" v-else>
            <h2>Informações:</h2>
          </div>
          <div class="content-text-details" v-if="company.typeServices">
            <p>Tipo: {{ company.typeServices }}</p>
          </div>
          <div class="content-text-details">
            <p>Jornada de trabalho: {{ company.workday }}</p>
          </div>
          <div class="content-text-details">
            <p>Horário de funcionamento: {{ company.hourEstablishment }}</p>
          </div>
          <div class="content-text-details">
            <p>Tempo médio de serviços: {{ company.timeAverage }}</p>
          </div>
          <div class="content-text-details">
            <p>Telefone: {{ company.telphone }}</p>
          </div>
          <div class="content-text-km">
            <h2> Endereço: </h2>
            <p>{{ company.address }}</p>
            <p>Bairro: {{ company.neighborhood }}</p>
            <p>Cidade: {{ company.city }}</p>
            <p>Estado: {{ company.state }}</p>
          </div>
        </div>
      </div>
      <div class="content-salon-intern-body">
        <!-- <div class="content-salon-intern-menu">
          <div class="content-salon-intern-menu-div container">
            <a
              class="btn-menu-mobile"
              v-for="n in 4"
              :key="n"
              :href="'#element-' + n"
              @click="btnMenuMobile($event)"
            >
              Corte e Barba - {{ n }}
            </a>
          </div>
        </div> -->
        <!-- v-for="n in 4" :key="n" :id="'element-' + n" -->
        <div class="content-salon-intern-others">
          <div class="content-elements" v-if="Object.keys(service).length > 0">
            <div class="content-elements-header">
              <h2>Serviços</h2>
            </div>
            <div class="content-elements-body">
              <card-services @scheduleService="serviceChosen = $event" :service="service" />
            </div>
          </div>
          <template v-else>
            <div class="not-service not-service-intern">
              <p class="text"> Nenhum serviço disponivel nesta empresa. </p>
              <span class="icon">&#128533;</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <modal-date :company="company" :serviceChosen="serviceChosen"/>
  </f7-page>
</template>

<script>
import cardServices from "@/components/card.vue";
import modalDate from "@/components/modal-date.vue";
import { mapGetters } from "vuex";
import firebase from "firebase";
import { TheMask } from "vue-the-mask";

export default {
  data() {
    return {
      company: this.$store.state.company[this.$store.state.pageInternId],
      serviceChosen: {},
    }
  },
  components: {
    cardServices,
    modalDate,
    TheMask
  },
  computed: {
    ...mapGetters({
      service: "service",
    }),
  },
  // methods: {
  //   btnMenuMobile($event) {
  //     // REMOVE CLASS ACTIVE ALL BUTTONS
  //     let btnMenuMobile = document.querySelectorAll(".btn-menu-mobile");
  //     btnMenuMobile.forEach(function (list) {
  //       list.classList.remove("active");
  //     });
  //     // ADD CLASS ACTIVE THIS BUTTON
  //     let element = $event.target;
  //     element.classList.toggle("active");

  //     // SCROLL ELEMENT
  //     event.preventDefault();
  //     var topOfElement =
  //       document.querySelector(element.getAttribute("href")).offsetTop - 50;

  //     // SCROLL TARGET ELEMENT POSITION
  //     this.$f7.$(".page-content").scrollTop(topOfElement, 500);
  //   },
  // },
  mounted() {
    this.$store.commit('SET_IS_LOADING', true);
    // CONSULT DATABASE SERVICES DATA
    this.$store.dispatch('consultServices', [this.company.idUser, this.company.idCompany]);
    ///////////////////////////////
  },
};
</script>

<style lang="scss">
.salon-intern {
  .navbar {
    &-bg {
      background: #104069;
    }
    a {
      padding-left: 15px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 18px;
        font-family: "Font Bold";
        color: #fff;
        margin-bottom: 0;
        padding-left: 5px;
        padding-top: 5px;
      }
      svg {
        width: 25px;
        height: 25px;
        fill: #fff;
      }
    }
  }
}
.content-salon-intern {
  padding-bottom: 100px;
  &-logo {
    text-align: center;
    padding-top: 30px;
    height: 70px;
    width: 100%;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      z-index: -1;
    }
    .content-image {
      text-align: center;
      background: #fff;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      max-height: 100px;
      min-height: 100px;
      img {
        max-width: 100px;
        max-height: 100px;
        border-radius: 100%;
      }
    }
    .content-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      h2 {
        font-size: 24px;
        color: #fff;
        font-family: 'Font Bold';
        text-shadow: 1px 1px 1px rgba(255,255,255,0.5);
        padding: 0px 30px;
      }
    }
  }
  &-description {
    padding: 50px 20px 15px 20px;
    border-bottom: 8px solid #f7f7f7;
    .content-text {
      &-name {
        h2 {
          font-size: 20px;
          font-family: "Font Bold";
          color: #3f3e3e;
          margin-bottom: 6px;
          line-height: 1;
        }
      }
      &-details,
      &-time{
        padding: 2.5px 0px;
        p {
          font-size: 14px;
          color: #717171;
          font-family: "Font Regular";
          margin-bottom: 0;
        }
      }
      &-km {
        border-top: 1px solid #f2f2f2;
        padding-top: 15px;
        margin-top: 15px;
        h2 {
          font-size: 16px;
          font-family: "Font Bold";
          line-height: 1;
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
          color: #717171;
          font-family: "Font Regular";
          margin-bottom: 0;
          padding: 2.5px 0px;
        }
      }
    }
  }
  &-menu {
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    overflow-x: auto;
    @media (max-width: 991px) {
      overflow: -moz-scrollbars-none;
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
      }
    }
    @media (min-width: 992px) {
      border: 0;
      &::-webkit-scrollbar {
        height: 5px;
      }
      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #104069;
      }
      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: rgba(204, 0, 0, 0.8);
      }
    }
    &-div {
      display: inline-flex;
      padding-bottom: 10px;
      @media (max-width: 991px) {
        padding: 0;
      }
    }
    a {
      color: #a6a5a5 !important;
      font-size: 16px;
      padding: 0 10px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: max-content;
      margin-right: 20px;
      border-bottom: 2px solid transparent;
      transition: 500ms;
      text-decoration: none !important;
      &:first-child {
        margin-left: 20px;
      }
    }
    .active {
      color: #ea1d2c !important;
      border-bottom: 2px solid #ea1d2c;
    }
  }
  &-highlights {
    &-header {
      padding: 20px;
      h2 {
        font-size: 20px;
        color: #2a2a2a;
        line-height: 1;
        font-family: "Font Bold";
        margin: 0;
      }
    }
  }
  &-others {
    padding-top: 20px;
    .content-elements {
      &-header {
        padding: 20px;
        h2 {
          font-size: 20px;
          color: #2a2a2a;
          line-height: 1;
          font-family: "Font Bold";
          margin: 0;
        }
      }
      &-body {
        padding: 0px 20px;
      }
    }
  }
}
.not-service-intern {
  margin-top: 30px;
  padding: 0px 30px;
}
.not-image {
  padding-top: 30px;
}
.content-text-name-not-image {
  h2 {
    font-size: 16px;
    font-family: "Font Bold";
    line-height: 1;
    margin-bottom: 10px;
  }
}
</style>