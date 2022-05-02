<template>
  <div>
    <template v-if="user.loggedIn">
      <a class="content-card popup-open" data-popup="#my-popup" v-for="(serviceList, n) in service" @click="scheduleService(service[n])" :key="n">
        <div class="content-card-body" :class="{'card-body-width-calc': serviceList.picture !== ''}">
          <div class="content-text">
            <h2>{{ serviceList.name }}</h2>
            <p v-if="serviceList.description != ''">
              {{ serviceList.description }}
            </p>
            <p>
              Tempo aproximado de serviço: {{ serviceList.time }}
            </p>
          </div>
          <div class="content-price">
            <p>{{ serviceList.price }}</p>
          </div>
        </div>
        <div class="content-card-image" v-if="serviceList.picture !== ''" :style="{'background': 'url('+ serviceList.picture +')'}"></div>
      </a>
    </template>
    <template v-else>
      <a class="content-card popup-open" href="/login/" v-for="(serviceList, n) in service" :key="n">
        <div class="content-card-body" :class="{'card-body-width-calc': serviceList.picture !== ''}">
          <div class="content-text">
            <h2>{{ serviceList.name }}</h2>
            <p v-if="serviceList.description != ''">
              {{ serviceList.description }}
            </p>
            <p class="content-text-time">
              <!-- <i style="font-size: 20px" class="icon f7-icons icon-tooltip">info_circle_fill</i> -->
              Tempo aprox. serviço: {{ serviceList.time }}
            </p>
          </div>
          <div class="content-price">
            <p>{{ serviceList.price }}</p>
          </div>
        </div>
        <div class="content-card-image" v-if="serviceList.picture !== ''" :style="{'background': 'url('+ serviceList.picture +')'}"></div>
      </a>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  props: {
    service: Object
  },
  methods: {
    scheduleService(value){
      this.$emit('scheduleService', value);
    }
  },
  mounted() {
    var iconTooltip = this.$f7.tooltip.create({
      targetEl: '.icon-tooltip',
      text: 'Tooltip text',
    });
  }
};
</script>

<style lang="scss">
.content-card {
  display: flex;
  align-items: center;
  position: relative;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 12px;
  transition: 500ms;
  text-decoration: none !important;
  border: 1px solid #f2f2f2;
  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    .content-card-image {
      opacity: 0.8;
    }
  }
  &-image {
    background-size: contain !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    height: 100px;
    width: 100px;
    transition: 500ms;
  }
  &-body { 
    width: 100%;
    padding: 20px;
    @media (max-width: 576px) {
      padding: 15px;
    }
    .content-text {
      text-align: left;
      h2 {
        color: #3e3e3e;
        font-family: 'Font Bold';
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        font-size: 20px;
        @media (max-width: 576px) {
          font-size: 16px;
        }
      }
      p {
        // overflow: hidden;
        // text-overflow: ellipsis;
        // -webkit-box-orient: vertical;
        // display: -webkit-box;
        // -webkit-line-clamp: 2;
        // font-weight: lighter;
        color: #717171;
        // word-break: break-word;
        font-size: 16px;
        margin-bottom: 0;
        font-family: 'Font Regular';
        @media (max-width: 576px) {
          font-size: 12px;
        }
      }
      &-time {
        svg {
          width: 10px;
          height: 10px;
          fill:#717171;
        }
      }
    }
    .content-price {
      text-align: left;
      margin-top: 30px;
      p {
        font-size: 18px;
        line-height: 1.25rem;
        color: #50a773;
        font-family: 'Font Light';
        @media (max-width: 576px) {
          font-size: 16px;
        }
        span {
          position: relative;
          font-size: 14px;
          line-height: 1.25rem;
          color: #717171;
          text-decoration: line-through;
          margin-left: 5px;
          @media (max-width: 576px) {
            font-size: 12px;
          }
        }
      }
    }
  }
  .card-body-width-calc {
    width: calc(100% - 130px);
  }
}
</style>