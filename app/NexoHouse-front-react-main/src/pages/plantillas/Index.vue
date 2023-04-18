<template>
  <q-page class="bg-dark text-center column items-center justify-center">
    <img src="icons/plantillas.png" style="width: 50px" />
    <div class="text-h6">Creació de nueva plantilla</div>
    <div class="text-caption">Podrás generar una plantilla nueva copiando <br> el diseño de las ya existentes.</div>
    <div class="row">
      <div v-for="(item, index) in templates" :key="index" class="q-pa-md">
        <q-card class="column items-center justify-center text-center text-white bg-black" style="width: 200px; height: 150px">
          <img :src="item.icon" class="color" style="width: 35px" />
          <div class="q-py-sm">{{item.title}}</div>
          <q-btn no-caps rounded dense class="q-px-md" color="primary" label="Elegir plantilla" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>

export default {
  name: 'HomeMain',
  data () {
    return {
      templates: [
        {
          icon: 'layout/evangelizar.svg',
          title: 'Plantilla de Evangelizar',
          to: ''
        },
        {
          icon: 'layout/consolidacion.svg',
          title: 'Plantilla de Consolidacion',
          to: ''
        },
        {
          icon: 'layout/discipulado.svg',
          title: 'Plantilla de Discipulado',
          to: ''
        }
      ]
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
<style scoped lang="scss">
.color {
  filter: invert(1)
}
</style>
