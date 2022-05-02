<template>
  <f7-page class="content-perfil" name="content-perfil">
    <f7-navbar>
      <a class="link" href="/">
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
        <p>Meu Perfil</p>
      </a>
    </f7-navbar>
    <f7-block class="content-perfil-registers">
      <div class="content-perfil-registers-body">
        <template v-if="user.information !== null">
          <div class="content-cards" v-for="(userList, n) in user.information" :key="n" >
            <div class="content-cards-element">
              <div class="content-cards-text">
                <div class="content-cards-text-header">
                  <h2>{{ userList.name }}</h2>
                </div>
                <div class="content-cards-text-km">
                  <p>E-mail: {{ userList.email }}</p>
                  <p>Telefone: {{ userList.telphone }} </p>
                </div>
              </div>
            </div>
            <div class="content-cards-btns">
              <!-- <button class="btn-delete" @click="deleteUser(n)">
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
              </button> -->
              <a class="btn-edit" @click="updateUser(n)">
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
        <a class="content-links" href="/alterar-senha/">
          <div class="content-links-name">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" class=""></path></svg>
            <p>Alterar Senha</p>
          </div>
          <div class="content-links-svg">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="chevron-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path
                d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"
                class=""
              ></path>
            </svg>
          </div>
        </a>
      </div>
    </f7-block>
  </f7-page>
</template>
<script>
import { TheMask } from "vue-the-mask";
import { mapGetters } from 'vuex';

import firebase from "firebase";

export default {
  components: {
    TheMask,
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  methods: {
    consultUser() {
      this.$store.commit('SET_IS_LOADING', true);
      this.$store.dispatch('consultUser').then((response) => {
        console.log('SUCESS:', response);
        var data = {};
        if (response !== null) {
          var keys = [];
          Object.keys(response).forEach(function (item) {
            keys.push(item);
          });
          for (let i = 0; i < Object.keys(response).length; i++) {
            if (this.user.data.id == response[keys[i]].idUser) {
              data[keys[i]] = response[keys[i]];
            }
          }
        }
        this.$store.dispatch('fetchUserData', data);
        this.$store.commit('SET_IS_LOADING', false);
      }).catch((error) => {
        console.log('ERROR:', error);
        this.$store.commit('SET_IS_LOADING', false);
      })
    },
    deleteUser(idTableUser) {
      var self = this;
      this.$f7.dialog.confirm('Tem certeza que deseja excluir a sua conta? <br> Está ação removerá todos os dados como: "agendamentos, dados pessoais e outros".', function () {
        self.$f7.dialog.password('Digite a sua senha para confirmar a exclusão da conta.', function(password){
          self.$store.dispatch('deleteUserLogin', password).then(() => {
            self.$store.dispatch('deleteUserTable', idTableUser).then((response) => {
              console.log('SUCESS:', response);
              self.$f7router.navigate('/');
            }).catch((error) => {
              console.log('ERROR:', error);
            });
          }).catch((error) => {
              console.log('ERROR:', error);
          });
        })
      });
    },
    updateUser(idTableUser){
      this.$store.dispatch('fecthEditUser', idTableUser);
      this.$f7router.navigate("/editar-usuario/");
    }
  },
  mounted() {
    this.consultUser();
  }
};
</script>
<style lang="scss">
.content-perfil {
  padding: 0px 0px 66px 0px;
  background: #f6f6f6;
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
.content-perfil-registers {
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
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 80px;
        }
      }
      &-text {
        padding-left: 10px;
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
      }
    }
    .content-links {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 15px;
      background: #fff;
      margin-bottom: 20px;
      border-bottom: 1px solid #cfcfcf;
      &-name {
        display: flex;
        align-items: center;
        svg {
          fill: #4c4c4c;
          width: 30px;
          height: 30px;
        }
      }
      &-svg {
        width: 40px;
        height: 40px;
        background: linear-gradient(to right, #104069, #509ee0);
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          fill: #fff;
          width: 20px;
          height: 20px;
        }
      }
      p {
        font-size: 16px;
        font-family: "Font Light";
        color: #4c4c4c;
        margin-bottom: 0;
        margin-left: 15px;
        line-height: 1;
        padding-top: 5px;
      }
    }
  }
}
</style>