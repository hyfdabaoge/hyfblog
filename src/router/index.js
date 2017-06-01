import Vue from 'vue'
import Router from 'vue-router'
import Reg from '../components/back/Reg'
import Login from '../components/back/Login'
import ClassifyList from '../components/back/ClassifyList'
import ArticleList from '../components/back/ArticleList'
import ArticleEdit from '../components/back/ArticleEdit'
import ArticleCreate from '../components/back/ArticleCreate'
import Admin from '../components/back/Admin'
import About from '../components/front/About'
import Tags from '../components/front/Tags'
import Home from '../components/front/Home'
import Details from '../components/front/Details'
import Main from '../components/front/Main'
import NotFound from '../components/NotFound'
// import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {path: '', redirect: 'main'},
        {path: 'main', component: Main},
        {path: 'tags', component: Tags},
        {path: 'about', component: About},
        {path: 'details/:id', component: Details}
      ]
    },

    {
      path: '/login',
      component: Login
    },

    {
      path: '/reg',
      component: Reg
    },

    {
      path: '/admin',
      component: Admin,
      children: [
        {path: '', redirect: 'articlelist'},
        {path: 'articlelist', component: ArticleList, meta: {requireAuth: true}},
        {path: 'articleCreate', component: ArticleCreate, meta: {requireAuth: true}},
        {path: 'classifylist', component: ClassifyList, meta: {requireAuth: true}},
        {path: 'articleedit/:id', component: ArticleEdit, meta: {requireAuth: true}}
      ]
    },
    {
      path: '*',
      component: NotFound,
      hidden: true
    }
  ]
})

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       component: Home,
//       children: [
//         {path: '', redirect: 'main'},
//         {path: 'main', component: Main},
//         {path: 'tags', component: Tags},
//         {path: 'about', component: About},
//         {path: 'details/:id', component: Details}
//       ]
//     },

//     {
//       path: '/login',
//       component: Login
//     },

//     {
//       path: '/reg',
//       component: Reg
//     },

//     {
//       path: '/admin',
//       component: Admin,
//       children: [
//         {path: '', redirect: 'articlelist'},
//         {path: 'articlelist', component: ArticleList},
//         {path: 'articleCreate', component: ArticleCreate},
//         {path: 'classifylist', component: ClassifyList},
//         {path: 'articleedit/:id', component: ArticleEdit}
//       ],
//       meta: {
//         requireAuth: true
//       }
//     },
//     {
//       path: '*',
//       component: NotFound,
//       hidden: true
//     }
//   ]
// })

router.beforeEach((to, from, next) => {
  // let token = Boolean(store.state.token)
  let token = localStorage.getItem('token')
  // if (to.meta.requireAuth && !token && to.path !== '/login') {
  //   return next({path: '/login'})
  // }
  // if (token && (to.path === '/login' || to.path === '/reg')) {
  //   return next({path: '/admin/articlelist'})
  // }
  // next()
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
