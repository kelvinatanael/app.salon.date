<template>
  <f7-page class="register-services" name="register-services">
    <f7-navbar>
      <a class="link" href="/gerenciar/">
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
        <p>Registro dos serviços</p>
      </a>
    </f7-navbar>
    <f7-block class="content-register-company">
      <template v-if="Object.keys(companySchedules).length > 0">
        <div class="content-register-company-header">
          <h2>Cadastre os serviços</h2>
        </div>
        <form @submit.prevent="registerService()" class="content-register-company-body">
          <div class="content-inputs">
            <label>Nome do serviço</label>
            <input
              type="text"
              v-model="service.name"
              name="name-service"
              value=""
              placeholder="Ex: Corte e Barba"
              required
            />
          </div>
          <div class="content-inputs">
            <label>Descrição do Serviço</label>
            <textarea
              name="description-service"
              v-model="service.description"
              value=""
              placeholder="Breve descrição do serviço..."
            >
            </textarea>
          </div>
          <div class="content-inputs">
            <label>Tempo do serviço: (em minutos)</label>
            <input
              type="text"
              v-model="service.time"
              name="time-serivce"
              value=""
              placeholder="Ex: 40 minutos ou 60 minutos"
              required
            />
          </div>
          <div class="content-inputs">
            <label>Preço do serviço</label>
            <money
              type="text"
              v-model.lazy="service.price"
              v-bind="money"
              name="price-service"
              value=""
              :required="true"></money>
          </div>
          <div class="content-inputs-file">
            <label for="logo-company"> Imagem do serviço </label>
            <input type="file" id="input-file-service" @change="previewImage($event)" accept="image/*" />
          </div>
          <div class="content-inputs-file-progress" v-if="imageData!=null">
            <p>Progresso: {{uploadValue.toFixed()+"%"}}
              <progress id="progress" :value="uploadValue" max="100" ></progress>  
            </p>
          </div>
          <div class="preview" v-if="imageData!=null">
            <img class="preview-image" :src="service.picture">
          </div>
          <div class="content-inputs">
            <label> Selecione a empresa </label>
            <div class="content-inputs-select">
              <select v-model="selectCompany">
                <option v-for="(companySchedulesList, n) in companySchedules" :key="n" :value="companySchedulesList.idCompany">
                  {{ companySchedulesList.name }}
                </option>
              </select>
              <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"></path>
              </svg>
            </div>
          </div>
          <button class="content-btn-register">Adicionar</button>
        </form>
      </template>
      <template v-else>
        <div class="not-service fixed">
          <p class="text"> É necessário cadastrar uma empresa para registrar serviços! </p>
          <span class="icon">&#128533;</span>
        </div>
      </template>
    </f7-block>
  </f7-page>
</template>
<script>
import { mapGetters } from "vuex";
import { Money } from "v-money";
import firebase from "firebase";

export default {
  data() {
    return {
      selectCompany: null,
      imageData: null,
      service: {
        name: "",
        description: "",
        price: "",
        time: "",
        idService: "",
        idUser: this.$store.state.user.data.id,
        idCompany: "",
        picture: "",
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: true,
      },
    };
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters('Scheduling', ['companySchedules']),
    ...mapGetters(['uuidv4',])
  },
  components: {
    Money,
  },
  methods: {
    clearForm() {
      // CLEAR VALUES
      for (var key in this.service){
        if (this.service[key] != this.service['idUser']){
          this.service[key] = "";
        }
      }
      // REINIT VALUES
      this.imageData = null;
      document.getElementById("input-file-service").value = "";
    },
    registerService() {
      this.$store.commit('SET_IS_LOADING', true);
      var serviceRef = firebase.database().ref('services');
      var keyService = serviceRef.push();

      this.service.idCompany = this.selectCompany;
      this.service.idService = keyService.key;

      if (this.imageData){
        // GENERATE NAME IMAGE RANDOM
        this.$store.commit('SET_UUIDV4','');

        // REGISTER IMAGE STORAGE
        const storageRef=firebase.storage().ref(`${this.service.idCompany}/services/${this.service.idService}/${this.uuidv4}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
          // this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{
            // this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.service.picture = url;
              keyService.set(this.service).then((resolve)=>{
                //CLEAR FORM
                this.clearForm();
              }).catch((error) =>{
                console.log(error);
              })
            });
          }
        );
      } else {
        keyService.set(this.service).then((resolve)=>{
          //CLEAR FORM
          this.clearForm();
        }).catch((error) =>{
          console.log(error);
        })
      }

      this.$store.commit('SET_IS_LOADING', false);
      this.$f7.dialog.alert("Cadastro de Serviço Realizado com Sucesso! &#128516;");
    },
    previewImage($event) {
      this.uploadValue=0;
      this.imageData = $event.target.files[0];
      if (this.imageData){
        self = this;
        var reader = new FileReader();
        reader.onload = function(e) {
          self.service.picture = e.target.result;
        }
        reader.readAsDataURL(this.imageData); // convert to base64 string
        this.uploadValue=100;
      }
    },
  },
  mounted() {
    this.$store.commit('SET_IS_LOADING', true);
    this.$store.dispatch('Scheduling/consultCompanyKeys', this.user.data.id).then((value) => {
      var data = {};
      if (value !== null) {
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
.register-services {
  padding: 0px 0px 66px 0px;
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
.content-register-company {
  &-header {
    margin-bottom: 30px;
    text-align: center;
    h2 {
      font-size: 24px;
      font-family: "Font Bold";
      color: #000;
      margin-bottom: 0;
    }
  }
  &-body {
    .content-inputs {
      margin-bottom: 20px;
      label {
        display: block;
        font-size: 14px;
        font-family: "Font Regular";
        color: #060d1a;
        text-align: left;
      }
      input,
      select {
        height: 50px;
        width: 100%;
        border: 1px solid hsla(0, 0%, 74.5%, 0.3);
        background: #fff;
        border-radius: 4px;
        padding-left: 20px;
        font-size: 14px;
        font-family: "Font Regular";
        color: #000;
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        &::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: rgba(6, 13, 26, 0.4);
        }
        &::-moz-placeholder {
          /* Firefox 19+ */
          color: rgba(6, 13, 26, 0.4);
        }
        &:-ms-input-placeholder {
          /* IE 10+ */
          color: rgba(6, 13, 26, 0.4);
        }
        &:-moz-placeholder {
          /* Firefox 18- */
          color: rgba(6, 13, 26, 0.4);
        }
      }
      textarea {
        min-height: 100px;
        width: 100%;
        border: 1px solid hsla(0, 0%, 74.5%, 0.3);
        background: #fff;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 14px;
        font-family: "Font Regular";
        color: #000;
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        &::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: rgba(6, 13, 26, 0.4);
        }
        &::-moz-placeholder {
          /* Firefox 19+ */
          color: rgba(6, 13, 26, 0.4);
        }
        &:-ms-input-placeholder {
          /* IE 10+ */
          color: rgba(6, 13, 26, 0.4);
        }
        &:-moz-placeholder {
          /* Firefox 18- */
          color: rgba(6, 13, 26, 0.4);
        }
      }
      &-select {
        position: relative;
        svg {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          width: 25px;
          height: 25px;
          fill: #104069;
        }
      }
      &-file {
        margin-bottom: 20px;
        input {
          position: relative;
          border: 1px solid #e5e5e5;
          background: #fff;
          border-radius: 5px;
          background: 0;
          font-size: 14px;
          font-family: "Font Light";
          color: #808080;
          padding: 5px;
          overflow: hidden;
          @media (max-width: 991px) {
            max-width: 96%;
          }
        }
      }
    }
    .content-btn-register {
      height: 50px;
      width: 100%;
      font-size: 20px;
      font-family: "Font Bold";
      color: #fff !important;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to right, #99d281, #50a773);
      border: 0;
      border-radius: 30px;
      transition: 500ms;
      margin-top: 50px;
      outline: none;
      &:hover,
      &:focus {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}
</style>