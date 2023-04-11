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
            <q-btn round dense color="primary" icon="info_outline" class="q-mr-xs" @click="seeCell(props.row)" />
            <q-btn round dense color="red" icon="delete" @click="seeCell(props.row)" />
            </q-td>
        </template>
      </q-table>
        <div v-for="(detail, index2) in item.details" :key="index2" class="q-mx-md q-pb-sm">
            <q-card flat class="row justify-between items-center q-pa-sm bordes_left" :class="index > 0 ? 'q-mt-md' : ''">
            <q-btn
                rounded dense no-caps
                color="green"
                style="width: 150px"
                @click="exapandTableDetail(detail, index)"
            >
            <div class="row items-center" style="width:100%">
                <q-icon :name="!detail.expand ? 'expand_more' : 'expand_less'"></q-icon>
                <label>
                    {{detail.label}}
                </label>
            </div>
            </q-btn>
            <q-btn rounded dense no-caps color="green" class="q-px-sm" icon-right="navigate_next" label="Exportar" />
            </q-card>

            <div v-if="detail.expand" class="q-mt-md">
            <div class="q-mt-md bordes">
                <q-btn flat no-caps dense icon="add_circle_outline" color="primary" label="Añadir otro discipulo" />
            </div>
            <q-table
                flat bordered
                :data="detail.data"
                :columns="columnsDetail"
                row-key="name"
            >
                <template v-slot:header-cell-actions="props">
                    <q-th :props="props">
                    <q-icon name="add_circle_outline" size="sm" color="primary" />
                    </q-th>
                </template>

                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                    <q-btn round dense color="primary" icon="info_outline" class="q-mr-xs" @click="seeCell(props.row)" />
                    <q-btn round dense color="red" icon="delete" @click="seeCell(props.row)" />
                    </q-td>
                </template>
            </q-table>
            </div>
        </div>
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
          label: 'Diciembre 2022',
          details: [
            {
              id: 1,
              expand: true,
              label: 'Octubre 2022',
              data: [
                {
                  name: 'Carlos Peraza',
                  id: 1,
                  s1: 'Presente',
                  s2: 'No presente',
                  s3: 'Presente',
                  s4: 'Presente'
                },
                {
                  name: 'Dayan Alejandro Barboza',
                  id: 2,
                  s1: 'Presente',
                  s2: 'No presente',
                  s3: 'Presente',
                  s4: 'Presente'
                }
              ]
            },
            {
              id: 2,
              expand: false,
              label: 'Noviembre 2022',
              data: [
                {
                  name: 'Carlos Peraza',
                  id: 1,
                  s1: 'Presente',
                  s2: 'No presente',
                  s3: 'Presente',
                  s4: 'Presente'
                },
                {
                  name: 'Dayan Alejandro Barboza',
                  id: 2,
                  s1: 'Presente',
                  s2: 'No presente',
                  s3: 'Presente',
                  s4: 'Presente'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          expand: false,
          label: 'Enero 2023',
          details: [
            {
              id: 1,
              expand: false,
              label: 'Febrero 2023',
              data: [
                {
                  name: 'Carlos Peraza',
                  id: 1,
                  s1: 'Presente',
                  s2: 'No presente',
                  s3: 'Presente',
                  s4: 'Presente'
                },
                {
                  name: 'Dayan Alejandro Barboza',
                  id: 2,
                  s1: 'Presente',
                  s2: 'No presente',
                  s3: 'Presente',
                  s4: 'Presente'
                }
              ]
            },
            {
              id: 2,
              expand: false,
              label: 'Marzo 2023',
              data: [
                {
                  name: 'Carlos Peraza',
                  id: 1,
                  s1: 'Presente',
                  s2: 'No presente',
                  s3: 'Presente',
                  s4: 'Presente'
                },
                {
                  name: 'Dayan Alejandro Barboza',
                  id: 2,
                  s1: 'Presente',
                  s2: 'No presente',
                  s3: 'Presente',
                  s4: 'Presente'
                }
              ]
            }
          ]
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
      columnsDetail: [
        {
          name: 'name',
          required: true,
          label: 'Asistentes de células',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 's1', label: 'Semana 1', field: 's1', align: 'left' },
        { name: 's2', label: 'Semana 2', field: 's2', align: 'left' },
        { name: 's3', label: 'Semana 3', field: 's3' },
        { name: 's4', label: 'Semana 4', field: 's4' },
        { name: 'actions', label: '', field: 'actions', align: 'center' }
      ],
      data: [
        {
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
          if (this.tables[i].details) {
            for (const j in this.tables[i].details) {
              this.tables[i].details[j].expand = false
            }
          }
        }
      }
    },
    exapandTableDetail (data, index) {
      console.log(this.tables[index])
      for (const i in this.tables[index].details) {
        console.log(this.tables[index].details[i], i, data.id)
        if (this.tables[index].details[i].id === data.id) {
          this.tables[index].details[i].expand = !this.tables[index].details[i].expand
        } else {
          this.tables[index].details[i].expand = false
        }
      }
    },
    seeCell (data) {
      this.$router.push('/discipulado/1/' + data.id)
    }
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
