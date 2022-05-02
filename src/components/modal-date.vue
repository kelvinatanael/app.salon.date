<template>
  <!-- Popup -->
  <f7-popup class="modal-date" id="my-popup">
    <f7-view>
      <f7-page>
        <f7-navbar title="Agenda">
          <f7-nav-right>
            <f7-link popup-close>
              <svg
                width="30px"
                height="30px"
                fill="#fff"
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
            </f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <div class="modal-body">
            <div class="modal-body-image" v-if="serviceChosen.picture !== ''">
              <img :src="serviceChosen.picture" alt="image service" title="image service" />
            </div>
            <div class="modal-body-choice">
              <p>
                Você Escolheu:<span> {{ serviceChosen.name }}</span>
              </p>
            </div>
            <div class="modal-body-price">
              <p>
                Preço: <span>{{ serviceChosen.price }}</span>
              </p>
            </div>
            <div class="modal-body-observation">
              <p>
                Observação: O Pagamento do valor deverá ser efetuado no local.
              </p>
            </div>
            <div class="modal-body-header">
              <h2>Selecione o dia e hora do serviço</h2>
            </div>
            <div class="modal-body-element">
              <div class="modal-body-element-date">
                <div class="modal-body-element-date-header">
                  <div class="modal-body-element-date-header-text">
                    <p>Dia</p>
                  </div>
                  <!-- <div class="modal-body-element-date-header-situation">
                    <div>
                      <span></span>
                      <p>Disponível</p>
                    </div>
                    <div>
                      <span></span>
                      <p>Ocupado</p>
                    </div>
                  </div> -->
                </div>
                <div class="modal-body-element-date-body">
                  <div class="block block-strong no-padding">
                    <calendar :company="company" :serviceChosen="serviceChosen" />
                  </div>
                </div>
              </div>
              <div class="modal-body-element-hour" v-if="hourState.situation">
                <div class="modal-body-element-hour-header">
                  <div class="modal-body-element-hour-header-text">
                    <p>Horário</p>
                  </div>
                  <div class="modal-body-element-hour-header-situation">
                    <div>
                      <span></span>
                      <p>Disponível</p>
                    </div>
                    <div>
                      <span></span>
                      <p>Ocupado</p>
                    </div>
                  </div>
                </div>
                <div class="modal-body-element-hour-body">
                  <div class="available" :class="{
                  ocuped: companyHour[n].scheduling, 
                  inative: companyHour[n].hourExceeded,
                  }" 
                  @click="selectedHour(companyHour[n].hour, $event)" 
                  v-for="(hoursList, n) in companyHour" :key="n">
                    <p>{{ hoursList.hour }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-date-btns" v-if="hourState.hour !== null">
              <button class="popup-close">Fechar</button>
              <button @click="checkTypeUser()">Confirmar</button>
            </div>
          </div>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-popup>
  <!----------->
</template>

<script>
import { mapGetters} from "vuex";
import calendar from './calendar';

export default {
  data() {
    return {
      keyCompany: this.$store.state.pageInternId,
    }
  },
  props: {
    serviceChosen: Object,
    company: Object,
  },
  components: {
    calendar,
  },
  computed: {
    ...mapGetters('Scheduling', ['companyHour', 'hourState', 'dateChosen', 'reservation']),
    ...mapGetters(['user']),
  },
  methods: {
    selectedHour(index, $event){
      var result = index;
      
      // REMOVE CLASS ACTIVE ALL BUTTONS
      let btnAvailable = document.querySelectorAll(".available");
      btnAvailable.forEach(function (list) {
        list.classList.remove("active");
      });

      // ADD CLASS ACTIVE THIS BUTTON
      let element = $event.target;
      element.classList.toggle("active");

      this.$store.commit('Scheduling/SET_HOUR_STATE', {
        situation: true,
        hour: result,
      });
    },
    checkTypeUser() {
      var self = this;
      if (this.user.typeUser === 'professional'){
        self.$f7.dialog.prompt('Qual o nome da pessoa para o agendamento?', function (name) {
          self.$f7.dialog.confirm('Tem certeza que o nome é ' + name + '?', function () {
            self.$f7.dialog.alert('Ok, o nome da pessoa para o agendamento é ' + name);
            self.user.data.name = name;
            self.setReservation();
          });
        });
      } else {
        this.setReservation();
      }
    },
    setReservation() {
      var self = this;
      
      this.$store.commit('SET_IS_LOADING', true);
      this.$store.commit('Scheduling/SET_RESERVATION', {
        date: this.dateChosen,
        hour: this.hourState,
        service: this.serviceChosen,
        user: this.user,
        company: this.company
      });

      this.$store.
      dispatch('Scheduling/registerReservation', [this.reservation, this.keyCompany])
      .then(function(){
        self.$store.commit('SET_IS_LOADING', false);
        
        var date = self.reservation.date.date.day + '/' +
             self.reservation.date.date.month + '/' + 
             self.reservation.date.date.year;
        self.$f7.dialog.alert(`
          A reserva foi realizada: <br>
          Nome: ${self.reservation.user.data.name} <br>
          Data: ${date}<br>
          Horário: ${self.reservation.hour.hour}<br>
          ------------------------------------------<br>
          Empresa: ${self.reservation.company.name}<br>
          Serviço: ${self.reservation.service.name}<br>
          Preço: ${self.reservation.service.price}<br>
          Tempo de Serviço: ${self.reservation.service.time}<br>
        `);

        console.log('Data-2:', date);
        // CHECK TYPE USER FOR REDIRECT
        if (self.user.typeUser === 'professional'){
          self.$f7router.navigate("/gerenciar-agendamentos/");
        } else {
          self.$f7router.navigate("/agendamentos/");
        }

        self.$f7.popup.close('.modal-date');
      }).catch(function(error) {
        console.error("Error writing document: ", error);
        self.$store.commit('SET_IS_LOADING', false);
      });
    }
  },
  mounted() {
    this.$store.dispatch('Scheduling/consultCompanyHour', this.keyCompany);
  }
};
</script>

<style lang="scss">
/* CUSTOMIZE CSS CALENDAR MODAL */
.modal-date {
  @media (min-width: 991px) {
    width: 825px !important;
  }
  .navbar-bg {
    background: #104069;
  }
  .popup-close,
  .title {
    color: #fff;
  }
  .modal-body {
    &-image {
      text-align: center;
      margin-bottom: 10px;
      img {
        max-width: 100%;
        max-height: 20vh;
      }
    }
    &-choice {
      p {
        font-size: 16px;
        color: #000;
        margin-bottom: 0;
        font-family: "Font Regular";
        span {
          color: rgba(204, 0, 0, 1);
          font-family: "Font Bold";
        }
      }
    }
    &-price {
      p {
        font-size: 16px;
        color: #000;
        margin-bottom: 0;
        font-family: "Font Regular";
        span {
          color: #50a773;
          font-family: "Font Bold";
        }
      }
    }
    &-observation {
      margin-bottom: 30px;
      p {
        font-size: 12px;
        font-family: "Font Light";
        color: #707070;
        margin-bottom: 0;
      }
    }
    &-header {
      margin-bottom: 30px;
      text-align: center;
      h2 {
        font-size: 24px;
        font-family: "Font Regular";
        color: #000;
        @media (max-width: 991px) {
          font-size: 20px;
        }
      }
    }
    &-element {
      display: flex;
      @media (max-width: 991px) {
        flex-direction: column;
      }
      &-date {
        width: 50%;
        padding-right: 40px;
        border-right: 1px solid rgba(112, 112, 112, 0.25);
        @media (max-width: 991px) {
          padding-right: 0;
          border-right: 0px;
          border-bottom: 1px solid #707070;
          width: 100%;
        }
        &-header {
          padding-bottom: 15px;
          border-bottom: 1px solid #f1c761;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &-text {
            p {
              font-size: 25px;
              font-family: "Font REgular";
              color: #f1c761;
              margin-bottom: 0px;
              @media (max-width: 991px) {
                font-size: 20px;
              }
            }
          }
          &-situation {
            display: flex;
            align-items: center;
            div {
              display: flex;
              align-items: center;
              span {
                width: 16px;
                height: 16px;
                display: block;
                border-radius: 100%;
              }
              p {
                font-size: 9px;
                font-family: "Font Regular";
                color: #000;
                margin-bottom: 0px;
                margin-left: 10px;
              }
              &:first-of-type {
                margin-right: 30px;
                @media (max-width: 991px) {
                  margin-right: 15px;
                }
                span {
                  border: 1px solid #99d281;
                }
              }
              &:last-of-type {
                span {
                  border: 1px solid #cb7c7c;
                }
              }
            }
          }
        }
        &-body {
          padding-top: 12px;
        }
      }
      &-hour {
        width: 50%;
        padding-left: 40px;
        @media (max-width: 991px) {
          padding-left: 0;
          padding-top: 30px;
          width: 100%;
        }
        &-header {
          padding-bottom: 15px;
          border-bottom: 1px solid #f1c761;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &-text {
            p {
              font-size: 25px;
              font-family: "Font REgular";
              color: #f1c761;
              margin-bottom: 0px;
              @media (max-width: 991px) {
                font-size: 20px;
              }
            }
          }
          &-situation {
            display: flex;
            align-items: center;
            div {
              display: flex;
              align-items: center;
              span {
                width: 36px;
                height: 16px;
                display: block;
                border-radius: 20px;
                @media (max-width: 991px) {
                  width: 30px;
                }
              }
              p {
                font-size: 9px;
                font-family: "Font Regular";
                color: #000;
                margin-bottom: 0px;
                margin-left: 10px;
              }
              &:first-of-type {
                margin-right: 30px;
                @media (max-width: 991px) {
                  margin-right: 15px;
                }
                span {
                  border: 1px solid #99d281;
                }
              }
              &:last-of-type {
                span {
                  border: 1px solid #cb7c7c;
                  background: #cb7c7c;
                }
              }
            }
          }
        }
        &-body {
          display: flex;
          flex-wrap: wrap;
          padding-top: 30px;
          @media (max-width: 991px) {
            justify-content: center;
          }
          p {
            font-size: 14px;
            font-family: "Font Regular";
            text-transform: uppercase;
            line-height: 1;
            @media (min-width: 992px) {
              font-size: 16px;
            }
          }
          div {
            width: 70px;
            margin-right: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
            border-radius: 20px;
            height: 30px;
            cursor: pointer;
            @media (min-width: 991px) {
              width: 90px;
              margin-right: 25px;
              margin-bottom: 30px;
              height: 40px;
            }
            &:nth-child(3n) {
              margin-right: 0px;
              @media (max-width: 991px) {
                margin-right: 15px;
              }
            }
          }
          .available {
            border: 2px solid #99d281;
            p {
              color: #000;
              margin-bottom: 0px;
              pointer-events: none;
            }
          }
          .ocuped {
            background: #cb7c7c;
            border: 2px solid #cb7c7c;
            pointer-events: none;
            p {
              color: rgba(255, 255, 255, 0.5);
            }
          }
          .inative {
            pointer-events: none;
            border: 2px solid transparent;
            p {
              color: rgba(0, 0, 0, 0.25);
              margin-bottom: 0px;
            }
          }
          .inative.disabled {
            opacity: 0.25;
            p {
              color: #000 !important;
            }
          }
          .active {
            background: #99d281;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            p {
              color: #fff;
            }
          }
          .disabled {
            opacity: 0.5;
            pointer-events: none;
          }
        }
      }
    }
  }
  &-btns {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    button {
      width: 140px;
      height: 45px;
      border-radius: 30px;
      transition: 500ms;
      outline: none;
      &:hover,
      &:focus {
        cursor: pointer;
        opacity: 0.8;
      }
      &:first-of-type {
        border: 3px solid #b7b7b7;
        font-size: 20px;
        font-family: "Font Regular";
        background: #fff;
        color: #b7b7b7;
        margin-right: 10px;
      }
      &:last-of-type {
        background: #99d281;
        border: 0;
        font-size: 20px;
        font-family: "Font Regular";
        color: #fff;
      }
    }
  }
}
/* **************************** */
</style>