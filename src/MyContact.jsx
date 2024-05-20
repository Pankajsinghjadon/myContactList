import React, { useEffect,useState } from 'react';
import axios from 'axios';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


const MyContact=()=>{
    const [data,setData]=useState([])
        const [phone,setNPhone]=useState('')
        const [name,setName]=useState('')
            const [email,setNEmail]=useState('')
        const[editId,setEditId]=useState(-1)
             
       

  useEffect(()=>{
    axios.get('http://localhost:3000/users')
        .then(res=>setData(res.data))
        .catch(er=>  console.log(er));
  },[])
  
 
  const handlesubmit=(event)=>{
    event.preventDefault();
    const id=data[data.length-1].id+1;
    axios.post('http://localhost:3000/users',{id:id,name:name,phone:phone,email:email})
        .then(res=>{
          window.location.reload()
        })
        .catch(er=>  console.log(er));


  }
  function handleDelete(id){
    axios.delete('http://localhost:3000/users/'+id)
    .then(res=> {
      window.location.reload();
    }
     
    )
    .catch(er=>  console.log(er));
  }
  
 
    return(
     <>
       <form onSubmit={handlesubmit}>
        <div className='myClass'>
            <input type='text' onChange={e=>setNPhone(e.target.value)}  autoComplete="off" name="phone" placeholder='Enter Number'/>
            <input type='text' onChange={e=>setName(e.target.value)}  autoComplete="off" name="name" placeholder='Enter  Name'/>
            <input type='text' onChange={e=>setNEmail(e.target.value)}  autoComplete="off" name="email" placeholder='Enter email'/>
         
            <button ><PersonAddAlt1Icon/></button>
        </div>
     </form>
      <table>
        <thead>
            <tr>
                <th>Sr.no</th>
                <th>phone</th>
                <th>name</th>
                <th>email</th>
             
                
            </tr>
        </thead>
          <tbody>
            {
              data.map((user,index)=>(
              user.id===editId ? 
              <>
                
              </>:
            <tr key={index}>
                <td>{user.id}</td>
                <td>{user.phone}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                
               
                <td>
                {/* <button onClick={()=>handleEdit(user.id)}>Edit</button> */}
                <button onClick={()=>handleDelete(user.id)}>delete</button></td>

            </tr>
       

              ))
            }
             </tbody>
                
      </table>

      </>
    )
}

export default MyContact;