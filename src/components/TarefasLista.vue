<template>
    <div>

        <div class="row">
          <div class="col-sm-10">

            <h1 class="font-weight-light">Lista de Tarefas</h1>

          </div>
          <div class="col-sm-2">
            <button
                class="btn btn-primary float-right"
                @click="exibirFormCriarTask"
            >
                <i class="fa fa-plus mr-2"></i>
                <span>Criar</span>
            </button>
          </div>
        </div>

        <ul class="list-group" v-if="tarefas.length > 0">
            <TarefasListaIten
                v-for="tarefa in taskOrdenadas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selectTaskEdit"
                @deletar="deleteTask"
                @concluir="editTask"
            />
        </ul>

        <p v-else>Nenhuma tarefa criada.</p>

        <TarefaSalvar
          v-show="exibirForms"
          :tarefa="taskSelected"
          @criar="criarTask"
          @editar="editTask"
        />

    </div>
</template>

<script>

import axios from 'axios'
import config from "@/config/config"


import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'
export default {
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        return {
            tarefas: [],
            exibirForms: false,
            taskSelected: undefined,

        }
    },
    computed:{
      taskOrdenadas(){
        return this.tarefas.slice().sort((t1, t2)=>{
          if (t1.concluido === t2.concluido){
            return t1.titulo <t2.titulo
              ? -1
                :t1.titulo > t2.titulo
                  ? 1 : 0
          }
          return t1.concluido - t2.concluido
        })
      }
    },
    methods:{
      criarTask(tarefa){
        axios.post(`${config.apiURL}/tarefas`,tarefa)
            .then((response)=>{
              this.tarefas.push(response.data)
              this.reset()
            })
      },
      editTask(tarefa){
        axios.put(`${config.apiURL}/tarefas/${tarefa.id}`, tarefa)
            .then((response)=>{
              console.log(`PUT /tarefas/${tarefa.id}`, response)
              const indice = this.tarefas.findIndex( t => t.id === tarefa.id)
              this.tarefas.splice(indice, 1, tarefa)
              this.reset()
            })
      },
      deleteTask(tarefa){
        const confirmar = window.confirm(`Deseja deletar a tarefa ${tarefa.titulo}?`)
        if(confirmar){
          axios.delete(`${config.apiURL}/tarefas/${tarefa.id}`)
              .then((response)=>{
                console.log(`DELETE /tarefas/${tarefa.id}`, response)
                const indice = this.tarefas.findIndex( t => t.id === tarefa.id)
                this.tarefas.splice(indice, 1)
              })
        }

      },
      exibirFormCriarTask(){
        if(this.taskSelected){
          this.taskSelected = undefined
          return
        }
        this.exibirForms = !this.exibirForms
      },
      reset(){
        this.taskSelected = undefined
        this.exibirForms = false
      },
      selectTaskEdit(tarefa){
        this.taskSelected = tarefa
        this.exibirForms = true
      }
    },
  created() {
      axios.get(`${config.apiURL}/tarefas`)
          .then((response)=>{
            this.tarefas = response.data
          })
  }
}
</script>
