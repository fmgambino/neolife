<template>
  <q-layout view="hHh Lpr fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
        <img src="layout/menu-left-alt.png" alt="">
        </q-btn>

        <q-toolbar-title>
          <img style="width: 100px"  src="NEXOHouse.svg" color="white"/>
        </q-toolbar-title>
        <q-space/>
        <div class="row items-center q-gutter-x-xs">
          <q-input rounded outlined dense v-model="search" placeholder="Buscador">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <img src="layout/bell.svg" style="width: 25px" class="cursor-pointer" />
          <q-btn round dense outline icon="more_horiz" size="sm">
            <q-menu>
              <q-list style="min-width: 180px">
                <q-item clickable v-close-popup to="/perfil">
                  <div class="row items-center q-gutter-x-xs">
                    <q-icon name="account_circle" />
                    <div>Mi perfil</div>
                  </div>
                </q-item>
                <!-- <q-item clickable v-close-popup>
                  <div class="row items-center q-gutter-x-xs">
                    <q-icon name="credit_card" />
                    <div>Facturación</div>
                  </div>
                </q-item> -->
                 <q-item clickable v-close-popup>
                  <div class="row items-center q-gutter-x-xs">
                    <q-icon name="settings" />
                    <div>Configuraciones</div>
                  </div>
                </q-item>
                 <q-item clickable v-close-popup>
                  <div class="row items-center q-gutter-x-xs">
                    <q-icon name="power_settings_new" color="red" />
                    <div class="text-red">Cerrar sesión</div>
                  </div>
                </q-item>
                <q-separator />
              </q-list>
            </q-menu>
          </q-btn>
          <img src="layout/Perfil 2.webp" class="cursor-pointer" style="width: 2rem; border-radius: 100%" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white text-black"
      :width="300"
    >

      <div class="fit column justify-between">
        <div>
          <SideBar />
        </div>
        <div>
          <q-separator />
          <q-item v-ripple clickable @click="toLogout">
            <q-item-section avatar>
              <img src="layout/soporte.svg" style="width: 21px"/>
            </q-item-section>
            <q-item-section class="text-black">
              Soporte Técnico
            </q-item-section>
          </q-item>
          <q-item v-ripple clickable @click="toLogout">
            <q-item-section avatar>
              <img src="layout/log-out.svg" style="width: 21px"/>
            </q-item-section>
            <q-item-section class="text-red">
              Cerrar sesión
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SideBar from 'components/SideBar'
import { mapMutations } from 'vuex'

export default {
  name: 'MainLayout',
  components: { SideBar },
  data () {
    return {
      search: '',
      leftDrawerOpen: false,
      logo: require('../../public/Quasar_Logo.png')
    }
  },
  methods: {
    ...mapMutations('generals', ['logout']),
    toLogout () {
      this.logout()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="stylus" scoped>
.layout-drawer--profile
  display flex
  width 100%
  > .q-toolbar
    margin-right -2px
    padding 0px 12px
    width auto

.layout-drawer--toolbar
  position absolute
  top 0
  right 0
  left 0
  width 100%
  > .q-toolbar
    margin-right -2px
    padding 0px 12px
    width auto

</style>
