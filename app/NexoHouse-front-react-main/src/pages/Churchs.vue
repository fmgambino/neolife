<template>
  <div class="q-pa-sm">
    <q-card flat bordered class="row justify-between items-center q-pa-sm">
      <div class="text-subtitle1 text-bold">Iglesias dadas de alta</div>
      <div class="row q-gutter-xs items-center">
        <q-select outlined rounded dense v-model="filterBy" :options="options" style="width: 200px">
          <template v-slot:prepend>
            <div class="text-caption">Filtrar por:</div>
          </template>
          <template v-slot:append>
            <q-separator vertical />
          </template>
        </q-select>
        <q-btn-dropdown rounded dense no-caps class="q-px-xs" color="primary" label="Acción masiva">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Opción 1</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-group style="border-radius: 10px">
          <q-btn dense :color="selectGroup === 1 ? 'primary' : 'white'" :text-color="selectGroup === 1 ? 'white' : 'black'"
            icon="view_headline"
            @click="selectGroup = 1" />
          <q-btn dense :color="selectGroup === 2 ? 'primary' : 'white'" :text-color="selectGroup === 2 ? 'white' : 'black'"
            icon="dashboard_customize"
            @click="selectGroup = 2" />
        </q-btn-group>
      </div>
    </q-card>

    <div class="q-mt-md bordes">
      <q-btn flat no-caps dense icon="add_circle_outline" color="primary" label="Añadir otra iglesia" @click="seeModal()" />
    </div>
    <q-table
      flat bordered
      :data="data"
      :columns="columns"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
    >
      <template v-slot:header-cell-actions="props">
        <q-th :props="props">
          <q-icon name="add_circle_outline" size="sm" color="primary" />
        </q-th>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div class="row items-center no-wrap q-gutter-x-sm">
            <q-avatar color="primary" text-color="white" size="sm">{{props.value[0]}}</q-avatar>
            <div>{{props.value}}</div>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn round dense color="primary" icon="edit" class="q-mr-xs" @click="editRecord(props.row)" />
          <q-btn round dense color="red" icon="delete" @click="deleteRecord(props.row._id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modalData" persistent>
      <q-card  style="width: 90%" class="q-pa-md column items-center">
        <q-btn round dense color="red" icon="clear" class="absolute-top-right q-ma-xs" @click="modalData = false" />
        <div class="text-h6">{{editForm ? 'Editar' : 'Añadir '}} Iglesia</div>
        <div class="q-pb-lg" style="width: 100%">
            <div>Nombre</div>
            <q-input  :error="$v.form.name.$error" error-message="Este campo es requerido" outlined dense v-model="form.name" placeholder="Nombre de la Igleisa" />
            <div class="q-mt-sm">Dirección</div>
            <q-input  :error="$v.form.address.$error" error-message="Este campo es requerido" outlined dense v-model="form.address" placeholder="Calle 50" />
        </div>
        <q-btn rounded no-caps color="primary" @click="saveRecord()" label="Guardar" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'admin-churchs',
  data () {
    return {
      modalData: false,
      editForm: false,
      selectGroup: 1,
      filterBy: '',
      form: {},
      options: [],
      selected: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'address', label: 'Dirección', field: 'address', align: 'left' },
        { name: 'actions', label: '', field: 'actions', align: 'center' }
      ],
      data: []
    }
  },
  validations: {
    form: {
      name: { required },
      address: { required }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData() {
      this.$q.loading.show()
      this.$api.get('/church').then(res => {
        if (res) {
          this.data = res.data
          console.log(res)
        }
        this.$q.loading.hide()
      })
    },
    saveRecord() {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        if (this.editForm) {
          this.$api.put(`/church/${this.form._id}`, this.form).then(res => {
            if (res) {
              this.getData()

              this.form = {}
              this.modalData = false
            }
            this.$q.loading.hide()
          })
        } else {
          this.$api.post('/church', this.form).then(res => {
            if (res) {
              this.getData()
              this.form = {}
              this.modalData = false
            }
            this.$q.loading.hide()
          })
        }
      }
    },
    editRecord(record) {
      this.form = JSON.parse(JSON.stringify(record))
      this.editForm = true
      this.modalData = true
    },
    deleteRecord(id) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Seguro que deseas eliminar esta fila',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.delete(`/church/${id}`).then(res => {
          if (res) {
            this.getData()
          }
          this.$q.loading.hide()
        })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    seePerfil (data) {
      // console.log(data)
    },
    seeRestorePass (data) {
      this.form = data
      this.modalPassword = true
    },
    seeModal () {
      this.form = {}
      this.modalData = true
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
</style>
