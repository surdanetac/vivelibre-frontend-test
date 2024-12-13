import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap'
import ToastNotification from './components/ToastNotification.vue'

Vue.config.productionTip = false

const ToastConstructor = Vue.extend(ToastNotification)
const toastInstance = new ToastConstructor()

toastInstance.$mount()
document.body.appendChild(toastInstance.$el)

Vue.prototype.$toast = (message, type = 'primary') => {
  toastInstance.showToast(message, type);
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')