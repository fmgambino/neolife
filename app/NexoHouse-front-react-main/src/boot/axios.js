import axios from 'axios'
import env from '../env'
import { Notify } from 'quasar'
const axiosInstance = axios.create({
  baseURL: env.apiUrl
})

export default async ({ store, Vue, router }) => {
  Vue.prototype.$api = axiosInstance
  axiosInstance.interceptors.response.use(function (response) {
    if (response.config.method === 'post') {
      if (response.status === 201) {
        if (response.data.token === undefined) {
          Notify.create({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Registro guardado con éxito!'
          })
        } else {
          localStorage.setItem('_SESSION_INFO_', JSON.stringify(response.data))
        }
      }
    }
    return response.data
  }, function (error) {
    if (error.response === undefined) {
      Notify.create({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: 'No se pudo establecer conexión con el servidor. Revisa tu conexión a internet. ' + error
      })
    } else {
      if (error.response.status === 401) {
        if (error.response.data.message) {
          Notify.create({
            message: error.response.data.message,
            color: 'black'
          })
        } else {
          Notify.create({
            message: 'Correo y/o Contraseña Incorrectos',
            color: 'black'
          })
        }
        localStorage.removeItem('_SESSION_INFO_')
        router.push('/login')
      } else if (error.response.status === 403) {
        Notify.create({
          message: error.response.data,
          color: 'red'
        })
        localStorage.removeItem('_SESSION_INFO_')
      } else if (error.response.status === 404) {
        if (error.response.data.message) {
          Notify.create({
            message: error.response.data.message,
            color: 'black'
          })
        } else {
          Notify.create({
            message: 'Ruta no encontrada - 404',
            color: 'black'
          })
        }
      } else if (error.response.status === 422) {
        if (error.response.data.length > 0) {
          let message = ''
          for (const i of error.response.data) {
            message += `${i.message} \n`
          }
          Notify.create({
            message: message,
            color: 'red',
            position: 'bottom'
          })
        } else {
          Notify.create({
            message: error.response.data.message,
            color: 'red',
            position: 'bottom'
          })
        }
      } else if (error.response.status === 500) {
        Notify.create({
          message: 'Error de conexión con el servidor',
          color: 'red',
          position: 'bottom'
        })
      }
      var data = error.response.data
      if (data) {
        if (data.statusCode === 403) {
          Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: data.message
          })
        }
        if (data.statusCode === 500) {
          Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Error interno en servidor' + data.message
          })
        }
      } else if (error.request) {
      } else {
      }
    }
  })
  axiosInstance.interceptors.request.use(async function (config) {
    store.dispatch('generals/fetchAccessToken')
    const token = (store.state.generals._SESSION_INFO_ !== null) ? store.state.generals._SESSION_INFO_.token : false
    if (token) {
      if (!config.headers) { config.headers = {} }
      config.headers = {
        Authorization: 'Bearer ' + token
      }
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
}

export { axiosInstance }
