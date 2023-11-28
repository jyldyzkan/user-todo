import React, {useEffect, useState} from "react";
import axios from "axios";


const EditModal = ( {handleSave,setOpen,idTodo, url}) => {
    const [todo, setTodo] = useState({})


    useEffect(() => {
        axios.put(`${url}/${idTodo}`)
            .then(({data}) => {
             setTodo(data)
            })
    }, [idTodo]);

const handleEdit = (e) => {
    setTodo({...todo, completed: e.target.checked, completedAt: new Date()})
}
 return (
     <div className={'box'} >
         <input value={todo.title}
    onChange={(e) => {
    setTodo({...todo, title:e.target.value})
}}
                placeholder={'Введите запрос'}
             type="text"/>

         <div className="card">
             <input  onChange={handleEdit}
                     checked={todo.completed}
                     type="checkbox"/>


                 <button  onClick={() => {
                     handleSave(todo)
                     setOpen(false)
                 }}>
                     Save
                 </button>

                 <button onClick={() => {
                     setOpen(false)
                 }}>
                     Close
                 </button>
         </div>
     </div>
 )


}
export default EditModal ;