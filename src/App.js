import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";
import EditModal from "./Components/EditModal/EditModal";
import * as PropTypes from "prop-types";
import Header from "./Components/EditModal/Header";
const url = 'https://6564248aceac41c0761d7f0e.mockapi.io/todo'

const App = () => {
  const[todos,setTodos] =useState([])
  const [todoTitle, setTodoTitle] =useState('')
   const [editModalOpen, setEditModalOpen] = useState(false)
    const [idTodo, setIdTodo] = useState('')

  const handleEdit = (idTodo) => {
      setEditModalOpen(true)
      setIdTodo(idTodo)
  }

  useEffect(() =>{
    axios(url)
        .then(({data}) =>setTodos(data))
  },[])


  const handleAddTodo =() =>{
    const newTodo = {
      title: todoTitle,
      completed :false,
      completedAt:null,
      createdAt :+new Date()
    }
    setTodoTitle('')
    axios.post(url, newTodo)
        .then(({data}) => setTodos([...todos, data]))
  }
  const handleDelete = (id) => {
    axios.delete(`${url}/${id}`).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  const   handleSave = (todo)    => {
         axios.put(`${url}/${idTodo}` , todo)
             .then(({data}) => {
             setTodos(todos.map(el => el.id === data.id ? data : el))
             })

  }


  return (
      <div className={'container'}>
           <Header/>
          <div className="box">
           <input
               onChange={(e)=>setTodoTitle(e.target.value)}
               value={todoTitle}
               placeholder={'Введите запрос'}
               type="text"/>

           <button onClick={handleAddTodo}>Add todo</button>
       </div>
          {
              editModalOpen &&
              <EditModal handleSave={handleSave} setOpen={setEditModalOpen} idTodo={idTodo} url={url} />
          }

        <div>

          {
            todos.map(todo =>
                <div className={'wrapper'} key={todo.id}>
                    <p>{todo.title}</p>
                 <div className={'card'}>
                     <input type="checkbox" checked={todo.completed}/>
                     <span>
                {dayjs(todo.createdAt).format('HH:mm DD.MM.YYYY')}
                 </span>
                     <button onClick={() => handleEdit (todo.id)} >Edit</button>
                     <button onClick={()=> handleDelete(todo.id)}>Delete</button></div>
                </div>
            )
          }

        </div>
      </div>
  );
};


export default App