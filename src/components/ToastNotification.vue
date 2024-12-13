<template>
  <div v-if="toasts.length" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1055;">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      class="toast align-items-center text-bg-primary border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      :class="`text-bg-${toast.type}`"
      data-bs-autohide="true"
      data-bs-delay="3000"
      @hidden.bs.toast="removeToast(index)"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ toast.message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'bootstrap';
export default {
  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    showToast(message, type = 'primary') {
      this.toasts.push({ message, type });
      this.$nextTick(() => {
        const toastElements = document.querySelectorAll('.toast')
        const lastToast = toastElements[toastElements.length - 1]
        const toastInstance = new Toast(lastToast)
        toastInstance.show()
      })
    },
    removeToast(index) {
      this.toasts.splice(index, 1)
    },
  },
};
</script>

<style scoped>
.toast-container {
  max-width: 400px;
}
</style>
