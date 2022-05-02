<template>
  <f7-page class="schedules" name="schedules">
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
        <p>Agendamentos</p>
      </a>
    </f7-navbar>
    <f7-block class="content-schedules">
      <div class="content-schedules-itens">
        <div class="content-schedules-itens-body">
          <template v-if="Object.keys(schedules).length > 0">
            <div class="content-card-schedules" :class="{'opacity-card': schedulesList.dateExceeded}" v-for="(schedulesList, n) in schedules" :key="n">
              <div class="content-card-schedules-date">
                <p>{{schedulesList.date }} - {{schedulesList.hour[0]}}</p>
              </div>
              <div class="content-card-schedules-description">
                <p class="text-company">{{ schedulesList.company[0].name}}</p>
                <p class="text-default">Telefone: {{ schedulesList.company[0].telphone}}</p>
                <p class="text-default">Preço: {{ schedulesList.price[0]}}</p>
                <p class="text-default">Serviço: {{ schedulesList.service[0]}}</p>
                <p class="text-default">Tempo de serviço: {{ schedulesList.time[0]}}</p>
                <p class="text-status" v-if="schedulesList.dateExceeded">Status: Concluido</p>
                <button class="btn-cancel" v-else @click="cancelSchedule(schedulesList)">Cancelar</button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="not-service fixed">
              <p class="text"> Nenhum Agendamento Realizado! </p>
              <span class="icon">&#128533;</span>
            </div>
          </template>
        </div>
      </div>
    </f7-block>
  </f7-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters('Scheduling', ['schedules']),
  },
  methods: {
    cancelSchedule(schedulesList) {
      var self = this;
      this.$f7.dialog.confirm('Tem certeza que deseja cancelar o agendamento?', function () {
        self.$store.commit('SET_IS_LOADING', true);
        self.$store.dispatch('Scheduling/cancelSchedule', schedulesList);
      });
    }
  },
  mounted() {
    var self = this;
    this.$store.commit('SET_IS_LOADING', true);
    this.$store.dispatch('Scheduling/consultSchedules', this.user).then(function(resp){
    }).catch(function(error){
      self.$store.commit('SET_IS_LOADING', false);
    });
    console.log(this.schedules);
  }
};
</script>

<style lang="scss">
.schedules {
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
.content-schedules {
  padding-bottom: 100px;
  &-itens {
    &-body {
      .content-card-schedules {
        box-shadow: 0px 1px 1px rgba(0,0,0,0.2);
        padding: 20px;
        margin-bottom: 20px;
        background: #fff;
        &-date {
          display: flex;
          align-items: center;
          text-align: center;
          width: 100%;
          height: 30px;
          padding: 5px;
          // background-color: #104069;
          p {
            font-size: 20px;
            font-family: "Font Bold";
            color: #104069;
            margin-bottom: 0;
            line-height: 1;
            span {
              font-family: "Font Light";
              display: block;
            }
          }
        }
        &-description {
          padding-top: 20px;
          .text-company {
            color: #000;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            font-size: 16px;
            font-family: "Font Bold";
            margin-bottom: 5px;
            line-height: 1;
          }
          .text-default {
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            font-weight: lighter;
            color: #717171;
            word-break: break-word;
            font-size: 14px;
            font-family: "Font Regular";
            margin-bottom: 2px;
          }
          .text-status {
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            font-weight: lighter;
            color: #50a773;
            word-break: break-word;
            font-size: 14px;
            font-family: "Font Regular";
            margin-bottom: 2px;
          }
          .btn-cancel {
            height: 30px;
            width: 40%;
            max-width: 130px;
            font-size: 12px;
            font-family: "Font Bold";
            color: #fff !important;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(to right, #cc0000, #fd4653);
            border: 0;
            transition: 500ms;
            outline: none;
            border-radius: 30px;
            margin-top: 15px;
            &:hover,
            &:focus {
              color: pointer;
              opacity: 0.8;
            }
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
.opacity-card {
  opacity: 0.6;
}
</style>
