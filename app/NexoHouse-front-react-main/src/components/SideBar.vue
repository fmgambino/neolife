<template>
  <q-list class="q-pt-md">
    <template v-for="item in menu" class="row">
      <q-item
        v-if="can(item.permission)"
        clickable
        v-ripple
        :to="item.to"
        :key="item.label"
        class="q-pa-none"
        @click="selectItem(item)"
      >
      <div class="row no-wrap q-ma-none" style="width:100%">
        <div
          class="q-px-xs q-mr-sm"
          :class="{
            'item-active': active_link_menu === item.id
          }">
        </div>
        <div
          class="row no-wrap items-center q-px-sm"
          style="width: 100%"
          :class="{
            'item-active border_end text-bold': active_link_menu === item.id
          }"
          >
          <div class="row justify-center items-center">
            <img
              :src="item.icon" style="width: 21px"
            />
          </div>
          <div class="q-pl-sm">{{ item.label }}</div>
        </div>
      </div>
      </q-item>
    </template>
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBar',
  data () {
    return {
      menu: [
        {
          id: 1,
          label: 'Dashboard',
          icon: 'layout/dashboard.svg',
          to: '',
          permission: 1
        },
        {
          id: 2,
          label: 'Evangelizar',
          icon: 'layout/evangelizar.svg',
          to: '/evangelizar',
          permission: 2
        },
        {
          id: 3,
          label: 'Consolidación',
          icon: 'layout/consolidacion.svg',
          to: '/consolidacion',
          permission: 3
        },
        {
          id: 4,
          label: 'Discipulado',
          icon: 'layout/discipulado.svg',
          to: '/discipulado',
          permission: 4
        },
        {
          id: 5,
          label: 'Administración de usuarios',
          icon: 'layout/admin-user.svg',
          to: '/administracion/usuarios',
          permission: 5
        },
        {
          id: 6,
          label: 'Añadir Plantilla',
          icon: 'layout/add-plantilla.svg',
          to: '/plantillas',
          permission: 6
        },
        {
          id: 7,
          label: 'Gestion de Iglesias',
          icon: 'layout/add-plantilla.svg',
          to: '/iglesias',
          permission: 7
        },
        {
          id: 8,
          label: 'Administración de usuario',
          icon: 'layout/admin-user.svg',
          to: '/administrador/usuarios',
          permission: 8
        }
      ],
      active_link_menu: 1
    }
  },
  computed: {
    ...mapGetters('generals', ['can'])
  },
  mounted () {
    for (let x = 0; x < this.menu.length; x++) {
      const item = this.menu[x]
      if (item.to === this.$router.currentRoute.path) {
        this.active_link_menu = item.id
      }
    }
  },
  methods: {
    selectItem (item) {
      this.active_link_menu = item.id
      console.log(this.active_link_menu)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-active {
  color: white;
  background-color: #00C236;
}
.border_end {
  border-radius: 0px 40px 40px 0px;
}
</style>
