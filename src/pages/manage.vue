<template>
  <f7-page name="content-manage" class="content-manage">
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
        <p>Gerenciar</p>
      </a>
    </f7-navbar>
    <section class="content-manage-type">
      <div class="content-manage-type-body">
        <a class="content-links link" href="/registro-empresa/">
          <div class="content-links-name">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="building"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z"
                class=""
              ></path>
            </svg>
            <p>Registro de Empresas</p>
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
        <a class="content-links link" href="/empresas-registradas/">
          <div class="content-links-name">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="city" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M616 192H480V24c0-13.26-10.74-24-24-24H312c-13.26 0-24 10.74-24 24v72h-64V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v80h-64V16c0-8.84-7.16-16-16-16H80c-8.84 0-16 7.16-16 16v80H24c-13.26 0-24 10.74-24 24v360c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V216c0-13.26-10.75-24-24-24zM128 404c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm128 192c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12V76c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 288c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40z" class=""></path></svg>
            <p>Empresas Registradas</p>
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
        <a class="content-links" href="/registro-servicos/">
          <div class="content-links-name">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="file-signature"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                d="M218.17 424.14c-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34c-6.37 12.78-25.03 11.37-29.48-2.09L144 386.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.75-16.19 54.06-9.7 66 14.16 1.89 3.78 5.49 5.95 9.36 6.26v-82.12l128-127.09V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24v-40l-128-.11c-16.12-.31-30.58-9.28-37.83-23.75zM384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1zm-96 225.06V416h68.99l161.68-162.78-67.88-67.88L288 346.96zm280.54-179.63l-31.87-31.87c-9.94-9.94-26.07-9.94-36.01 0l-27.25 27.25 67.88 67.88 27.25-27.25c9.95-9.94 9.95-26.07 0-36.01z"
                class=""
              ></path>
            </svg>
            <p>Registro de Serviços</p>
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
        <a class="content-links" href="/servicos-registrados/">
          <div class="content-links-name">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1708pt"
              viewBox="0 0 1708 1708.749"
              width="1708pt"
            >
              <path
                d="M224.941 305.355a30.498 30.498 0 0114.121 8l435.075 435.082 78.726-78.718-435.082-435.082a30.533 30.533 0 01-8.008-14.157l-27.382-109.156L100.867 7.547l-88.89 88.887 103.808 181.648zm0 0"
              />
              <path
                d="M611.824 1297.79l690.395-690.407a30.458 30.458 0 0128.91-8.024c90.898 23.297 187.45 3.11 261.43-54.609 73.992-57.723 117.03-146.488 116.535-240.32 0-5.715-.168-11.473-.54-17.282l-160.577 160.559a30.427 30.427 0 01-31.141 7.352l-182.637-60.887a30.392 30.392 0 01-19.262-19.23l-60.87-182.641c-3.653-10.922-.805-22.992 7.351-31.145L1421.992.586c-96.695-6.016-190.441 34.61-252.203 109.25-61.754 74.656-84.07 174.351-60.05 268.2a30.42 30.42 0 01-8 28.925l-690.384 690.36a30.71 30.71 0 01-28.918 8.015 300.648 300.648 0 00-73.582-9.469c-131.097-.863-248.234 81.781-291.398 205.598-43.14 123.805-2.738 261.355 100.512 342.16s246.476 86.984 356.289 15.344c109.82-71.637 161.89-205.2 129.527-332.27-2.574-10.37.469-21.36 8.04-28.91zM382.95 1522.03H234.785l-73.074-121.754 73.074-121.773H382.95l73.059 121.773zm117.477-356.363l669.672-669.68 43.035 43.043-669.672 669.68zm0 0M1459.5 1692.867c67.8 25.492 144.242 8.961 195.465-42.258 51.226-51.234 67.762-127.687 42.258-195.472zm0 0"
              />
              <path
                d="M1654.969 1389.2l-341.887-342.024c-37.71 31.699-93.398 29.289-128.254-5.524-34.86-34.804-37.316-90.476-5.672-128.226l-48.418-48.477-261.355 261.367 48.71 48.707c37.712-31.699 93.407-29.296 128.243 5.504 34.855 34.813 37.328 90.493 5.68 128.246l341.597 341.778c3.727 3.726 7.66 7.18 11.633 10.539l260.27-260.27c-3.352-3.98-6.82-7.898-10.547-11.62zm-180.477 123.905l-304.394-304.394 43.035-43.043 304.402 304.41zm0 0"
              />
            </svg>
            <p>Serviços Registrados</p>
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
        <a class="content-links" href="/gerenciar-agendamentos/">
          <div class="content-links-name">
            <svg
              height="1708pt"
              width="1708pt"
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="calendar-alt"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <path
                d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"
                class=""
              ></path>
            </svg>
            <p>Agendamentos</p>
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
export default {
  name: 'PageManage',
};
</script>

<style lang="scss">
.content-manage{
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
.content-manage-type {
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