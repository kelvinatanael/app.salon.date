<template>
  <div class="demo-calendar-inline-container" id="demo-calendar-inline-container"></div>
</template>

<script>
import Dom7 from "dom7";
import firebase from "firebase";

export default {
  data() {
    return {
      company: this.$store.getters.company[this.selectCompany],
      calendarInline: null,
    }
  },
  props: {
    selectCompany: String,
  },
  watch: {
    selectCompany() {
      var $$ = Dom7;
      var arrayDays = [
        "domingo",
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado",
      ]
      var company = this.$store.getters.company[this.selectCompany];
      var daysWork = company.workday;
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

      this.calendarInline.params.disabled = function(date){
        return daysDisabled.indexOf(date.getDay()) >= 0;
      };
      this.calendarInline.update();

      // REMOVE SELECTED DATE CHANGE COMPANY
      $$(".calendar-day").removeClass("calendar-day-selected");
    }
  },
  methods: {
    selected(value) {
      this.$store.commit('SET_IS_LOADING', true);
      this.$store.dispatch('Scheduling/consultScheduleManage', [value, this.selectCompany]);
      this.$emit('dateClick', true);
    },
  },
  mounted() {
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

    this.calendarInline = app.calendar.create({
      containerEl: "#demo-calendar-inline-container",
      value: [new Date()],
      disabled(date) {
        return daysDisabled.indexOf(date.getDay()) >= 0;
      },
      // minDate: new Date(),
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
            self.calendarInline.prevMonth();
          });
          $$(".calendar-custom-toolbar .right .link").on("click", function () {
            self.calendarInline.nextMonth();
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
  }
};
</script>

<style lang="scss">

</style>
