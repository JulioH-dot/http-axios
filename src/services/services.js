
import instance from '@/axios'

 const createdGet = ()=>{
     instance.get(`/tarefas`)
        .then((response)=>{
            this.tarefas = response.data
        })
}

const deleteTaskService= (tarefa)=>{
    const confirmar = window.confirm(`Deseja deletar a tarefa ${tarefa.titulo}?`)
    if(confirmar){
        instance.delete(`/tarefas/${tarefa.id}`)
            .then((response)=>{
                console.log(`DELETE /tarefas/${tarefa.id}`, response)
                const indice = this.tarefas.findIndex( t => t.id === tarefa.id)
                this.tarefas.splice(indice, 1)
            })
    }
}

const editTaskService = (tarefa) =>{
    instance.put(`/tarefas/${tarefa.id}`, tarefa)
        .then((response)=>{
            console.log(`PUT /tarefas/${tarefa.id}`, response)
            const indice = this.tarefas.findIndex( t => t.id === tarefa.id)
            this.tarefas.splice(indice, 1, tarefa)
            this.reset()
        })
}


export {createdGet, deleteTaskService, editTaskService}