<template>
  <f7-page class="manage-schedules" name="manage-schedules">
    <f7-navbar>
      <a class="link" href="/gerenciar/" data-animate="false" data-reload-current="true">
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
        <p>Gerenciar Agendamentos</p>
      </a>
    </f7-navbar>
    <f7-block class="content-manage-schedules">
      <template v-if="Object.keys(companySchedules).length > 0">
        <div class="content-manage-schedules-company">
          <div class="content-select">
            <select v-model="selectCompany" @change="companySelect()">
              <option v-for="(companySchedulesList, n) in companySchedules" :key="n" :value="companySchedulesList.idCompany">
                {{ companySchedulesList.name }}
              </option>
            </select>
            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"></path>
            </svg>
          </div>
        </div>
        <div class="content-manage-schedules-calendar">
          <template v-if="selectCompany">
            <calendar-manage @dateClick="clickDate = $event" :selectCompany="selectCompany"/>
          </template>
        </div>
        <template v-if="clickDate">
          <div class="content-manage-schedules-elements" v-if="Object.keys(manageSchedules).length > 0">
            <h2> Agendamentos </h2>
            <div class="content-card-schedules" :class="{'opacity-card': manageSchedulesList.dateExceeded }" v-for="(manageSchedulesList, n) in manageSchedules" :key="n">
              <div class="content-card-schedules-date">
                <p>{{manageSchedulesList.date }} - {{manageSchedulesList.hour[0]}}</p>
              </div>
              <div class="content-card-schedules-description">
                <p class="text-company">{{ manageSchedulesList.name[0]}}</p>
                <p class="text-default">Preço: {{ manageSchedulesList.price[0]}}</p>
                <p class="text-default">Serviço: {{ manageSchedulesList.service[0]}}</p>
                <p class="text-default">Tempo de serviço: {{ manageSchedulesList.time[0]}}</p>
                <p class="text-status" v-if="manageSchedulesList.dateExceeded">Status: Concluido</p>
                <button class="btn-cancel" v-else @click="cancelSchedule(manageSchedulesList)">Cancelar</button>
              </div>
            </div>
          </div>
          <div class="not-service not-service-padding" v-else>
            <p class="text"> Nenhum agendamento no dia! </p>
            <span class="icon">&#128533;</span>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="not-service fixed">
          <p class="text"> É necessário cadastrar uma empresa para gerenciar os agendamentos. </p>
          <span class="icon">&#128533;</span>
        </div>
      </template>
    </f7-block>
  </f7-page>
</template>

<script>
import { mapGetters } from "vuex";
import Dom7 from 'dom7';
import calendarManage from '@/components/calendar-manage.vue'

export default {
  data() {
    return {
      selectCompany: null,
      clickDate: false,
    };
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters('Scheduling', ['companySchedules', 'manageSchedules'])
  },
  components: {
    calendarManage
  },
  methods: {
    cancelSchedule(manageSchedulesList) {
      var self = this;
      this.$f7.dialog.confirm('Tem certeza que deseja cancelar o agendamento?', function () {
        self.$store.commit('SET_IS_LOADING', true);
        self.$store.dispatch('Scheduling/cancelScheduleManage', manageSchedulesList);
      });
    },
    companySelect() {
      this.$store.commit('SET_IS_LOADING', true);

      var $$ = Dom7;

      $$(".calendar-day").removeClass("calendar-day-selected");
      this.clickDate = false;

      setTimeout(() => {
        this.$store.commit('SET_IS_LOADING', false);
      }, 500);
    }
  },
  mounted() {
    this.$store.commit('SET_IS_LOADING', true);
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
      this.$store.commit("SET_IS_LOADING", false);
    }).catch((error) => {
      console.log('Error:', error);
      this.$store.commit("SET_IS_LOADING", false);
    })
  }
};
</script>

<style lang="scss">
.manage-schedules {
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
.smart-select-page  {
  .navbar {
    &-bg {
      background: #104069;
    }
    &-inner {
      .link {
        color: #fff;
      }
      .title {
        font-size: 18px;
        font-family: "Font Bold";
        color: #fff;
        margin-bottom: 0;
      }
    }
  }
}
.content-manage-schedules {
  padding-bottom: 100px;
  &-elements {
    // border-top: 2px solid #104069;
    margin-top: 50px;
    h2 {
      margin-bottom: 15px;
    }
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
  &-company {
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
  .demo-calendar-inline-container {
    border-bottom: 1px solid #cfcfcf;
  }
  .calendar-week-header, .calendar-custom-toolbar, .demo-calendar-inline-container{
    background: #fff;
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
  &-padding {
    margin-top: 30px;
  }
}
.opacity-card {
  opacity: 0.6;
}
</style>
