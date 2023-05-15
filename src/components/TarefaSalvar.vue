<template>
    <div class="mt-4">
        <hr>
        <h2 class="font-weight-light">Salvar Tarefa</h2>
        <form @submit.prevent="salvarTask">
            <div class="row">
                <div :class="classeColuna">
                    <div class="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Título da tarefa"
                            v-model="tarefaLocal.titulo"
                        >
                    </div>
                </div>
                <div class="col-sm-2" v-if="tarefa">
                    <div class="form-group">
                        <label>Tarefa concluída?</label>
                        <button
                            type="button"
                            class="btn btn-sm d-block"
                            :class="classeButton"
                            @click="tarefaLocal.concluido =!tarefaLocal.concluido"
                        >
                            <i class="fa fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        tarefa: {
            type: Object,
            default: undefined
        }
    },
    data() {
        return {
            tarefaLocal: Object.assign(
                {}, 
                { titulo: '', concluido: false }, 
                this.tarefa)
        }
    },
   methods:{
        salvarTask(){
          const operation =!this.tarefa ? 'criar' : 'editar'
          this.$emit(operation, this.tarefaLocal)
          this.tarefaLocal = {titulo: '', concluido: false }
        }
   },
    watch:{
      tarefa(){
        this.tarefaLocal = Object.assign({}, this.tarefa)
      }
    },
    computed: {
        classeColuna() {
            return this.tarefa 
                ? 'col-sm-10'
                : 'col-sm-12'
        },
      classeButton(){
          return this.tarefa && this.tarefaLocal.concluido
              ? 'btn-success'
              : 'btn-secondary'
      }
    }
}
</script>

