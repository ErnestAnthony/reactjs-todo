import {useState, useEffect} from 'react'
import Todoinput from "./components/Todoinput"
import TodoList from "./components/TodoList"

function App() {
    const [todos,setTodos] = useState([

    ])
    const [todoValue, setTodoValue] = useState('')
    function persistData(newList) {
        localStorage.setItem('todos', JSON.stringify({todos:newList}))
    }
    function handleAddTodos(newTodo){
        const newTodoList = [...todos, newTodo]
        persistData(newTodoList)
        setTodos(newTodoList)
    }
    function handleDeteleTodo(index){
        const newTodoList = todos.filter((todo, todoindex) => {
            return todoindex !== index
        })
        persistData(newTodoList)
        setTodos(newTodoList)
    }
    function handleEditTodo(index){
        const valueToBeEdited = todos[index]
        setTodoValue(valueToBeEdited)
        handleDeteleTodo(index)
    }
    useEffect(() => {
        if(!localStorage){
            return
        }
        let localTodos = localStorage.getItem('todos')
        if (!localTodos){
            return
        }
        localTodos = JSON.parse(localTodos).todos
        setTodos(localTodos)
    },[])
  return (
   <>
    <Todoinput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
    <TodoList handleEditTodo={handleEditTodo} handleDeteleTodo={handleDeteleTodo} todos={todos}/>
   </>
  )

}

export default App
