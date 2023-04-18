<template>
  <q-page class="bg-dark">
  </q-page>
</template>
<script>

export default {
  name: 'HomeMain',
  data () {
    return {
    }
  },
  mounted () {},
  methods: {
    confirm () {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message:
          'Solicitud realizada correctamente, sera contactado a la brevedad.'
      })
    }
  }
}
</script>
