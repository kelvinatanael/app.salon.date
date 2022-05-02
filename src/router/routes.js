
import HomePage from '../pages/home.vue';
import AboutPage from '../pages/about.vue';
import FormPage from '../pages/form.vue';
import SalonInternPage from '../pages/salon-intern.vue';
import Login from '../pages/login.vue';
import RegistrationType from '../pages/registration-type.vue';
import RegisterClient from '../pages/register-client.vue';
import RegisterProfessional from '../pages/register-professional.vue';
import ChangePassword from '../pages/change-password.vue';
import RegisterCompany from '../pages/register-company.vue';
import EditCompany from '../pages/edit-company.vue';
import CompanysRegisters from '../pages/companys-registers.vue';
import RegisterServices from '../pages/register-services.vue';
import EditServices from '../pages/edit-services.vue';
import ServicesRegistred from '../pages/services-registred.vue';
import ManagePage from '../pages/manage.vue';
import SchedulesPage from '../pages/schedules.vue';
import ManageSchedulesPage from '../pages/manage-schedules.vue';
import ProfilePage from '../pages/profile.vue';
import EditUserPage from '../pages/edit-user.vue';

import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home'
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    name: 'salaoInterna',
    path: '/salao-interna/',
    component: SalonInternPage,
  },
  {
    path: '/login/',
    component: Login,
    name: 'login'
  },
  {
    path: '/cadastro-tipo/',
    component: RegistrationType,
    name: 'registerType',
  },
  {
    path: '/cadastro-cliente/',
    component: RegisterClient,
    name: 'registerClient',
  },
  {
    path: '/cadastro-profissional/',
    component: RegisterProfessional,
    name: 'registerProfessional',
  },
  {
    path: '/alterar-senha/',
    component: ChangePassword,
    name: 'changePassword'
  },
  {
    path: '/registro-empresa/',
    component: RegisterCompany,
    name: 'registerCompany',
  },
  {
    path: '/editar-empresa/',
    component: EditCompany,
    name: 'editCompany',
  },
  {
    path: '/empresas-registradas/',
    component: CompanysRegisters,
    name: 'companyRegisters',
  },
  {
    path: '/registro-servicos/',
    component: RegisterServices,
    name: 'registerServices',
  },
  {
    path: '/editar-servicos/',
    component: EditServices,
    name: 'editServices',
  },
  {
    path: '/servicos-registrados/',
    component: ServicesRegistred,
    name: 'servicesRegistred',
  },
  {
    path: '/gerenciar/',
    component: ManagePage,
    name: 'pageManage'
  },
  {
    path: '/agendamentos/',
    component: SchedulesPage,
    name: 'schedulings'
  },
  {
    path: '/gerenciar-agendamentos/',
    component: ManageSchedulesPage,
    name: 'manageSchedules',
  },
  {
    path: '/perfil/',
    component: ProfilePage,
    name: 'pageProfile'
  },
  {
    path: '/editar-usuario/',
    component: EditUserPage,
    name: 'editUser'
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
