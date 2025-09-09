import Vue from 'vue';
import Router from 'vue-router';
import CommnadDesign from './views/CommnadDesign/index.vue';
// import LayoutView from './layouts/layout';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layouts',
      component: CommnadDesign
      // children: [
      //     {
      //         path: '/components/title',
      //         name: 'title',
      //         component: Title,
      //     }
      // ]
    }
  ]
});
