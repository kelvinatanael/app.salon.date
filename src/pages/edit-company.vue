<template>
  <f7-page class="edit-company" name="edit-company">
    <f7-navbar>
      <a class="link" href="/empresas-registradas/">
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
        <p>Editar dados da empresa</p>
      </a>
    </f7-navbar>
    <f7-block class="content-edit-company">
      <form @submit.prevent="updateCompany()" class="content-edit-company-body">
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
          <input type="file" id="logo-company" @change="previewImage($event)" accept="image/*" />
        </div>
        <div class="content-inputs-file-progress" v-if="company.picture !== ''">
          <p>Progresso: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  
          </p>
        </div>
        <div class="preview" v-if="company.picture !== ''">
          <img class="preview-image" :src="company.picture">
        </div>
        <div class="content-inputs">
          <label>Telefone celular</label>
          <the-mask
            name="type-services"
            v-model="company.telphone"
            :mask="['(##)#-####-####']"
            placeholder="Telefone celular da empresa"
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
        <!-- <div class="content-inputs">
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
            required="true"
          />
        </div> -->
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
        <button class="content-btn-register">Editar</button>
      </form>
    </f7-block>
  </f7-page>
</template>
<script>
import { TheMask } from "vue-the-mask";
import firebase from "firebase";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      uploadValue: 0,
      editCompany: this.$store.getters.editCompany,
      company: this.$store.getters.company[this.$store.getters.editCompany],
      imageData: null,
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
    updateCompany() {
      this.$store.commit('SET_IS_LOADING', true);

      this.company.idCompany = this.editCompany;

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
              this.companyUpdateFunction();
            });
          }
        );
      } else {
        this.companyUpdateFunction();
      }
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
    companyUpdateFunction() {
      var companyRef = firebase.database().ref('/companys');

      companyRef.child(this.editCompany).update(this.company).then(() => {
        this.imageData= null,
        this.uploadValue= 0,

        this.$store.commit('SET_IS_LOADING', false);
        this.$f7.dialog.alert("Dados da Empresa Atualizado com Sucesso! &#128516;");
        this.$f7router.navigate("/empresas-registradas/");

      }).catch((error) =>{
        console.log('ERROR:', error);
        this.$store.commit('SET_IS_LOADING', false);
      });
    }
  },
  mounted() {
    if (this.company.picture) {
      this.uploadValue = 100;
    } else {
      this.uploadValue = 0;
    }
  }
};
</script>
<style lang="scss">
.edit-company {
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
.content-edit-company {
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