<template>
<div class="q-pa-md q-gutter-sm">
    <q-tree
      :nodes="simple"
      node-key="name"
      :expanded.sync="expanded"
    >
     <template v-slot:default-header="prop">
        <div class="row items-center">
          <q-avatar size="28px" class="q-mr-sm">
            <img :src="prop.node.avatar">
          </q-avatar>
          <div class="text-weight-bold text-primary">{{ prop.node.name }}</div>
        </div>
      </template>

      <template v-slot:default-body="prop">
         <q-card class="my-card" flat bordered>
            <div class="row text-black">
                <div class="col-4 row justify-between">
                    <div class="q-py-sm q-pl-xs text-center text-bold" style="width:95%">DD</div>
                    <q-separator vertical />
                    <q-separator style="width: 100%" />
                </div>
                <div class="col-4 row justify-between">
                    <div class="q-py-sm q-pl-xs text-center text-bold" style="width:95%">DR</div>
                    <q-separator vertical />
                    <q-separator style="width: 100%" />
                </div>
                <div class="col-4 row justify-between">
                    <div class="q-py-sm q-pl-xs text-center text-bold" style="width:95%">Asistencia</div>
                    <q-separator style="width: 100%" />
                </div>
                <div class="col-4 row justify-between">
                    <div class="q-py-sm q-pl-xs text-center text-bold" style="width:95%">{{prop.node.dd}}</div>
                    <q-separator vertical />
                </div>
                <div class="col-4 row justify-between">
                    <div class="q-py-sm q-pl-xs text-center text-bold" style="width:95%">{{prop.node.dd}}</div>
                    <q-separator vertical />
                </div>
                <div class="col-4 row justify-between">
                    <div class="q-py-sm q-pl-xs text-center text-bold" style="width:95%">{{prop.node.dd}}%</div>
                </div>
            </div>
        </q-card>
       <!--  <span class="text-weight-light text-black">{{prop.node.name}}</span> -->
      </template>
    </q-tree>
  </div>
</template>

<script>
export default {
  name: 'disipulado',
  data () {
    return {
      expanded: ['RAMIRO PEREZ', 'DANIEL POLANCO'],
      simple: [
        {
          name: 'RAMIRO PEREZ',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          dd: 2,
          dr: 4,
          assist: 60,
          children: [
            {
              name: 'DANIEL POLANCO',
              dd: 2,
              dr: 4,
              avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
              children: [
                {
                  name: 'IAN BENESTANTE',
                  dd: 2,
                  dr: 4,
                  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
                },
                {
                  name: 'LUCAS CONSLIE',
                  dd: 2,
                  dr: 4,
                  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
                }
              ]
            },
            {
              name: 'JOSUÉ CASTILLO ',
              dd: 2,
              dr: 4,
              avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
              children: [
                {
                  name: 'JUAN MORENO',
                  dd: 2,
                  dr: 4,
                  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
                },
                {
                  name: 'BEN AFLECK',
                  dd: 2,
                  dr: 4,
                  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
                }
              ]
            }
          ]
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
    seeInfo (data) {}
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
.my-card {
  width: 100%;
  max-width: 350px;
}

</style>
