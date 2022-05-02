<template>
  <f7-page class="register-company" name="register-company">
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
        <p>Registro da empresa</p>
      </a>
    </f7-navbar>
    <f7-block class="content-register-company">
      <div class="content-register-company-header">
        <h2>Cadastre-se a sua empresa</h2>
      </div>
      <form @submit.prevent="registerCompany()" class="content-register-company-body">
        <div class="content-inputs">
          <label>Nome do salão</label>
          <input
            type="text"
            name="name-company"
            value=""
            placeholder="Nome do salao"
            v-model="company.name"
            required
          />
        </div>
        <div class="content-inputs-file">
          <label for="logo-company"> Logo da empresa </label>
          <input type="file" id="logo-company" @change="previewImage($event)" accept="image/*"/>
        </div>
        <div class="content-inputs-file-progress" v-if="imageData!=null">
          <p>Progresso: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  
          </p>
        </div>
        <div class="preview" v-if="imageData!=null">
          <img class="preview-image" :src="company.picture">
        </div>
        <div class="content-inputs">
          <label>Telefone celular</label>
          <the-mask
            name="type-services"
            v-model="company.telphone"
            :mask="['(##)#-####-####']"
            placeholder="Telefone com ddd + dígito(9)" 
            type="text"
            :required="true"
            :masked="true"
          />
        </div>
        <div class="content-inputs">
          <label>Tipo de Serviços</label>
          <input
            type="text"
            name="type-services"
            value=""
            placeholder="Ex: Cortes e Barbas"
            v-model="company.typeServices"
          />
        </div>
        <div class="content-subtitle">
          <h2> Endereço da Empresa: </h2>
        </div>
        <div class="content-inputs">
          <label>Endereço</label>
          <input
            type="text"
            name="address"
            value=""
            placeholder="Ex: Rua dos trabalhadores, 54"
            v-model="company.address"
            required
          />
        </div>
        <div class="content-inputs">
          <label> CEP </label>
          <the-mask name="postal-code" v-model="company.cep" placeholder="Ex: 31810-240" :mask="['#####-###']" :required="true" :masked="true" />
        </div>
        <div class="content-inputs">
          <label> Bairro </label>
          <input
            type="text"
            name="neighborhood"
            value=""
            placeholder="Ex: 1° de Maio"
            v-model="company.neighborhood"
            required
          />
        </div>
        <div class="content-inputs">
          <label> Cidade </label>
          <input type="text" name="city" v-model="company.city" value="" placeholder="Ex: Belo Horizonte" required/>
        </div>
        <div class="content-inputs">
          <label> Estado </label>
          <input type="text" name="state" v-model="company.state" value="" placeholder="Ex: Minas Gerais" required/>
        </div>
        <div class="content-subtitle content-subtitle-information">
          <h2> Jornada da Empresa:</h2>
          <a class="link popover-open" href="#" data-popover=".popover-alert">
            <svg height="20" width="20" fill="#cc0000" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" class=""></path></svg>
          </a>
        </div>
        <div class="content-inputs">
          <label>Jornada de trabalho:</label>
          <input
            type="text"
            name="workday"
            value=""
            placeholder="Ex: segunda à sexta"
            v-model="company.workday"
            required
          />
        </div>
        <div class="content-inputs">
          <label>Horário do estabelecimento:</label>
          <the-mask
            type="text"
            name="hour-establishment"
            value=""
            :mask="['##:## às ##:##']"
            placeholder="Ex: 08:00 às 18:00"
            v-model="company.hourEstablishment"
            :required="true"
            :masked="true"
          />
        </div>
        <div class="content-inputs">
          <label>Tempo médio de serviços: (em minutos)</label>
          <input
            type="text"
            name="time-average"
            value=""
            placeholder="Ex: 40 minutos"
            v-model="company.timeAverage"
            required
          />
        </div>
        <button class="content-btn-register">Cadastrar</button>
      </form>
    </f7-block>
    <!--- POPOVER ALERT -->
    <div class="popover popover-alert">
      <div class="popover-inner">
        <div class="block">
          <div class="content-text">
            <h2>Atenção!</h2>
            <p>
              Os dados da Jornada da Empresa não poderão sofrer alterações futuramente, devido a algumas implicações possíveis que pode ocasionar no agendamento dos clientes.
            </p>
            <p>
              Para a alteração o usuário deverá excluir a empresa e cria-lá novamente com os novos dados da Jornada da Empresa.
              </p>
          </div>
        </div>
        <!-- Link to close popover -->
        <a class="link popover-close">
          <svg
              width="20px"
              height="20px"
              fill="#cc0000"
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
        </a>
      </div>
    </div>
    <!-------------------->
  </f7-page>
</template>
<script>
import { TheMask } from "vue-the-mask";
import firebase from "firebase";
import { mapGetters } from 'vuex';


export default {
  name: 'PageCompany',
  data() {
    return {
      imageData: null,
      uploadValue: 0,
      typeSet: 'company',
      company: {
        idCompany: "",
        name: "",
        typeServices: "",
        address: "",
        cep: "",
        neighborhood: "",
        telphone: "",
        city: "",
        state: "",
        picture: null,
        hourEstablishment: "",
        timeAverage: "",
        workday: "",
        idUser: this.$store.state.user.data.id,
      },
    };
  },
  computed: {
    ...mapGetters(['uuidv4',])
  },
  components: {
    TheMask,
  },
  methods: {
    clearForm() {
      // CLEAR VALUES
      for (var key in this.company){
        if (this.company[key] != this.company['idUser']){
          this.company[key] = '';
        }
      }
    },
    registerCompany() {
      this.$store.commit('SET_IS_LOADING', true);
      var companyRef = firebase.database().ref('companys');
      var keyCompany = companyRef.push();
      this.company.idCompany = keyCompany.key;

      if (this.imageData){
        // GENERATE NAME IMAGE RANDOM
        this.$store.commit('SET_UUIDV4','');

        // REGISTER IMAGE STORAGE
        const storageRef=firebase.storage().ref(`${this.company.idCompany}/${this.uuidv4}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
          // this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{
            // this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.company.picture = url;
              keyCompany.set(this.company).then((resolve)=>{
                //CLEAR FORM
                this.clearForm();
              }).catch((error) =>{
                console.log(error);
              })
            });
          }
        );
      } else {
        this.company.picture = '';
        keyCompany.set(this.company).then((resolve)=>{
          //CLEAR FORM
          this.clearForm();
        }).catch((error) =>{
          console.log(error);
        })
      }

     
      this.imageData= null;
      this.picture= null;
      this.uploadValue= 0;

      this.$store.dispatch('Scheduling/registerCompanyCalendar', keyCompany.key);

      this.$store.commit('SET_IS_LOADING', false);

      this.$f7.dialog.alert("Cadastro da Empresa Realizado com Sucesso! &#128516;");
    },
    previewImage($event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = $event.target.files[0];
      if (this.imageData){
        self = this;
        var reader = new FileReader();
        reader.onload = function(e) {
          self.company.picture = e.target.result;
        }
        reader.readAsDataURL(this.imageData); // convert to base64 string
        this.uploadValue=100;
      }
    },
  },
};
</script>
<style lang="scss">
.register-company {
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
        label {
          display: block;
          font-size: 14px;
          font-family: "Font Regular";
          color: #060d1a;
          text-align: left;
        }
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
        &-progress {
          margin-bottom: 10px;
          margin-top: 10px;
          p {
            font-size: 14px;
            font-family: "Font Regular";
            color: #060d1a;
            text-align: left;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            progress {
              height: 20px;
              margin-left: 10px;
            }
          }
        }
      }
    }
    .preview {
      text-align: center;
      &-image {
        max-width: 80px;
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
.content-subtitle {
  margin-bottom: 30px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid rgba(190, 190, 190, 0.3);
  h2 {
    font-size: 18px;
    font-family: "Font Bold";
    line-height: 1;
    margin-bottom: 10px;
  }
  &-information {
    display: flex;
    align-items: center;
    h2 {
      margin-bottom: 0;
      margin-right:  15px;
    }
    a {
      margin-bottom: 5px;
    }
  }
}
.popover-alert {
  .content-text {
    h2 {
      font-size: 16px;
      font-family: "Font Bold";
      line-height: 1;
      margin-bottom: 10px;
      color: #cc0000;
    }
    p {
      margin-bottom: 10px;
    }
  }
  .popover-close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>