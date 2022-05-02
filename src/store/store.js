import Vue from 'vue'
import Vuex from 'vuex'
import Scheduling from './modules/Scheduling'
import firebase from 'firebase/app'


Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    Scheduling
  },
	state: {
    isLoading: false,
		user: {
			loggedIn: false,
      data: null,
      typeUser: null,
      information: null,
    },
    editUser: null,
    company: {},
    editCompany: null,
    service: {},
    editService: null,
    pageInternId: null,
    dateAndHour: {},
    searchCompanys: null,
    uuidv4: null,
	},
	getters: {
    isLoading(state) {
      return state.isLoading;
    },
		user(state){
			return state.user
    },
    editUser(state){
      return state.editUser
    },
    company(state){
      return state.company
    },
    editCompany(state){
      return state.editCompany
    },
    service(state){
      return state.service
    },
    editService(state){
      return state.editService
    },
    pageInternId(state){
      return state.pageInternId
    },
    dateAndHour(state){
      return state.dateAndHour
    },
    searchCompanys(state){
      return state.searchCompanys
    },
    uuidv4(state){
      return state.uuidv4
    },
	},
	mutations: {
    SET_IS_LOADING(state, value) {
      state.isLoading = value;
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_USER_DATA(state, data) {
      state.user.information = data;
    },
    SET_EDIT_USER(state, editUser){
      state.editUser = editUser;
    },
    SET_TYPE(state, typeUser){
      state.user.typeUser = typeUser;
    },
    SET_COMPANY(state, company){
      state.company = company;
    },
    SET_EDIT_COMPANY(state, editCompany){
      state.editCompany = editCompany;
    },
    SET_SERVICE(state, service){
      state.service = service;
    },
    SET_EDIT_SERVICE(state, editService){
      state.editService = editService;
    },
    SET_PAGE_INTERN_ID(state, pageInternId){
      state.pageInternId = pageInternId;
    },
    SET_DATE_AND_HOUR(state, dateAndHour){
      state.dateAndHour = dateAndHour;
    },
    SET_SEARCH_COMPANYS(state, searchCompanys){
      state.searchCompanys = searchCompanys;
    },
    SET_UUIDV4(state, uuidv4) {
      uuidv4 = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
      state.uuidv4 = uuidv4;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          name: user.displayName,
          email: user.email,
          id: user.uid
        });
      } else {
        commit("SET_USER", null);
      }
    },
    fetchUserData({ commit }, data) {
      commit("SET_USER_DATA", data);
    },
    fecthTypeUser({ commit }, typeUser){
      if (typeUser == 'client' || typeUser == 'professional'){
        commit("SET_TYPE", typeUser);
      }
      else {
        commit("SET_TYPE", null);
      }
    },
    fecthEditUser({ commit }, editUser){
      if (editUser !== null){
        commit("SET_EDIT_USER", editUser);
      }
    },
    fecthCompany({ commit }, company){
      commit("SET_COMPANY", company);
    },
    fecthEditCompany({ commit }, editCompany){
      if (editCompany !== null){
        commit("SET_EDIT_COMPANY", editCompany);
      }
    },
    fecthService({ commit }, service){
      commit("SET_SERVICE", service);
    },
    fecthEditService({ commit }, editService){
      if (editService !== null){
        commit("SET_EDIT_SERVICE", editService);
      }
    },
    fecthPageInternId({ commit }, pageInternId){
      if (pageInternId !== null){
        commit("SET_PAGE_INTERN_ID", pageInternId);
      }
    },
    fecthDateAndHour({ commit }, dateAndHour){
      commit("SET_DATE_AND_HOUR", dateAndHour);
    },
    async consultServices({ commit, dispatch }, [idUser, idCompany]) {
			// VERIFY DATABASE SERVICES DATA
			const tableServices = firebase.database().ref("/services");
			const getDataServices = (tableServices) => {
				return new Promise((resolve, reject) => {
					const onError = (error) => reject(error);
					const onData = (snap) => resolve(snap.val());

					tableServices.on("value", onData, onError);
				});
			};
			getDataServices(tableServices)
				.then((value) => {
					var data = {};
          var keys = [];
          if (value !== null) {
            Object.keys(value).forEach(function (item) {
              keys.push(item);
            });
            for (let i = 0; i < Object.keys(value).length; i++) {
              if (idUser == value[keys[i]].idUser) {
                if (idCompany == value[keys[i]].idCompany){
                  data[keys[i]] = value[keys[i]];
                }
              }
            }
          }
          console.log(data);
					dispatch("fecthService", data);
					commit("SET_IS_LOADING", false);
				})
				.catch((error) => {
					console.log(error.message);
					commit('SET_IS_LOADING', false);
				});
			///////////////////////////////
    },
    async consultCompanys({ commit, dispatch }) {
			// CONSULT DATABASE COMPANYS DATA
			const tableCompanys = firebase.database().ref("/companys");
      return new Promise((resolve, reject) => {
        const onError = (error) => reject(error);
        const onData = (snap) => resolve(snap.val());

        tableCompanys.on("value", onData, onError);
      });
			///////////////////////////////
    },
    async deleteCompany({ commit, dispatch }, idCompany) {
			// DELETE COMPANY CHILD KEY
      await firebase.database().ref("/companys").child(idCompany).remove();
			///////////////////////////////
    },
    async deleteServices({ commit, dispatch }) {
			// DELETE SERVICES CHILD KEY
      const tableServices = firebase.database().ref("/services");
      return new Promise((resolve, reject) => {
        const onError = (error) => reject(error);
        const onData = (snap) => resolve(snap.val());

        tableServices.on("value", onData, onError);
      });
			///////////////////////////////
    },
    async consultUser({ commit, dispatch }) {
			// CONSULT TABLE USER
      const tableUser = firebase.database().ref("/userClient");
      return new Promise((resolve, reject) => {
        const onError = (error) => reject(error);
        const onData = (snap) => resolve(snap.val());

        tableUser.on("value", onData, onError);
      });
			///////////////////////////////
    },
    async deleteUserTable({ commit, dispatch }, idTableUser) {
     	// DELETE USER CHILD KEY
       await firebase.database().ref("/userClient").child(idTableUser).remove();
      ///////////////////////////////
    },
    async deleteUserLogin({ commit, dispatch }, password) {
      // DELETE USER LOGIN
      var user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        password
      );
      user.reauthenticateWithCredential(credential).then(function() {
        console.log('Usuário credenciado com sucesso!');
        user.delete();
      }).catch(function(error) {
        console.log(error);
      });
     ///////////////////////////////
    },
    async deleteImagesCompany({ commit, dispatch }, key) {
      // DELETE IMAGES COMPANY
      const storageRef = firebase.storage().ref(`${key}`);
      // Delete the file
      await storageRef.delete();
     ///////////////////////////////
    },
    // async setImageStorage({ state,commit,dispatch }, [key, imageData, typeSet]) {
    //   // GENERATE NAME IMAGE RANDOM
    //   commit('SET_UUIDV4','');

    //   // REGISTER IMAGE STORAGE
    //   const storageRef=firebase.storage().ref(`${key}/${state.uuidv4}`).put(imageData);
    //   storageRef.on(`state_changed`,snapshot=>{
    //     // this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    //   }, error=>{console.log(error.message)},
    //   ()=>{
    //       // this.uploadValue=100;
    //       storageRef.snapshot.ref.getDownloadURL().then((url)=>{
    //         console.log(url);
    //         if (typeSet === 'company'){
    //           dispatch('SET_URL_IMAGE', url);
    //         }
    //       });
    //     }
    //   );
    //  ///////////////////////////////
    // },
  }
})