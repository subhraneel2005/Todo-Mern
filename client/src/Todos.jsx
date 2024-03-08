import React,{useEffect, useState} from 'react'
import Axios from "axios";
import axios from 'axios';


function Todos() {

    const [allTodos, setAllTodos] = useState([]);
    const [text, setText] = useState("");
    const [des, setDes] = useState("");

    const getData = async() => {
        const response = await Axios.get('http://localhost:3000/todos');
        setAllTodos(response.data);
    } 

        useEffect(()=>{
            getData();
        },[])

    const addNewTodo = async() => {
       axios.post('http://localhost:3000/todos',
       {
        title: text,
        description: des
       }).then(response =>{setAllTodos([...allTodos, response.data]);
            setText('');
            setDes('');
        })
    };

    const deleteTodo = (id) => {
         axios.delete(`http://localhost:3000/${id}`)
        .then(() => {
            setAllTodos(prevTodos => {
                const afterDelete = prevTodos.filter(todo => todo._id !== id)
                return afterDelete;
            })
        }).catch(error => console.log(error));
    }

    //prevTodos.filter(todo => todo._id !== id)

    // setCart(prevCart => {
    //   const updatedCart = [...prevCart, item];
    //   console.log("Cart:", updatedCart); // Log the updated cart
    //   return updatedCart;
    // });


  return (
    <div className='h-screen w-full flex justify-center items-center bg-slate-800 select-none'>
        <div className='h-full w-full flex justify-center items-center rounded-xl text-white'>
            <div className='block'>
            <h1 className='text-4xl text-center'>Enter your Todos here:</h1>
            <div className='block md:flex gap-4'>
                <input className='bg-slate-800 p-3 text-slate-200 text-xl outline-none border-none' type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Title"/>
                <input className='bg-slate-800 p-3 text-slate-200 text-xl outline-none border-none' type="text" value={des} onChange={(e)=>setDes(e.target.value)} placeholder="Description"/>
                <button className='bg-green-600 rounded-xl p-3 cursor-pointer' onClick={addNewTodo}>Add Todo</button>
            </div>

                <div className='text-white p-3'>
                    {allTodos.map(todo =>(
                        <div key={todo._id} className='flex mt-3 px-3 py-1 justify-between bg-lime-700 rounded-xl'>
                            <div className='block'><h1 className='text-xl font-bold'>{todo.title}</h1>
                            <p className='text-lg text-gray-300'>{todo.description}</p></div>
                            <button onClick={() => deleteTodo(todo._id)} className='bg-red-500 p-3 cursor-pointer w-[50px] h-[50px] rounded-full'>X</button>
                        </div>
                    ))}
                </div>
                </div>
        </div>
    </div>
  )
}

export default Todos