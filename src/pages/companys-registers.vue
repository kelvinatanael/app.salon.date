<template>
  <f7-page class="companys-registers" name="companys-registers">
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
        <p>Empresas Registradas</p>
      </a>
    </f7-navbar>
    <f7-block class="content-companys-registers">
      <div class="content-companys-registers-body">
        <template v-if="Object.keys(company).length > 0">
          <div class="content-cards" v-for="(companyList, n) in company" :key="n" >
            <div class="content-cards-element">
              <div class="content-cards-image" v-if="companyList.picture">
                <img
                  class="img-fluid"
                  :src="companyList.picture"
                  alt="Logo Company"
                  title="Logo Company"
                />
              </div>
              <div class="content-cards-text">
                <div class="content-cards-text-header">
                  <h2>{{ companyList.name }}</h2>
                </div>
                <div class="content-cards-text-km">
                  <p v-if="companyList.typeServices != ''">Tipo de serviços: {{ companyList.typeServices }}</p>
                  <p>Telefone: {{ companyList.telphone }} </p>
                </div>
              </div>
            </div>
            <div class="content-cards-text-address mb-20">
              <div class="content-cards-text-address-information">
                <h2>Jornada da Empresa:</h2>
                <a class="link popover-open" href="#" data-popover=".popover-alert">
                  <svg height="20" width="20" fill="#cc0000" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" class=""></path></svg>
                </a>
              </div>
              <p>Jornada de trabalho: {{ companyList.workday }}</p>
              <p>Horário: {{ companyList.hourEstablishment }}</p>
              <p>Tempo médio de serviços: {{ companyList.timeAverage }}</p>
            </div>
            <div class="content-cards-text-address">
              <h2> Endereço: </h2>
              <p> {{ companyList.address }}</p>
              <p>CEP: {{ companyList.cep }}</p>
              <p>Bairro: {{ companyList.neighborhood }}</p>
              <p>Cidade: {{ companyList.city }}</p>
              <p>Estado: {{ companyList.state }}</p>
            </div>
            <div class="content-cards-btns">
              <button class="btn-delete" @click="deleteCompany(n)">
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
              <a class="btn-edit" @click="updateCompany(n)">
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
            <p class="text"> Nenhuma Empresa Registrada! </p>
            <span class="icon">&#128533;</span>
          </div>
        </template>
      </div>
    </f7-block>
    <!--- POPOVER ALERT -->
    <div class="popover popover-alert">
      <div class="popover-inner">
        <div class="block">
          <div class="content-text">
            <h2>Atenção!</h2>
            <p>
              Os dados da Jornada da Empresa não poderão sofrer alterações, devido a algumas implicações possíveis que pode ocasionar no agendamento dos clientes.
            </p>
            <p>
              Para a alteração o usuário deverá excluir a empresa e cria-lá novamente com os novos dados da Jornada da Empresa.
            </p>
          </div>
        </div>
        <!-- Link to close popover -->
        <a class="link popover-close">
          <svg
              width="20px"
              height="20px"
              fill="#cc0000"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="times"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                class=""
              ></path>
          </svg>
        </a>
      </div>
    </div>
    <!-------------------->
  </f7-page>
</template>
<script>
import { TheMask } from "vue-the-mask";
import { mapGetters } from 'vuex';

import firebase from "firebase";

export default {
  data() {
    return {
      company: {},
    };
  },
  components: {
    TheMask,
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  methods: {
    deleteCompany(key) {
      var self = this;
      this.$f7.dialog.confirm('Tem certeza que deseja excluir a empresa, essa ação removerá todas os dados da empresa como "Serviços, Agendamentos e outros"?', function () {
        self.$store.dispatch('deleteCompany', key).then(() => {
          self.$store.dispatch('deleteServices').then((value) => {
            var tableServices = firebase.database().ref("/services");
            var keys = [];
            Object.keys(value).forEach(function (item) {
              keys.push(item);
            });
            for (let i = 0; i < Object.keys(value).length; i++) {
              if (key == value[keys[i]].idCompany) {
                tableServices.child(keys[i]).remove();
              }
            }
            self.$store.dispatch('Scheduling/deleteSchedulesCompany', key).then(() => {
              self.consultCompanysKeys();
              self.$f7.dialog.alert("Empresa Excluida com Sucesso!");
            }).catch((error) => {
              console.log('ERROR:', error);
            });
          }).catch((err) => {
            console.log('ERROR:', err.message);
          })
        }).catch((err) => {
            console.log('ERROR:', err.message);
        });
      });
    },
    consultCompanysKeys() {
      this.$store.commit('SET_IS_LOADING', true);
       this.$store.dispatch('Scheduling/consultCompanyKeys', this.user.data.id).then((response) => {
        console.log('SUCESS:', response);
        
        var data = {};
        response ? data = response : data = {};

        this.company = data;
        this.$store.commit('SET_IS_LOADING', false);
      }).catch((error) => {
        console.log('ERROR:', error);
        this.$store.commit('SET_IS_LOADING', false);
      })
    },
    updateCompany(key) {
      this.$store.dispatch('fecthEditCompany', key);
      this.$f7router.navigate("/editar-empresa/");
    },
  },
  mounted() {
    // VERIFY DATABASE COMPANYS DATA
    this.$store.commit('SET_IS_LOADING', true);
    this.$store.dispatch('consultCompanys')
    .then((response) => {
      console.log('SUCESS:', response);

      this.$store.dispatch('fecthCompany', response);
      this.consultCompanysKeys()
      
      this.$store.commit('SET_IS_LOADING', false);
    }).catch((error) => {
      console.log('ERROR:', error);
      this.$store.commit('SET_IS_LOADING', false);
    })
    /////////////////////////////////
  }
};
</script>
<style lang="scss">
.companys-registers {
  padding: 0px 0px 66px 0px;
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
.content-companys-registers {
  &-body {
    .content-cards {
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #f2f2f2;
      margin-bottom: 15px;
      // box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05);
      background: #fff;
      &-element {
        display: flex;
        border-bottom: 1px solid #f2f2f2;
        margin-bottom: 15px;
      }
      &-image {
        border-right: 1px solid #f2f2f2;
        padding-right: 10px;
        padding-bottom: 10px;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 80px;
        }
      }
      &-text {
        // padding-left: 10px;
        &-header {
          margin-bottom: 10px;
          h2 {
            font-size: 16px;
            font-family: "Font Bold";
            line-height: 1;
            margin-bottom: 0;
          }
        }
        &-km {
          margin-bottom: 10px;
          p {
            font-size: 14px;
            font-family: "Font Light";
            color: #717171;
            line-height: 1.2;
            margin-bottom: 10px;
          }
        }
        &-time {
          p {
            font-size: 12px;
            font-family: "Font Light";
            color: #717171;
            margin-bottom: 0;
            line-height: 1.2;
            span {
              display: block;
              margin-top: 5px;
            }
          }
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
      &-text-address {
        h2 {
          font-size: 16px;
          font-family: "Font Bold";
          line-height: 1;
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
          font-family: "Font Light";
          color: #717171;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        &-information {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          h2 {
            margin-bottom: 0;
            margin-right:  15px;
          }
          a {
            margin-bottom: 5px;
          }
        }
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
.fixed {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>