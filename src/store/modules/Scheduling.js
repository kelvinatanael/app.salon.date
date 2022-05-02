// Import Firebase
import firebase from "firebase/app";

export default {
	namespaced: true,
	state: {
		companyHour: [],
		dateChosen: {},
		schedules: [],
		hourState: {
			situation: false,
			hour: null,
		},
		reservation: {},
		companySchedules: {},
		manageSchedules: [],
	},
	getters: {
		companyHour(state) {
			return state.companyHour;
		},
		hourState(state) {
			return state.hourState;
		},
		reservation(state) {
			return state.reservation;
		},
		dateChosen(state) {
			return state.dateChosen;
		},
		schedules(state) {
			return state.schedules;
		},
		companySchedules(state) {
			return state.companySchedules;
		},
		manageSchedules(state) {
			return state.manageSchedules;
		}
	},
	mutations: {
		SET_COMPANY_HOUR(state, companyHour) {
			state.companyHour = companyHour;
		},
		SET_HOUR_STATE(state, hourState) {
			state.hourState = hourState;
		},
		SET_RESERVATION(state, reservation) {
			state.reservation = reservation;
		},
		SET_DATE_CHOSEN(state, dateChosen) {
			state.dateChosen = dateChosen;
		},
		SET_SCHEDULES(state, schedules) {
			state.schedules = schedules;
		},
		SET_COMPANY_SCHEDULES(state, companySchedules) {
			state.companySchedules = companySchedules;
		},
		SET_MANAGE_SCHEDULES(state, manageSchedules) {
			state.manageSchedules = manageSchedules;
		}
	},
	actions: {
		async registerCompanyCalendar({ commit }, key) {
			await firebase.firestore().collection('calendar').doc(key).set({});
		},
		async registerReservation({ commit }, [reservation, key]) {
			await firebase.firestore().collection('calendar').doc(key)
				.collection('years').doc(`${reservation.date.date.year}`).set({});

			await firebase.firestore().collection('calendar').doc(key)
				.collection('years').doc(`${reservation.date.date.year}`)
				.collection('months').doc(`${reservation.date.date.month}`).set({});

			await firebase.firestore().collection('calendar').doc(key)
				.collection('years').doc(`${reservation.date.date.year}`)
				.collection('months').doc(`${reservation.date.date.month}`)
				.collection('days').doc(`${reservation.date.date.day}`).set({});

			await firebase.firestore().collection('calendar').doc(key)
				.collection('years').doc(`${reservation.date.date.year}`)
				.collection('months').doc(`${reservation.date.date.month}`)
				.collection('days').doc(`${reservation.date.date.day}`)
				.collection('hours').doc(`${reservation.hour.hour}`)
				.set({
					idCompany: [reservation.company.idCompany],
					company: [reservation.company],
					name: [reservation.user.data.name],
					idUser: [reservation.user.data.id],
					service: [reservation.service.name],
					price: [reservation.service.price],
					time: [reservation.service.time],
					date: [reservation.date.date.day] + '/'
						+ [reservation.date.date.month] + '/'
						+ [reservation.date.date.year],
					hour: [reservation.hour.hour],
				}).then(function () {
					console.log("Document successfully written!");
				})
				.catch(function (error) {
					console.error("Error writing document: ", error);
				});
		},
		async consultReservation({ commit, state }, [selectedDate, key]) {

			//SET 0 IN NUMBERS ELEMENTS
			selectedDate.day < 10 ? 
			selectedDate.day = '0' + selectedDate.day : 
			selectedDate.day = selectedDate.day;

      selectedDate.month < 10 ? 
			selectedDate.month = '0' + (selectedDate.month + 1) : 
			selectedDate.month = (selectedDate.month + 1);
			/////////////////////////////////////////////////////

			let collectionRef = firebase.firestore()
				.collection('calendar').doc(key)
				.collection('years').doc(`${selectedDate.year}`)
				.collection('months').doc(`${selectedDate.month}`)
				.collection('days').doc(`${selectedDate.day}`)
				.collection('hours');

			collectionRef.get().then(function (collection) {
				if (collection.docs.length > 0) {
					console.log("Document data:", collection.docs.map(doc => doc.id));
					var today = new Date();
					var todayCompany = new Date(`${selectedDate.year}-${selectedDate.month}-${selectedDate.day} 
					${today.getHours()}:${today.getMinutes()}`);

					//resetting values for 0
					today.setSeconds(0);
					today.setMilliseconds(0);
					todayCompany.setSeconds(0);
					todayCompany.setMilliseconds(0);

					var arrayCollection = collection.docs.map(doc => doc.id);
					var arrayHours = state.companyHour;

					for (let i = 0; i < arrayHours.length; i++) {
						// REINIT VALUES
						arrayHours[i].scheduling = false;
						arrayHours[i].hourExceeded = false;
						for (let n = 0; n < arrayCollection.length; n++) {
							if (arrayHours[i].hour == arrayCollection[n]) {
								arrayHours[i].scheduling = true;
							}
						}
						if (today.getTime() === todayCompany.getTime()) {
							let hourTodayCompany = arrayHours[i].hour;
							hourTodayCompany = hourTodayCompany.split(':');

							let hourToday = new Date();
							hourToday.setHours(hourTodayCompany[0]);
							hourToday.setMinutes(hourTodayCompany[1]);
							hourToday.setSeconds(0);
							hourToday.setMilliseconds(0);

							if (today.getTime() > hourToday.getTime()) {
								arrayHours[i].hourExceeded = true;
								arrayHours[i].scheduling = false;
							}
						}
					}
					commit('SET_IS_LOADING', false, { root: true });
				} else {
					var today = new Date();
					var todayCompany = new Date(`${selectedDate.year}-${selectedDate.month}-${selectedDate.day} 
					${today.getHours()}:${today.getMinutes()}`);
					var arrayHours = state.companyHour;
					//resetting values for 0
					today.setSeconds(0);
					today.setMilliseconds(0);
					todayCompany.setSeconds(0);
					todayCompany.setMilliseconds(0);
					for (let i = 0; i < arrayHours.length; i++) {
						// REINIT VALUES
						arrayHours[i].scheduling = false;
						arrayHours[i].hourExceeded = false;

						if (today.getTime() === todayCompany.getTime()) {
							console.log('teste');
							let hourTodayCompany = arrayHours[i].hour;
							hourTodayCompany = hourTodayCompany.split(':');

							let hourToday = new Date();
							hourToday.setHours(hourTodayCompany[0]);
							hourToday.setMinutes(hourTodayCompany[1]);
							hourToday.setSeconds(0);
							hourToday.setMilliseconds(0);

							if (today.getTime() > hourToday.getTime()) {
								arrayHours[i].hourExceeded = true;
								arrayHours[i].scheduling = false;
							}
						}
					}
					console.log("No such document!");
					commit('SET_IS_LOADING', false, { root: true });
				}
			}).catch(function (error) {
				console.log("Error getting document:", error);
				commit('SET_IS_LOADING', false, { root: true });
			});
		},
		async consultCompanyHour({ commit, dispatch }, keyCompany) {
			let tableCompanys = firebase.database().ref("/companys");
			const getDataCompanys = (tableCompanys) => {
				return new Promise((resolve, reject) => {
					const onError = (error) => reject(error);
					const onData = (snap) => resolve(snap.val());
					tableCompanys.on("value", onData, onError);
				});
			};
			getDataCompanys(tableCompanys.child(keyCompany))
				.then((value) => {
					var hour = value.hourEstablishment;
					hour = hour.split(' ');
					var hourInitial = hour[0];
					var hourFinal = hour[2];

					//TRANFORM HOUR IN MINUTES
					function calcMinutes(horario) {
						var aux = horario.split(':');
						var result;
						result = parseInt(aux[0]) * 60 + parseInt(aux[1]);
						return result;
					}
					//TRANFORM MINUTES IN HOUR
					function calcHours(minutos) {
						const horas = Math.floor(minutos / 60);
						const min = minutos % 60;
						const textoHoras = (`00${horas}`).slice(-2);
						const textoMinutos = (`00${min}`).slice(-2);
						return `${textoHoras}:${textoMinutos}`;
					};

					hourInitial = calcMinutes(hourInitial);
					hourFinal = calcMinutes(hourFinal);

					var textMinutes = value.timeAverage;
					var minutes = parseInt(textMinutes.match(/\d/g).join(''));
					var calculeHour = [];
					var resultHour = [];
					var interval = hourInitial;
					var objectHour = {};
					var arrayHour = [];

					// SAVE MINUTES IN ARRAY UNTIL END TIME ADD + 50 MINUTES
					while (interval < hourFinal) {
						calculeHour.push(interval);
						interval += minutes;
					}
					// SAVE HOUR EM RESULT HOUR
					for (let i = 0; i < calculeHour.length; i++) {
						resultHour[i] = calcHours(calculeHour[i]);

						objectHour = {
							hour: resultHour[i],
							scheduling: false,
							hourExceeded: false,
						}
						arrayHour.push(objectHour);
					}

					// SET ARRAY RESULT HOUR
					commit('SET_COMPANY_HOUR', arrayHour);

				})
				.catch((error) => {
					console.log(error.message);
				});
		},
		async consultSchedules({ commit, dispatch }, user) {
			// Get reference to all of the documents
			let collectionRef = firebase.firestore().collection('calendar');
			var arraySchedules = [];

			collectionRef.get()
				.then(snapshot => {
					if (snapshot.docs.length <= 0) {
						commit('SET_IS_LOADING', false, { root: true });
					}
					snapshot.forEach(doc => {
						console.log("Parent Document ID: ", doc.id);
						collectionRef.doc(doc.id).collection("years").get()
							.then(snapshot => {
								if (snapshot.docs.length > 0) {
									snapshot.forEach(doc2 => {
										console.log("Sub Document ID: ", doc2.id);

										collectionRef.doc(doc.id).collection("years").doc(doc2.id).collection('months')
											.get()
											.then(snapshot => {
												snapshot.forEach(doc3 => {
													console.log("Sub Document ID: ", doc3.id);

													collectionRef.doc(doc.id)
														.collection("years").doc(doc2.id)
														.collection('months').doc(doc3.id)
														.collection('days')
														.get()
														.then(snapshot => {
															snapshot.forEach(doc4 => {
																console.log("Sub Document ID: ", doc4.id);

																collectionRef.doc(doc.id)
																	.collection("years").doc(doc2.id)
																	.collection('months').doc(doc3.id)
																	.collection('days').doc(doc4.id)
																	.collection('hours')
																	.where("idUser", "array-contains", user.data.id)
																	.get()
																	.then(snapshot => {
																		snapshot.forEach(doc5 => {
																			console.log("Sub Document ID: ", doc5.id);
																			arraySchedules.push(doc5.data());
																			// console.log(arraySchedules);
																			// console.log(snapshot);
																		})

																		var today = new Date();
																		var date;
																		var hour;
																		var dateSchedulesUser;

																		for (let i = 0; i < arraySchedules.length; i++) {
																			date = arraySchedules[i].date.split('/');
																			hour = arraySchedules[i].hour[0].split(':');

																			dateSchedulesUser = new Date(`${date[2]}-${date[1]}-${date[0]} 
																			${hour[0]}:${hour[1]}`);

																			//resetting values for 0
																			today.setSeconds(0);
																			today.setMilliseconds(0);
																			dateSchedulesUser.setSeconds(0);
																			dateSchedulesUser.setMilliseconds(0);

																			if (today.getTime() > dateSchedulesUser.getTime()) {
																				arraySchedules[i].dateExceeded = true;
																			} else {
																				arraySchedules[i].dateExceeded = false;
																			}
																		}

																		// arraySchedules.sort(function(a, b){
																		// 	var aa = a.date.split('/').reverse().join(),
																		// 			bb = b.date.split('/').reverse().join();

																		// 	console.log(aa,bb);
																		// 	return aa < bb ? -1 : (aa > bb ? 1 : 0);
																		// });

																		// console.log('SCHEDULES', arraySchedules);

																		//SET SCHEDULES USER
																		commit('SET_SCHEDULES', arraySchedules);
																		commit('SET_IS_LOADING', false, { root: true });

																	}).catch(err => {
																		console.log("Error getting sub-collection documents", err);
																	})
															})
														}).catch(err => {
															console.log("Error getting sub-collection documents", err);
														})
												})
											}).catch(err => {
												console.log("Error getting sub-collection documents", err);
											})

									})
								} else {
									commit('SET_IS_LOADING', false, { root: true });
								}
							}).catch(err => {
								console.log("Error getting sub-collection documents", err);
							})
					});
				}).catch(err => {
					console.log("Error getting documents", err);
				});
		},
		async cancelSchedule({ commit, dispatch }, schedule) {
			var date = schedule.date;
			date = date.split('/');

			// Get reference to of the document
			let docRef = firebase.firestore()
				.collection('calendar').doc(`${schedule.idCompany[0]}`)
				.collection('years').doc(`${date[2]}`)
				.collection('months').doc(`${date[1]}`)
				.collection('days').doc(`${date[0]}`)
				.collection('hours').doc(`${schedule.hour[0]}`);

			docRef.delete()
				.then(function () {
					console.log("Document successfully deleted!");
					var user = {
						data: {
							id: schedule.idUser[0]
						}
					}
					dispatch('consultSchedules', user).then(function (resp) {
						console.log('Sucesso:', resp);
					}).catch(function (error) {
						console.log('Error:', error);
					});
				}).catch(function (error) {
					console.error("Error removing document: ", error);
				});
		},
		async consultCompanyKeys({ commit, dispatch }, idUser) {
			// VERIFY DATABASE SERVICES DATA
			const tableCompanys = firebase.database().ref("/companys")
				.orderByChild('idUser').equalTo(idUser);
			return new Promise((resolve, reject) => {
				const onError = (error) => reject(error);
				const onData = (snap) => resolve(snap.val());

				tableCompanys.on("value", onData, onError);
			});
			///////////////////////////////
		},
		async consultScheduleManage({ commit, dispatch }, [scheduleDate, idCompany]) {

			var arrayManageSchedules = [];

			//SET 0 IN NUMBERS ELEMENTS
			scheduleDate.day < 10 ? 
			scheduleDate.day = '0' + scheduleDate.day : 
			scheduleDate.day = scheduleDate.day;

      scheduleDate.month < 10 ? 
			scheduleDate.month = '0' + (scheduleDate.month + 1) : 
			scheduleDate.month = (scheduleDate.month + 1);
			/////////////////////////////////////////////////////

			// Get reference to of the document
			let collectionRef = firebase.firestore()
				.collection('calendar').doc(`${idCompany}`)
				.collection('years').doc(`${scheduleDate.year}`)
				.collection('months').doc(`${scheduleDate.month}`)
				.collection('days').doc(`${scheduleDate.day}`)
				.collection('hours');

			collectionRef.get()
				.then(snapshot => {
					if (snapshot.docs.length > 0) {
						snapshot.forEach(doc => {
							console.log("Parent Document ID: ", doc.data());
							arrayManageSchedules.push(doc.data());
						});

						// VERIFY DATE EXCEDEED
						var today = new Date();
						var date;
						var hour;
						var dateSchedulesUser;

						for (let i = 0; i < arrayManageSchedules.length; i++) {
							date = arrayManageSchedules[i].date.split('/');
							hour = arrayManageSchedules[i].hour[0].split(':');

							dateSchedulesUser = new Date(`${date[2]}-${date[1]}-${date[0]} 
						${hour[0]}:${hour[1]}`);

							//resetting values for 0
							today.setSeconds(0);
							today.setMilliseconds(0);
							dateSchedulesUser.setSeconds(0);
							dateSchedulesUser.setMilliseconds(0);

							if (today.getTime() > dateSchedulesUser.getTime()) {
								arrayManageSchedules[i].dateExceeded = true;
							} else {
								arrayManageSchedules[i].dateExceeded = false;
							}
						}

						commit('SET_MANAGE_SCHEDULES', arrayManageSchedules);
						commit('SET_IS_LOADING', false, { root: true });
					} else {
						console.log("Not Document");
						arrayManageSchedules = [];
						commit('SET_MANAGE_SCHEDULES', arrayManageSchedules);
						commit('SET_IS_LOADING', false, { root: true });
					}
				}).catch(err => {
					console.log("Error getting documents", err);
					commit('SET_IS_LOADING', false, { root: true });
				});

		},
		async cancelScheduleManage({ commit, dispatch }, schedule) {
			var date = schedule.date;
			date = date.split('/');

			// Get reference to of the document
			let docRef = firebase.firestore()
				.collection('calendar').doc(`${schedule.idCompany[0]}`)
				.collection('years').doc(`${date[2]}`)
				.collection('months').doc(`${date[1]}`)
				.collection('days').doc(`${date[0]}`)
				.collection('hours').doc(`${schedule.hour[0]}`);

			docRef.delete()
				.then(function () {
					console.log("Document successfully deleted!");
					var scheduleDate = {
						day: date[0],
						month: date[1] - 1,
						year: date[2]
					}
					dispatch('consultScheduleManage', [scheduleDate, schedule.idCompany[0]]).then(function (resp) {
						console.log('Sucesso:', resp);
					}).catch(function (error) {
						console.log('Error:', error);
					});
				}).catch(function (error) {
					console.error("Error removing document: ", error);
				});
		},
		async deleteSchedulesCompany({ commit, dispatch }, idCompany) {
			// Delete doc schedules company id
			await firebase.firestore().collection('calendar').doc(`${idCompany}`).delete();
			//////////////////////////////////
		},
	}
}