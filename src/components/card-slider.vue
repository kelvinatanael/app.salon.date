<template>
  <a class="content-card-slider popup-open" data-popup="#my-popup">
    <div class="content-card-slider-image" :style="bgCard"></div>
    <div class="content-card-slider-body">
      <div class="content-text">
        <h2>Corte e Barba</h2>
        <p>
          Somente o suporte consegue altera, cancelar, bonificar ou refazer
          pedido. Não temos acesso a esse tipo de dados da plataforma do
          aplicativo.
        </p>
      </div>
      <div class="content-price">
        <p>R$ 20,00 <span> R$ 30,00</span></p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  data() {
    return {
      bgCard: {
        background: "url(../static/icons/logo-company.jpg)"
      },
    };
  },
};
</script>

<style lang="scss">
.content-card-slider {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
  margin-bottom: 30px;
  transition: 500ms;
  display: block;
  text-decoration: none !important;
  @media (max-width: 576px) {
    margin-bottom: 10px;
    border: 1px solid #f2f2f2;
    box-shadow: none;
  }
  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.3);
    @media (max-width: 576px) {
      border: 1px solid #d6d6d6;
      box-shadow: none;
    }
    .content-card-slider-image {
      opacity: 0.8;
    }
  }
  &-image {
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    height: 180px;
    width: 100%;
    transition: 500ms;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  &-body {
    padding: 20px;
    @media (max-width: 576px) {
      padding: 15px;
    }
    .content-text {
      text-align: left;
      h2 {
        color: #3e3e3e;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        font-size: 20px;
        margin-bottom: 10px;
      }
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
        line-height: 1.2;
      }
    }
    .content-price {
      text-align: left;
      margin-top: 10px;
      p {
        font-size: 18px;
        line-height: 1.25rem;
        font-weight: 400;
        color: #50a773;
        span {
          position: relative;
          font-size: 14px;
          line-height: 1.25rem;
          color: #717171;
          text-decoration: line-through;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>