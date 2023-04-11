<template>
  <q-page class="bg-dark column items-center q-py-md">
    <q-avatar size="100px">
      <img src="layout/Perfil 2.webp" />
      <div class="absolute-bottom-right">
        <q-btn round dense color="primary" icon="edit" />
      </div>
    </q-avatar>

    <div class="row q-py-md justify-center">
      <div class="row col-xs-12 col-sm-7 col-md-7 col-lg-7 q-gutter-y-sm text-caption">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-px-sm">
            <div>Nombre</div>
            <q-input outlined dense v-model="form.name" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-px-sm">
            <div>Apellido</div>
            <q-input outlined dense v-model="form.last_name" />
        </div>
        <div class="col-12 q-px-sm">
            <div>Email</div>
            <q-input outlined dense v-model="form.email" />
        </div>
        <div class="col-12 q-px-sm">
            <div>teléfono</div>
            <q-input outlined dense v-model="form.phone" />
        </div>
        <div class="col-12 q-px-sm">
            <div>Perfil</div>
            <q-input outlined dense v-model="form.perfil" />
        </div>
        <div class="col-12 q-px-sm">
            <div>Nombre del Ministerio / Iglesia</div>
            <q-input outlined dense v-model="form.church" />
        </div>
      </div>
    </div>

    <q-btn no-caps rounded dense class="q-px-md" color="primary" label="Guardar" />
  </q-page>
</template>
<script>

export default {
  name: 'perfil',
  data () {
    return {
      form: {}
    }
  },
  mounted () {},
  methods: {
  }
}
</script>
