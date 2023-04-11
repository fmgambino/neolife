<template>
  <div class="q-pa-sm">
    <!-- <div v-for="(item, index) in tables" :key="index">
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
      <div class="row items-center q-gutter-x-sm">
        <q-select
          outlined rounded dense
          v-model="filterBy"
          :options="options"
          style="width: 200px; background: white; border-radius: 20px">
          <template v-slot:prepend>
            <div class="text-caption">Filtrar por:</div>
          </template>
          <template v-slot:append>
            <q-separator vertical />
          </template>
        </q-select>
        <q-btn rounded dense no-caps color="green" class="q-px-sm" icon-right="navigate_next" label="Exportar" />
      </div>
    </q-card>

    <div v-if="item.expand" class="q-mt-md">
      <div class="q-mt-md bordes">
        <q-btn @click="modalData = true" flat no-caps dense icon="add_circle_outline" color="primary" label="Añadir otra persona" />
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
        <template v-slot:body-cell-name="props">
            <q-td>
            <div>{{`${props.row.name} ${props.row.last_name}`}}</div>
            </q-td>
        </template>
         <template v-slot:body-cell-createdAt="props">
            <q-td>
            <div>{{$date(props.value).format('DD/MM/YYYY')}}</div>
            </q-td>
        </template>
        <template v-slot:body-cell-comment="props">
            <q-td :props="props">
              <q-icon style="cursor:pointer;" @click="openComments(props.row)" name="add_comment" size="md" color="primary" />
            </q-td>
        </template>
        <template v-slot:body-cell-responsible="props">
            <q-td :props="props">
            <div class="row items-center justify-center no-wrap q-gutter-x-sm">
                <q-avatar color="primary" text-color="white" size="md">{{(props.value.name[0]).toUpperCase()}}</q-avatar>
            </div>
            </q-td>
        </template>
        <template v-slot:body-cell-destination="props">
            <q-td style="cursor:pointer;"  @click="changedestination(props.row)" :props="props" class="text-white" :class="getColorDestination(props.value)">
            <div>{{ getLabelDestination(props.value)}}</div>
            </q-td>
        </template>
         <template v-slot:body-cell-week="props">
           <q-td :props="props">
            <div class="row items-center justify-start">
               <div class="col-3 q-mb-xs" v-for="(item, index) in props.row.comments" :key="index">
                  <q-avatar size="sm" :color="getColor(item)" />
               </div>
            </div>
            </q-td>

        </template>
        <template v-slot:body-cell-actions="props">
            <q-td :props="props">
            <q-btn round dense color="primary" icon="info_outline" class="q-mr-xs" @click="seeInfo(props.row)" />
            <q-btn round dense color="primary" icon="edit" class="q-mr-xs" @click="editRecord(props.row)" />
            <q-btn round dense color="red" icon="delete" @click="deleteRecord(props.row._id)" />
            </q-td>
        </template>
      </q-table>
    </div>
    </div> -->
    <q-card flat class="row justify-between items-center q-pa-sm bordes_left q-mt-md">
      <div class="row items-center q-gutter-x-sm">
        <q-select
          outlined rounded dense
          v-model="filterBy"
          :options="options"
          emit-value
          map-options
          option-value="value"
          option-label="label"
          @input="getData({
            pagination: pagination
          })"
          style="width: 200px; background: white; border-radius: 20px">
          <template v-slot:prepend>
            <div class="text-caption">Filtrar por mes</div>
          </template>
          <template v-slot:append>
            <q-separator vertical />
          </template>
        </q-select>
      </div>
    </q-card>

    <div class="q-mt-md">
      <div class="q-mt-md bordes">
        <q-btn @click="modalData = true" flat no-caps dense icon="add_circle_outline" color="primary" label="Añadir otra persona" />
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
        <template v-slot:body-cell-name="props">
            <q-td>
            <div>{{`${props.row.name} ${props.row.last_name}`}}</div>
            </q-td>
        </template>
         <template v-slot:body-cell-createdAt="props">
            <q-td>
            <div>{{$date(props.value).format('DD/MM/YYYY')}}</div>
            </q-td>
        </template>
        <template v-slot:body-cell-comment="props">
            <q-td :props="props">
              <q-icon style="cursor:pointer;" @click="openComments(props.row)" name="add_comment" size="md" color="primary" />
            </q-td>
        </template>
        <template v-slot:body-cell-responsible="props">
            <q-td :props="props">
            <div class="row items-center justify-center no-wrap q-gutter-x-sm">
                <q-avatar color="primary" text-color="white" size="md">{{(props.value.name[0]).toUpperCase()}}</q-avatar>
            </div>
            </q-td>
        </template>
        <template v-slot:body-cell-destination="props">
            <q-td style="cursor:pointer;"  @click="changedestination(props.row)" :props="props" class="text-white" :class="getColorDestination(props.value)">
            <div>{{ getLabelDestination(props.value)}}</div>
            </q-td>
        </template>
         <template v-slot:body-cell-week="props">
           <q-td :props="props">
            <div class="row items-center justify-start">
               <div class="col-3 q-mb-xs" v-for="(item, index) in props.row.comments" :key="index">
                  <q-avatar size="sm" :color="getColor(item)" />
               </div>
            </div>
            </q-td>

        </template>
        <template v-slot:body-cell-actions="props">
            <q-td :props="props">
            <q-btn round dense color="primary" icon="info_outline" class="q-mr-xs" @click="seeInfo(props.row)" />
            <q-btn round dense color="primary" icon="edit" class="q-mr-xs" @click="editRecord(props.row)" />
            <q-btn round dense color="red" icon="delete" @click="deleteRecord(props.row._id)" />
            </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="showComments" persistent>
      <q-card style="width: 100%">
        <div class="row justify-between items-center q-pa-md bg-primary text-white">
          <div class="text-h6">Comentarios</div>
          <q-btn @click="showComments = false" round flat dense icon="clear" />
        </div>
        <div class="q-pa-md">
          <div class="row items-center justify-end q-gutter-x-sm q-pb-md">
            <div class="text-subtitle2">Añadir comentario</div>
            <q-btn @click="showNewComment = true" round dense color="green" icon="add" />
          </div>
          <div v-for="(item, index) in selectedRecord.comments" :key="index" class="q-pb-sm" >
            <q-card class="q-pa-md" style="width: 100%; border-radius: 10px">
              <div class="row justify-between items-start">
                <div class="row items-center">
                  <q-avatar size="lg" color="primary" class="text-white">NA</q-avatar>
                  <div class="q-pl-xs">
                    <div class="text-subtitle2">{{`${selectedRecord.name} ${selectedRecord.last_name}`}}</div>
                   <!--  <div class="text-caption">Consolidador > Nombre del consolidador</div> -->
                  </div>
                </div>
               <!--  <q-btn round outline dense icon="more_horiz" color="grey-8" /> -->
              </div>
              <div class="q-pa-md q-my-sm" style="background: #F2F2F2;">
                {{item.body}}
              </div>
              <div class="row items-center justify-between q-gutter-x-sm">
               <!--  <q-btn outline no-caps label="Me gusta" color="grey-9" icon-right="thumb_up_off_alt" style="width: 30%" />
                <q-btn outline no-caps label="Responder" color="grey-9" icon-right="shortcut" style="width: 30%" /> -->
                <q-btn no-caps :label="getLabel(item)" :color="getColor(item)" style="width: 30%" />
              </div>
              <!-- <div class="text-caption">visto por @usuario</div> -->
            </q-card>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showNewComment" persistent>
      <q-card style="width: 100%">
        <div class="row justify-between items-center q-pa-md bg-primary text-white">
          <div class="text-h6">Nuevo Comentario</div>
          <q-btn @click="showNewComment = false" round flat dense icon="clear" />
        </div>
        <div class="q-pa-md">
          <q-select label="Estado" outlined map-options dense
          :bg-color="comment.status.color ? comment.status.color : ''" v-model="comment.status"
          :options="optionsComments" style="width: 300px">
            <template v-slot:option="scope">
              <q-item
                :color="scope.opt.color"
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                  </q-item-section>
              </q-item>
            </template>
          </q-select>
          <div class="text-subtitle2 q-my-md">Escribe el comentario</div>
          <q-input
            v-model="comment.body"
            :error="$v.comment.body.$error"
            error-message="Este campo es requerido"
            outlined
            type="textarea"
          />
          <div class="q-pt-lg q-pb-sm row justify-center">
            <q-btn no-caps @click="saveComment()" label="Guardar" color="primary" style="width: 30%" />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showDestination" persistent>
      <q-card class="q-pa-md column items-center">
        <q-btn round dense color="red" icon="clear" class="absolute-top-right q-ma-xs" @click="showDestination = false" />
        <div class="text-h6">Cambio de Destino</div>
        <div class="text-center text-caption q-py-md">Seleccione la opcion para cambiar</div>
        <div class="q-pb-lg" style="width: 300px">
          <div class="text-bold">Destino</div>
           <q-select outlined map-options dense
          :bg-color="destinationData.form.color ? destinationData.form.color : ''" v-model="destinationData.form"
          :options="optionsDestination" style="width: 300px">
            <template v-slot:option="scope">
              <q-item
                :color="scope.opt.color"
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                  </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <q-btn rounded no-caps color="primary" label="Guardar ahora" @click="saveDestination()" />
      </q-card>
    </q-dialog>
      <q-dialog @hide="hideModalData()" v-model="modalData" persistent>
      <q-card style="width: 100%" class="q-pa-md">
        <q-btn round dense color="red" icon="clear" class="absolute-top-right q-mt-xs" @click="modalData = false" />
        <div v-if="!seeData" class="text-center text-h6">{{editForm ? 'Editar' : 'Añadir '}} persona</div>
        <!-- <div class="text-center text-caption q-py-md">Un usuario es un registro de una persona en la plataforma, la cual puedes solo la información o puedes asignarle un rol para que ejecute una acción dentro de la misma.</div> -->
        <div class="row q-pb-lg" style="width: 100%">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-px-xs">
            <div>Nombres</div>
            <q-input :disable="seeData" :error="$v.form.name.$error" error-message="Este campo es requerido" outlined dense v-model="form.name" placeholder="Nombres de la persona" />
            <div class="q-mt-sm">Apellidos</div>
            <q-input :disable="seeData" :error="$v.form.last_name.$error" error-message="Este campo es requerido" outlined dense v-model="form.last_name" placeholder="Apellidos de la persona" />
            <div class="q-mt-sm">Edad</div>
            <q-input :disable="seeData" outlined dense v-model="form.age" type="number" placeholder="18" />
            <div class="q-mt-md">Estado civil</div>
            <q-select :disable="seeData" outlined dense v-model="form.family_status" :options="['CASADO', 'SOLTERO', 'CONCUBINATO', 'DIVORCIADO', 'VIUDO']" />
            <div class="q-mt-lg">Domicilio</div>
            <q-input :disable="seeData" :error="$v.form.address.$error" error-message="Este campo es requerido" outlined dense v-model="form.address" placeholder="Domicilio" />
            <div v-if="admin && !seeData" class="q-mt-sm" >Responsable</div>
            <q-select v-if="admin && !seeData" :disable="seeData" :error="$v.form.responsible.$error" error-message="Este campo es requerido" outlined emit-value map-options dense v-model="form.responsible" option-value="_id" option-label="name" :options="users" />
            <div class="q-mt-md">Consolidador</div>
            <q-input :disable="seeData" outlined dense v-model="form.consolidator" placeholder="Nombre del consolidador" />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-px-xs">
            <div>Localidad</div>
            <q-input :disable="seeData" :error="$v.form.location.$error" error-message="Este campo es requerido" outlined dense v-model="form.location" placeholder="Localidad" />
            <div class="q-mt-sm">Número de teléfono</div>
            <q-input :disable="seeData" :error="$v.form.phone.$error" error-message="Este campo es requerido" outlined dense v-model="form.phone" placeholder="Ingresa número de teléfono" />
            <div class="q-mt-sm">Ocupación</div>
            <q-input :disable="seeData" :error="$v.form.occupation.$error" error-message="Este campo es requerido" outlined dense v-model="form.occupation" placeholder="Ingresa la ocupación" />
            <div class="q-mt-sm" >¿Asiste a otra iglesia?</div>
            <q-radio :disable="seeData" v-model="form.another_church" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Si" />
            <q-radio :disable="seeData" v-model="form.another_church" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="No" />
            <div class="q-mt-md">¿Quien lo invitó?</div>
            <q-input :disable="seeData" :error="$v.form.invited_by.$error" error-message="Este campo es requerido" outlined dense v-model="form.invited_by" placeholder="Nombre de quien invito" />
            <div class="q-mt-sm" >¿Usted desea ser visitado?</div>
            <q-radio :disable="seeData" v-model="form.to_be_visited" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Si" />
            <q-radio :disable="seeData" v-model="form.to_be_visited" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="No" />
          </div>
        </div>
        <div v-if="!seeData" class="row justify-center">
          <q-btn rounded no-caps color="primary" label="Guardar" @click="saveRecord()" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
export default {
  name: 'disipulado',
  data (app) {
    return {
      seeData: false,
      selectedRecord: {},
      comment: {
        status: { color: 'orange', label: 'No informó', value: 'NO_INFORMO' }
      },
      showNewComment: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      users: [],
      editForm: false,
      modalData: false,
      form: {
        another_church: false
      },
      destinationData: {
        form: { color: 'grey', label: 'En Proceso', value: 'EN_PROCESO' }
      },
      showDestination: false,
      optionsComments: [
        { color: 'green', label: 'Visitado', value: 'VISITADO' },
        { color: 'yellow', label: 'Contacto telefónico', value: 'CONTACTO_TELEFONICO' },
        { color: 'orange', label: 'No informó', value: 'NO_INFORMO' },
        { color: 'red', label: 'No consolidó', value: 'NO_CONSOLIDO' },
        { color: 'blue', label: 'No recibió', value: 'NO_RECIBIO' }],
      optionsDestination: [
        { color: 'green', label: 'Consolidado', value: 'CONSOLIDADO' },
        { color: 'grey', label: 'En Proceso', value: 'EN_PROCESO' },
        { color: 'red', label: 'En oración / Baja', value: 'EN_ORACIÓN' },
        { color: 'blue', label: 'Otra Iglesia', value: 'OTRA_IGLESIA' },
        { color: 'orange', label: 'Visita', value: 'VISITA' }],
      showComments: false,
      filterBy: app.$date().month(),
      color: 'red',
      colorComment: 'blue',
      colorAvatar: 'blue',
      selected: [],
      options: [
        { label: 'Enero', value: 0 },
        { label: 'Febrero', value: 1 },
        { label: 'Marzo', value: 2 },
        { label: 'Abril', value: 3 },
        { label: 'Mayo', value: 4 },
        { label: 'Junio', value: 5 },
        { label: 'Julio', value: 6 },
        { label: 'Agosto', value: 7 },
        { label: 'Septiembre', value: 8 },
        { label: 'Octubre', value: 9 },
        { label: 'Noviembre', value: 10 },
        { label: 'Diciembre', value: 11 }],
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
          name: 'name',
          required: true,
          label: 'Nombre completo',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'comment', label: 'Comentario', field: 'comment', align: 'center' },
        { name: 'responsible', label: 'Responsable', field: 'responsible', align: 'center' },
        { name: 'destination', label: 'Destino', field: 'destination', align: 'center' },
        { name: 'createdAt', label: 'Fecha de registro', field: 'createdAt', align: 'center' },
        { name: 'invited_by', label: 'Invitado X', field: 'invited_by' },
        { name: 'consolidator', label: 'Consolidador', field: 'consolidator', align: 'center' },
        { name: 'week', label: 'Semanas de seguimiento', field: 'week', align: 'center' },
        { name: 'actions', label: '', field: 'actions', align: 'center' }
      ],
      data: [],
      admin: false
    }
  },
  validations: {
    form: {
      name: { required },
      last_name: { required },
      address: { required },
      phone: { required },
      location: { required },
      occupation: { required },
      invited_by: { required },
      responsible: {
        required: requiredIf(function (nestedModel) {
          return this.admin
        })
      }
    },
    comment: {
      body: { required }
    }
  },
  mounted () {
    const session = JSON.parse(localStorage.getItem('_SESSION_INFO_'))
    if (session.data.rol === 'Administrator') {
      this.admin = true
      this.getUsers()
    }
    this.getData({
      pagination: this.pagination
    })
  },
  methods: {
    getData (props) {
      this.$q.loading.show()
      const { page, rowsPerPage } = props.pagination
      this.$api.get('/consolidation', { params: { page: page, limit: rowsPerPage, date: `2023-${this.filterBy + 1}` } }).then(res => {
        if (res.data.pagination) {
          this.data = res.data.info
          this.pagination.page = res.data.pagination.page === 0 ? 1 : res.data.pagination.page
          this.pagination.rowsNumber = res.data.pagination.total
        }
        this.$q.loading.hide()
      })
    },
    saveRecord() {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        if (this.editForm) {
          this.$api.put(`/consolidation/${this.form._id}`, this.form).then(res => {
            if (res) {
              this.getData({
                pagination: this.pagination
              })
              this.form = {
                another_church: false
              }
              this.modalData = false
              this.editForm = false
            }
            this.$q.loading.hide()
          })
        } else {
          this.$api.post('/consolidation', this.form).then(res => {
            if (res) {
              this.getData({
                pagination: this.pagination
              })
              this.form = {
                another_church: false
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
        this.$api.delete(`/consolidation/${id}`).then(res => {
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
    getUsers() {
      this.$api.get('/auth/responsibles').then(res => {
        if (res) {
          this.users = res.data
        }
        this.$q.loading.hide()
      })
    },
    saveComment () {
      this.$v.comment.$touch()
      if (!this.$v.comment.$error) {
        this.$q.loading.show()
        this.$api.put(`/consolidation/${this.comment.id}/comment`, { body: this.comment.body, status: this.comment.status.value }).then(res => {
          if (res) {
            this.getData({
              pagination: this.pagination
            })
            this.comment = {
              status: { color: 'orange', label: 'No informó', value: 'NO_INFORMO' }
            }
            this.showComments = false
            this.$v.comment.$reset()
            this.showNewComment = false
          }
          this.$q.loading.hide()
        })
      }
    },
    saveDestination () {
      this.$q.loading.show()
      this.$api.put(`/consolidation/${this.destinationData.data._id}`, { destination: this.destinationData.form.value }).then(res => {
        if (res) {
          this.getData({
            pagination: this.pagination
          })
          this.destinationData = {
            form: { color: 'grey', label: 'En Proceso', value: 'EN_PROCESO' }
          }
          this.showDestination = false
        }
        this.$q.loading.hide()
      })
    },
    changedestination (row) {
      const value = this.optionsDestination.find(v => v.value === row.destination)
      this.destinationData = { data: row, form: value }
      this.showDestination = true
    },
    openComments (item) {
      this.selectedRecord = item
      this.comment.id = item._id
      this.showComments = true
    },
    getColor (item) {
      const value = this.optionsComments.find(v => v.value === item.status)
      return value ? value.color : 'grey'
    },
    getLabel (item) {
      const value = this.optionsComments.find(v => v.value === item.status)
      return value ? value.label : '--'
    },
    getColorDestination (id) {
      const value = this.optionsDestination.find(v => v.value === id)
      return value ? `bg-${value.color}` : 'bg-grey'
    },
    getLabelDestination (id) {
      const value = this.optionsDestination.find(v => v.value === id)
      return value ? value.label : '--'
    },
    exapandTable (data) {
      for (const i in this.tables) {
        if (this.tables[i].id === data.id) {
          this.tables[i].expand = !this.tables[i].expand
        } else {
          this.tables[i].expand = false
        }
      }
    },
    seeInfo (row) {
      this.form = row
      this.seeData = true
      this.modalData = true
    },
    hideModalData () {
      this.form = {
        another_church: false
      }
      this.seeData = false
      this.$v.form.$reset()
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
