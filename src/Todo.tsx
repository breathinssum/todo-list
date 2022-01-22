import { useEffect, useMemo, useRef, useState } from "react"
import TodoItem from "./TodoItem"




const Todo = () => {
    const [task, setTask] = useState<string>('')
    const [todolist, setTodolist] = useState<{
        id: number
        todo: string
        completed: boolean
    }[]>([])

    const nextId = useRef(0)
    const addTodo = (task : string) => {
        if(!task.trim()){
            return
        }
        
        const newTodolist = todolist.concat({
           id: nextId.current,
           todo: task, 
           completed: false
        })
        setTodolist(newTodolist)
        setTask('')

        nextId.current += 1
    }

    const removeTodo = (index : number) => {
         const newTodolist = todolist.filter((todo, _index) => {
             return index !== _index
            })

         setTodolist(newTodolist)
    }

    const completeTodo = (id: number) => {
        const newTodolist = todolist.map(todo => {
            if(todo.id == id) {
                return {
                    id: todo.id,
                    todo: todo.todo,
                    completed: !todo.completed
                }
            }
            return todo
        })
        setTodolist(newTodolist)
    }

    useEffect(() => {
         console.log(todolist)
    }, [todolist])
    
    return(
        <>
           <h1>앙녕귀염이</h1>
           <input type = "text" 
           value={task}
           onChange={e => setTask(e.target.value)}
           onKeyPress={e => {
            if(e.key == 'Enter') {
                addTodo(task)
            }
           }}
           placeholder="할 일 입 력 ㄱ ㄱ"
           />

           <button onClick={() => { 
               addTodo(task)
           }}> 추가

           </button>

           <ul>
               {todolist.map((todo, index) => {
                   return(
                       
                      <TodoItem key={index}
                      todo={todo}
                      completeTodo={completeTodo}
                      removeTodo={removeTodo}
                      index={index}
                       
                       />
                   )
               })}
           </ul>
        </>
    )
}

export default Todo