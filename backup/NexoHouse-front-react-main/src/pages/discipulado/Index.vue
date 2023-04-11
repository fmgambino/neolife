<template>
  <div class="q-pa-sm">
    <div v-for="(item, index) in tables" :key="index">
    <q-card flat class="row justify-between items-center q-pa-sm bordes_left" :class="index > 0 ? 'q-mt-md' : ''">
      <q-btn
        rounded dense no-caps
        color="green"
        style="width: 150px"
        @click="exapandTable(item)"
      >
      <div class="row items-center" style="width:100%">
        <q-icon :name="!item.expand ? 'expand_more' : 'expand_less'"></q-icon>
        <label>
            {{item.label}}
        </label>
      </div>
      </q-btn>
      <q-btn rounded dense no-caps color="green" class="q-px-sm" icon-right="navigate_next" label="Exportar" />
    </q-card>

    <div v-if="item.expand" class="q-mt-md">
      <div class="q-mt-md bordes">
        <q-btn flat no-caps dense icon="add_circle_outline" color="primary" label="Añadir otro lider" />
      </div>
      <q-table
        flat bordered
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:header-cell-actions="props">
            <q-th :props="props">
            <q-icon name="add_circle_outline" size="sm" color="primary" />
            </q-th>
        </template>

        <template v-slot:body-cell-coordinator="props">
            <q-td :props="props">
            <div class="row items-center justify-center no-wrap q-gutter-x-sm">
                <q-avatar color="primary" text-color="white" size="md">{{props.value[0]}}</q-avatar>
            </div>
            </q-td>
        </template>
        <template v-slot:body-cell-attendance="props">
            <q-td :props="props">
            <div class="row items-center justify-center no-wrap q-gutter-x-sm">
                <q-avatar color="primary" text-color="white" size="md">{{props.value}}</q-avatar>
            </div>
            </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
            <q-td :props="props">
            <q-btn round dense color="primary" icon="info_outline" class="q-mr-xs" @click="seeInfo(props.row)" />
            <q-btn round dense color="red" icon="delete" @click="deleteInfo(props.row)" />
            </q-td>
        </template>
      </q-table>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'disipulado',
  data () {
    return {
      tables: [
        {
          id: 1,
          expand: true,
          label: 'Diciembre 2022'
        },
        {
          id: 2,
          expand: false,
          label: 'Enero 2023'
        }
      ],
      columns: [
        {
          name: 'leader',
          required: true,
          label: 'Lider de células',
          align: 'left',
          field: row => row.leader,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'coordinator', label: 'Coordinador', field: 'coordinator', align: 'left' },
        { name: 'discipler', label: 'Discipulador', field: 'discipler', align: 'left' },
        { name: 'dd', label: 'DD', field: 'dd' },
        { name: 'dr', label: 'DR', field: 'dr' },
        { name: 'attendance', label: 'Asistencia %', field: 'attendance' },
        { name: 'service', label: 'Área de servicio', field: 'service', align: 'center' },
        { name: 'phone', label: 'Teléfono', field: 'phone', align: 'center' },
        { name: 'location', label: 'Direcció de celula', field: 'location', align: 'left' },
        { name: 'actions', label: '', field: 'actions', align: 'center' }
      ],
      data: [
        {
          id: 1,
          leader: 'Lider',
          coordinator: 'Coordinador',
          discipler: 'Discipulador',
          dd: '4',
          dr: '12',
          attendance: 100,
          service: 'Limpieza',
          phone: '+98798343534',
          location: 'Dirección'
        }
      ]
    }
  },
  mounted () {},
  methods: {
    exapandTable (data) {
      for (const i in this.tables) {
        if (this.tables[i].id === data.id) {
          this.tables[i].expand = !this.tables[i].expand
        } else {
          this.tables[i].expand = false
        }
      }
    },
    seeInfo (data) {
      this.$router.push('/discipulado/' + data.id)
    },
    deleteInfo (data) {}
  }
}
</script>

<style lang="scss" scoped>
.bordes {
  border-radius: 10px 10px 0px 0px;
  border-top: 0.1rem solid rgb(224, 221, 221);
  border-right: 0.1rem solid rgb(224, 221, 221);
  border-left: 0.1rem solid rgb(224, 221, 221);
}
.bordes_left {
  background-color: #F2F2F2;
  border-radius: 10px;
  border-left: 5px solid #2AB930;
}
</style>
