<template>
  <div class="q-pa-sm">
    <q-card flat bordered class="row justify-between items-center q-pa-sm">
      <div class="text-subtitle1 text-bold">Usuarios dados de alta</div>
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
      <q-btn flat no-caps dense icon="add_circle_outline" color="primary" label="Añadir otro usuario" @click="seeModal()" />
    </div>
    <q-table
      flat bordered
      :data="data"
      :columns="columns"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
      @request="getData"
      :pagination.sync="pagination"
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
      <template v-slot:body-cell-perfil="props">
        <q-td :props="props">
         <q-card
            class="text-white bg-primary q-px-sm q-py-xs"
            style="border-radius: 50px">
            <div>{{props.value}}</div>
          </q-card>
        </q-td>
      </template>
      <!-- <template v-slot:body-cell-permission="props">
        <q-td :props="props">
          <q-btn rounded no-caps dense class="q-px-sm" color="primary" label="Ver permisos" @click="seePerfil(props.row)" />
        </q-td>
      </template> -->
      <template v-slot:body-cell-password="props">
        <q-td :props="props">
          <q-btn rounded no-caps dense class="q-px-sm" color="primary" label="Restablecer" @click="seeRestorePass(props.row)" />
        </q-td>
      </template>
      <template v-slot:body-cell-rol="props">
        <q-td :props="props">
          <q-card
            class="text-white bg-green q-px-sm q-py-xs"
            style="border-radius: 50px">
            <div>{{props.value}}</div>
          </q-card>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn round dense color="primary" icon="edit" class="q-mr-xs" @click="editRecord(props.row)" />
          <q-btn round dense color="red" icon="delete" @click="deleteRecord(props.row._id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modalPassword" persistent>
      <q-card class="q-pa-md column items-center">
        <q-btn round dense color="red" icon="clear" class="absolute-top-right q-ma-xs" @click="modalPassword = false" />
        <div class="text-h6">Restablecer contraseña?</div>
        <div class="text-center text-caption q-py-md">Al restablecer la contraseña le enviarás al usuario un enlace a su correo para que pueda cambiarla y volver a ingresar a la plataforma</div>
        <div class="q-pb-lg" style="width: 300px">
          <div class="text-bold">Usuario</div>
          <q-input outlined dense v-model="form.name" placeholder="Nombre de la persona" />
          <div class="q-mt-sm text-bold">Correo electrónico</div>
          <q-input outlined dense v-model="form.email" placeholder="example@example.com" />
        </div>
        <q-btn rounded no-caps color="primary" label="Enviar ahora" />
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalData" persistent>
      <q-card class="q-pa-md">
        <q-btn round dense color="red" icon="clear" class="absolute-top-right q-ma-xs" @click="modalData = false" />
        <div class="text-center text-h6">{{editForm ? 'Editar' : 'Añadir '}} usuario</div>
        <div class="text-center text-caption q-py-md">Un usuario es un registro de una persona en la plataforma, la cual puedes solo la información o puedes asignarle un rol para que ejecute una acción dentro de la misma.</div>
        <div class="row q-pb-lg" style="width: 100%">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-px-xs">
            <div>Nombre</div>
            <q-input :error="$v.form.name.$error" error-message="Este campo es requerido" outlined dense v-model="form.name" placeholder="Nombre de la persona" />
            <div class="q-mt-sm">Correo electrónico</div>
            <q-input :error="$v.form.email.$error" error-message="Este campo es requerido" outlined dense v-model="form.email" placeholder="example@example.com" />
            <div v-if="!editForm" class="q-mt-sm">Contraseña temporal</div>
            <q-input v-if="!editForm" :error="$v.form.password.$error" error-message="Este campo es requerido" outlined dense v-model="form.password" placeholder="Introducir contraseña" />
            <div v-if="!editForm" class="q-mt-sm">Verificar contraseña</div>
            <q-input v-if="!editForm" :error="$v.form.verifyPassword.$error" error-message="Las contraseñas no coinciden" outlined dense v-model="form.verifyPassword" placeholder="Introducir contraseña" />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-px-xs">
            <div>Perfil</div>
            <q-select :error="$v.form.profile.$error" error-message="Este campo es requerido" outlined dense v-model="form.profile" :options="['DataEntry']" />
            <div class="q-mt-sm">Número de teléfono</div>
            <q-input :error="$v.form.phone.$error" error-message="Este campo es requerido" outlined dense v-model="form.phone" placeholder="Ingresa número de teléfono" />
            <div class="q-mt-sm">Dirección</div>
            <q-input :error="$v.form.address.$error" error-message="Este campo es requerido" outlined dense v-model="form.address" placeholder="Ingresa dirección" />
          </div>
        </div>
        <div class="row justify-center">
          <q-btn rounded no-caps color="primary" label="Guardar" @click="saveRecord()" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'admin-users',
  data () {
    return {
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      editForm: false,
      modalPassword: false,
      modalData: false,
      selectGroup: 1,
      filterBy: '',
      form: {
        rol: 'Responsible',
        profile: 'DataEntry'
      },
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
        { name: 'email', label: 'Email', field: 'email', align: 'left' },
        { name: 'phone', label: 'Teléfono', field: 'phone', align: 'left' },
        { name: 'perfil', label: 'Perfil', field: 'profile', align: 'left' },
        { name: 'address', label: 'Direccion', field: 'address', align: 'left' },
        { name: 'password', label: 'Contraseña', field: 'password', align: 'left' },
        { name: 'actions', label: '', field: 'actions', align: 'center' }
      ],
      data: [],
      churchs: []
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
      verifyPassword: { sameAsPassword: sameAs('password'), required },
      name: { required },
      profile: { required },
      phone: { required },
      address: { required }
    }
  },
  mounted () {
    this.getData({
      pagination: this.pagination
    })
  },
  methods: {
    getData(props) {
      this.$q.loading.show()
      const { page, rowsPerPage } = props.pagination
      this.$api.get('/auth', { params: { page: page, limit: rowsPerPage } }).then(res => {
        if (res.data.pagination) {
          this.data = res.data.info
          this.pagination.page = res.data.pagination.page === 0 ? 1 : res.data.pagination.page
          this.pagination.rowsNumber = res.data.pagination.total ? res.data.pagination.total : 0
        }
        this.$q.loading.hide()
      })
    },
    saveRecord() {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        if (this.editForm) {
          this.$api.put(`/auth/${this.form._id}`, this.form).then(res => {
            if (res) {
              this.getData({
                pagination: this.pagination
              })
              this.form = {
                rol: 'Responsible',
                profile: 'DataEntry'
              }
              this.modalData = false
              this.editForm = false
            }
            this.$q.loading.hide()
          })
        } else {
          this.$api.post('/auth/create', this.form).then(res => {
            if (res) {
              this.getData({
                pagination: this.pagination
              })
              this.form = {
                rol: 'Responsible',
                profile: 'DataEntry'
              }
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
        this.$api.delete(`/auth/${id}`).then(res => {
          if (res) {
            this.getData({
              pagination: this.pagination
            })
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
      this.form = {
        rol: 'Responsible',
        profile: 'DataEntry'
      }
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
