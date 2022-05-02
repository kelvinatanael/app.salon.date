<template>
  <f7-page name="registration-type" class="registration-type">
    <f7-navbar>
      <a class="link" href="/login/">
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
        <p>Cadastro</p>
      </a>
    </f7-navbar>
    <section class="content-registration-type">
      <div class="content-registration-type-header">
        <h2>Tipo de Cadastro</h2>
      </div>
      <div class="content-registration-type-body">
        <a class="content-links link" href="/cadastro-cliente/">
          <div class="content-links-name">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="user"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                class=""
              ></path>
            </svg>
            <p>Cliente</p>
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
        <a class="content-links" href="/cadastro-profissional/">
          <div class="content-links-name">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="user-tie"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"
                class=""
              ></path>
            </svg>
            <p>Profissional</p>
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
    </section>
  </f7-page>
</template>

<script>
export default {};
</script>

<style lang="scss">
.registration-type {
  background: #e6e6e6;
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
.content-registration-type {
  padding: 30px 15px 100px 15px;
  &-header {
    margin-bottom: 30px;
    h2 {
      font-size: 24px;
      text-align: center;
      font-family: "Font Bold";
      margin-bottom: 0;
    }
  }
  &-body {
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