import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaRegEdit } from "react-icons/fa";
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

function App() {
  const [showcompleted, setcompleted] = useState(false)
  const [check, setcheck] = useState("")
  const [priority, setpriority] = useState("")
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [completedtodos, setCtodos] = useState([])
  const savels = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false, priority, delhover: false }])
    setTodo("")
    setpriority("")
    console.log(todos)
    savels()
  }
  const handleDelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newtodos)
    savels()

  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => {
      return i.id === id
    })
    setTodo(t[0].todo)
    let newtodos = todos.filter(i => {
      return i.id !== id
    })
    setTodos(newtodos)
    savels()
  }
  const handlechangetext = (e) => {
    setTodo(e.target.value)

  }
  // const [delhover,changedel] =useState("False")

  const deletehover = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos];
    newtodos[index].delhover = !newtodos[index].delhover
    setTodos(newtodos)
    savels()
  }
  const handlechangeprio = (e) => {

    setpriority(e.target.value)
  }

  const togglecompleted = () => {
    setcompleted(!showcompleted)

  }
  const handlecheck = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos];
    newtodos[index].isComplete = !newtodos[index].isComplete
    setTodos(newtodos)
    savels()
  }




  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos'))) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-2 ">
        <div className="bg-slate-700 p-3 text-center font-bold text-blue-500    rounded-xl">
          <h1 className='text-2xl'>
            TODO-Tasks...
          </h1>
          <h2 className='my-2 text-xl'>Add Tasks:</h2>
          <div className="addtasks mx-auto justify-center flex gap-2 w-48 flex-col md:gap-12 md:flex-row  font-bold text-lime-5002">
            <input type="text" value={todo} onChange={handlechangetext} className='rounded-md px-3 justify-center bg-sky-700 text-white min-w-[4 0vw]' placeholder='Enter task name' />
            <select name="priority" onChange={handlechangeprio} className='rounded-md bg-sky-700 text-white' id="prio">
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button onClick={handleAdd} disabled={todo.length <= 3} className=' disabled:bg-sky-950 rounded-md px-8 py-1 bg-sky-700  hover:bg-sky-900 text-white'>Add</button>
          </div>
        </div>
        <div className="mytasks min-h-[75vh] mx-auto my-2 bg-slate-700 text-center font-bold text-blue-500 rounded-xl">
          <div className="heading">
            <h1 className='text-xl'>
              My Tasks:
            </h1>
            <div className='text-lg  md:justify-start  flex my-2  md:mx-8  md:px-12  text-blue-400 gap-[110px]' >
              <input checked={showcompleted} onChange={togglecompleted} type="checkbox" name="showfinished" id="showfinished" />
              <h3 >Show Finished</h3>
            </div>
          </div>
          <div className="tasks mx-auto my-2">
            {todos.length === 0 && <div className='text-blue-400 my-2 font-semibold'>No Todos yett.....</div>}
            {todos.map(item => {

              return ((!showcompleted || item.isComplete) && <div key={item.id} className="one px-1 text-xs md:text-base md:px-20 my-2 w-[100%] flex justify-between gap-1 md:gap-3">
                <input type="checkbox" onChange={handlecheck} name={item.id} id="check" checked={(item.isComplete)} />
                <div className="ttexts  flex md:px-12 md:justify-around justify-between mx-8 w-full  gap-8">
                  <div className={item.isComplete ? "texts rounded-md p-2 h-fit text-red-600 line-through md:min-w-[40%] bg-slate-800" : "texts md:min-w-[40%] rounded-md p-2 bg-slate-800 "}>{item.todo}</div>
                  <div className="priority  rounded-md p-2 min-w-min md:min-w-[20%] bg-slate-800">{item.priority}</div>
                </div>
                <div className="buttons flex gap-3">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className="edit rounded-md px-2 md:px-8 py-1 md:w-fit bg-sky-700 hover:bg-sky-900 text-white"><FaRegEdit /></button>
                  <button onMouseEnter={(e) => deletehover(e, item.id)} onMouseLeave={(e) => deletehover(e, item.id)} onClick={(e) => { handleDelete(e, item.id) }} className="delete md:w-fit rounded-md px-2 md:px-8 py-1 bg-sky-700  hover:bg-sky-900 text-white">{(item.delhover) ? <MdDelete /> : <MdOutlineDelete />}
                  </button>
                </div>
              </div>)
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
