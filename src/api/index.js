import axios from 'axios'
// import store from '../store/index.js'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use = instance.interceptors.request.use

instance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})
// axios拦截响应
instance.interceptors.response.use(response => {
  // store.dispatch('showProgress',100)
  return response
}, err => {
  // store.dispatch('showProgress',100)
  return Promise.reject(err)
})
export default {
  getArticleList (data) {
    return instance.post('/api/article/list', data)
  },
  getArticleLists () {
    return instance.get('/api/article/list')
  },
  getClassifyList (data) {
    return instance.post('/api/classify/list', data)
  },
  getClassifyLists () {
    return instance.get('/api/classify/list')
  },
  getconbyclassify (data) {
    return instance.post('/api/article/bytag', data)
  },
  saveClassify (data) {
    return instance.post('/api/classify/save', data)
  },
  delArticle (data) {
    return instance.post('/api/article/del', data)
  },
  delClassify (data) {
    return instance.post('/api/classify/del', data)
  },
  saveArticle (data) {
    return instance.post('/api/article/save', data)
  },
  getOne (data) {
    return instance.post('/api/article/getone', data)
  },
  editAritcle (data) {
    return instance.post('/api/article/edit', data)
  },
  userReg (data) {
    return instance.post('/api/user/reg', data)
  },
  userLogin (data) {
    return instance.post('/api/user/login', data)
  }
}
