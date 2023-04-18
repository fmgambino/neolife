<template>
  <div
    class="fullscreen column items-center justify-center"
    style="background: #F5F5F5"
  >
    <q-card flat class="card_login">
      <div class="row justify-center q-pb-md">
        <img src="NEXOHouse.svg" style="width: 90%" alt="" />
      </div>
      <div>
        <div class="text-grey-8">Ingresa tu email</div>
        <q-input
          outlined dense
          v-model="form.email"
          style="width: 100%"
          placeholder="example@nexosuite.com"
          @keyup.enter="submit"
          :error="$v.form.email.$error"
          error-message="Ingrese su correo electrónico"
        >
        </q-input>
        <div class="text-grey-8">Ingresa tu contraseña</div>
        <q-input
          outlined dense
          v-model="form.password"
          class="q-mb-md"
          style="width: 100%"
          :type="isPwd ? 'password' : 'text'"
          placeholder="Contraseña"
          :error="$v.form.password.$error"
          error-message="Ingrese su contraseña"
          @keyup.enter="submit"
        >
          <template slot="append">
            <q-icon
              color="primary"
              :name="isPwd ? 'vpn_key' : 'visibility'"
              @click="isPwd = !isPwd"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </div>
      <div class="column items-center">
        <q-btn
          color="primary"
          rounded no-caps
          style="width: 100%"
          label="Iniciar sesión"
          type="submit"
          @click="submit"
        />
        <div
          class="text-center cursor-pointer q-mt-md"
          @click="isReset = true"
          >¿Olvidaste tu contraseña?
        </div>
      </div>
    </q-card>
<!--     <div style="width: 100%" class="text-center absolute-bottom q-pb-md">©2009-2022 NEXOLIFE LLC, Inc</div> -->
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      resetPass: false,
      form: {
        email: '',
        password: ''
      },
      isPwd: true,
      isReset: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    submit () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        this.$api.post('/auth', this.form).then(res => {
          if (res) {
            this.login(res)
            this.$router.push('/home')
          }
          this.$q.loading.hide()
        })
      }
    },
    changePassword () {
      this.isReset = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card_login {
  width: 400px;
  max-width: 90%;
  border-radius: 20px;
  padding: 50px;
}
</style>
