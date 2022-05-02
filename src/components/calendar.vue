<template>
  <div id="demo-calendar-inline-container"></div>
</template>

<script>
import Dom7 from "dom7";
import firebase from "firebase";
import mapState from "vuex";

export default {
  data() {
    return {
      keyCompany: this.$store.state.pageInternId,
    };
  },
  props: {
    serviceChosen: Object,
    company: Object,
  },
  methods: {
    selected(value) {
      this.$store.dispatch("Scheduling/consultReservation", [
        value,
        this.keyCompany,
      ]);
      this.$store.commit("Scheduling/SET_DATE_CHOSEN", {
        date: value,
      });
      this.$store.commit('Scheduling/SET_HOUR_STATE', {
        situation: true,
        hour: null,
      });
      // REMOVE CLASS ACTIVE ALL BUTTONS
      let btnAvailable = document.querySelectorAll(".available");
      btnAvailable.forEach(function (list) {
        list.classList.remove("active");
      });
    },
  },
  mounted() {
    // this.$store.commit("SET_IS_LOADING", true);
    const self = this;
    const app = self.$f7;
    var $$ = Dom7;
    var selected;
    var monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    var arrayDays = [
      "domingo",
      "segunda",
      "terca",
      "quarta",
      "quinta",
      "sexta",
      "sabado",
    ]
    var daysWork = this.company.workday;
    daysWork = daysWork.toLowerCase();
    daysWork = daysWork.replace(/[ç]/,"c").replace(/[àáâãäå]/,"a").replace(/[-]/,"");
    daysWork = daysWork.replace("-feira","");
    daysWork = daysWork.replace("feira","");
    daysWork = daysWork.split(" ");
    
    console.log(daysWork);
    
    var daysDisabled = [];
    var daysIndex = [];

    //GET AND SET INDEX DAYS WORK
    daysIndex.push(arrayDays.indexOf(daysWork[0]));
    daysIndex.push(arrayDays.indexOf(daysWork[2]));

    //GET AND SET DAYS DISABLED
    if (daysIndex[0] !== -1 && daysIndex[1] !== -1){
      for (let i = 0; i < arrayDays.length; i++){
        if (i < daysIndex[0] || i > daysIndex[1]){
          daysDisabled.push(i);
        }
      }
    }

    console.log(daysDisabled);

    var calendarInline = app.calendar.create({
      containerEl: "#demo-calendar-inline-container",
      value: [new Date()],
      minDate: new Date(),
      disabled(date) {
        return daysDisabled.indexOf(date.getDay()) >= 0;
      },
      renderToolbar: function () {
        return (
          '<div class="toolbar calendar-custom-toolbar no-shadow">' +
          '<div class="toolbar-inner">' +
          '<div class="left">' +
          '<a href="#" class="link icon-only"><i class="icon icon-back ' +
          (app.theme === "md" ? "color-black" : "") +
          '"></i></a>' +
          "</div>" +
          '<div class="center"></div>' +
          '<div class="right">' +
          '<a href="#" class="link icon-only"><i class="icon icon-forward ' +
          (app.theme === "md" ? "color-black" : "") +
          '"></i></a>' +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      on: {
        init: function (c) {
          $$(".calendar-custom-toolbar .center").text(
            monthNames[c.currentMonth] + ", " + c.currentYear
          );
          $$(".calendar-custom-toolbar .left .link").on("click", function () {
            calendarInline.prevMonth();
          });
          $$(".calendar-custom-toolbar .right .link").on("click", function () {
            calendarInline.nextMonth();
          });
          $$(".calendar-day-today").removeClass(
            "calendar-day-selected calendar-day-disabled"
          );
        },
        monthYearChangeStart: function (c) {
          $$(".calendar-custom-toolbar .center").text(
            monthNames[c.currentMonth] + ", " + c.currentYear
          );
        },
        dayClick: function (calendar, dayEl, year, month, day) {
          // SET IS LOADING
          self.$store.commit('SET_IS_LOADING', true);
          selected = {
            day: day,
            month: month,
            year: year,
          };
          var currentDay = $$(".calendar-day-today"); //current day
          currentDay.removeClass("calendar-day-disabled");

          dateSelected(selected);
        },
      },
    });
    function dateSelected(selected) {
      self.selected(selected);
    }
    this.$store.commit('Scheduling/SET_HOUR_STATE', {
      situation: false,
      hour: null,
		});
  },
};
</script>

<style lang="scss">
/* CUSTOMIZE CSS CALENDAR MODAL */
.modal-date {
  @media (min-width: 991px) {
    width: 825px !important;
  }
  .navbar-bg {
    background: rgba(204, 0, 0, 0.9);
  }
  .popup-close,
  .title {
    color: #fff;
  }
  .modal-body {
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
          .available {
            border: 2px solid #99d281;
            p {
              color: #000;
              margin-bottom: 0px;
            }
          }
          .ocuped {
            background: #cb7c7c;
            border: 2px solid #cb7c7c;
            p {
              color: rgba(255, 255, 255, 0.5);
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
