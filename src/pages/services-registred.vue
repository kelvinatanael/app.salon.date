<template>
  <f7-page class="services-registred" name="services-registred">
    <f7-navbar>
      <a class="link" href="/gerenciar/">
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
        <p>Serviços registrados</p>
      </a>
    </f7-navbar>
    <f7-block class="content-services-registred">
      <div class="content-services-registred-header">
        <h2>Serviços Registrados</h2>
      </div>
      <div class="content-services-registred-body">
        <div v-if="Object.keys(companySchedules).length > 0" class="content-select">
          <select v-model="selectCompany" @change="changeCompany()">
            <option v-for="(companySchedulesList, n) in companySchedules" :key="n" :value="companySchedulesList.idCompany">
              {{ companySchedulesList.name }}
            </option>
          </select>
          <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"></path>
          </svg>
        </div>
        <template v-if="Object.keys(service).length > 0">
          <div class="content-card-services" v-for="(serviceList, n) in service" :key="n">
            <div class="content-card-services-image" v-if="serviceList.picture !== ''" :style="{'background': 'url('+ serviceList.picture +')'}">
            </div>
            <div class="content-card-services-name">
              <p>{{ serviceList.name }}</p>
            </div>
            <div class="content-card-services-description" v-if="serviceList.description !== ''">
              <p>Descrição: {{ serviceList.description }}</p>
            </div>
            <div class="content-card-services-description">
              <p>Tempo de serviço: {{ serviceList.time }}</p>
            </div>
            <div class="content-card-services-price">
              <p>Preço: {{ serviceList.price }}</p>
            </div>
            <div class="content-card-services-btns">
              <button class="btn-delete" @click="deleteService(n)">
                Apagar
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="trash"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                    class=""
                  ></path>
                </svg>
              </button>
              <a class="btn-edit" @click="updateService(n)">
                Editar
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="edit"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                    class=""
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="not-service fixed">
            <p class="text"> Nenhum Serviço Registrado! </p>
            <span class="icon">&#128533;</span>
          </div>
        </template>
      </div>
    </f7-block>
  </f7-page>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      idUser: this.$store.state.user.data.id,
      selectCompany: null,
    };
  },
  computed: {
    ...mapGetters({
      service: "service",
    }),
    ...mapGetters(['user']),
    ...mapGetters('Scheduling', ['companySchedules'])
  },
  methods: {
    deleteService(key) {
      var self = this;
      this.$f7.dialog.confirm('Tem certeza que deseja excluir o serviço?', function () {
        var tableServices = firebase.database().ref("/services");
        tableServices
          .child(key)
          .remove()
          .then(() => {
            self.$f7.dialog.alert("Serviço Excluido com Sucesso!");
            self.$store.dispatch('consultServices', [self.idUser, self.selectCompany]);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
    },
    updateService(key) {
      this.$store.dispatch("fecthEditService", key);
      this.$f7router.navigate("/editar-servicos/");
    },
    changeCompany() {
      this.$store.commit("SET_IS_LOADING", true);
      this.$store.dispatch('consultServices', [this.idUser, this.selectCompany]);
    }
  },
  mounted() {
    this.$store.commit("SET_IS_LOADING", true);
    this.$store.dispatch('Scheduling/consultCompanyKeys', this.user.data.id).then((value) => {
      var data = {};
      if (value !== null){
        var keys = [];
        Object.keys(value).forEach(function (item) {
          keys.push(item);
        });
        for (let i = 0; i < Object.keys(value).length; i++) {
          if (this.user.data.id == value[keys[i]].idUser) {
            data[keys[i]] = value[keys[i]];
            if (i === 0) {
              this.selectCompany = value[keys[i]].idCompany;
            }
          }
        }
      }
      this.$store.commit("Scheduling/SET_COMPANY_SCHEDULES", data);
      this.$store.dispatch('consultServices', [this.idUser, this.selectCompany]);
    }).catch((error) => {
      console.log('Error:', error);
      this.$store.commit("SET_IS_LOADING", false);
    })
  }
};
</script>
<style lang="scss">
.services-registred {
  padding: 0px 0px 66px 0px;
  background: #f8f8f8;
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
.content-services-registred {
  &-header {
    margin-bottom: 30px;
    text-align: center;
    h2 {
      font-size: 24px;
      font-family: "Font Bold";
      color: #000;
      margin-bottom: 0;
    }
  }
  &-body {
    .content-card-services {
      position: relative;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 12px;
      transition: 500ms;
      display: block;
      text-decoration: none !important;
      padding: 20px;
      border: 1px solid #f2f2f2;
      &-image {
        background-size: contain !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        height: 100px;
        width: 100px;
        margin: 0 auto 20px auto;
      }
      &-name {
        margin-bottom: 10px;
        p {
          color: #3e3e3e;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          font-size: 20px;
        }
      }
      &-description {
        margin-bottom: 10px;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          font-weight: lighter;
          color: #717171;
          word-break: break-word;
          font-size: 16px;
        }
      }
      &-price {
        p {
          font-size: 18px;
          line-height: 1.25rem;
          font-weight: 400;
          color: #50a773;
        }
      }
      &-btns {
        display: flex;
        align-items: center;
        margin-top: 30px;
        .btn-delete {
          height: 35px;
          width: 40%;
          font-size: 14px;
          font-family: "Font Bold";
          color: #fff !important;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to right, #cc0000, #fd4653);
          border: 0;
          transition: 500ms;
          outline: none;
          margin-right: 15px;
          border-radius: 30px;
          &:hover,
          &:focus {
            color: pointer;
            opacity: 0.8;
          }
          svg {
            fill: #fff;
            width: 15px;
            height: 15px;
            margin-left: 10px;
          }
        }
        .btn-edit {
          height: 35px;
          width: 40%;
          max-width: 130px;
          font-size: 14px;
          font-family: "Font Bold";
          color: #fff !important;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to right, #99d281, #50a773);
          border: 0;
          transition: 500ms;
          outline: none;
          border-radius: 30px;
          svg {
            fill: #fff;
            width: 15px;
            height: 15px;
            margin-left: 10px;
          }
          &:hover,
          &:focus {
            color: pointer;
            opacity: 0.8;
          }
        }
      }
    }
    .content-select  {
      margin-bottom: 30px;
      position: relative;
      select {
        width: 100%;
        height: 45px;
        padding-left: 20px;
        font-size: 16px;
        font-family: "Font Regular";
        color: #303030;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: 0;
        background: #fff;
        border-bottom: 1px solid #cfcfcf;
      }
      svg {
        fill: #104069;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 20px;
        pointer-events: none;
      }
    }
  }
}
.not-service {
  text-align: center;
  .text {
    font-size: 16px;
    font-family: "Font Bold";
    color: #000;
    margin-bottom: 0;
  }
  .icon{
    font-size: 50px;
  }
}
</style>
