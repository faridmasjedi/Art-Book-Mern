import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Form from './Form';

function Update(props) {
    const id = props.location.pathname.slice(8);
    const [result,setResult] = useState(() => []);

    useEffect( () => {
        axios.get(`http://localhost:2357/app/art/${id}`)
        .then((promise) => setResult(promise.data))
    },[])
    
    const fetchData = (id) => props.history.push(`/art/${id}`);

    return(
            <Form 
                nameComponent="update"
                form = {result.form}
                name = {result.name}
                year = {result.year}
                artist = {result.artist}
                image = {result.image}
                id = {id}
                onClick = {fetchData}
            />
        
    )
}

export default Update;