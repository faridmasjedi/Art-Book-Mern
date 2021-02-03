import React,{useState,useEffect} from 'react';
import axios from 'axios';


function Art(props){
    const [result,setResult] = useState(() => '');
    const [res,setRes] = useState( () => false);
    const id = props.location.pathname.slice(5)

    useEffect( () => {
        axios
            .get(`http://localhost:2357/app/art/${id}`)
            .then( (promise) => {
                if (promise.data !== undefined){
                    setRes(true);
                    setResult( promise.data );
                }  
            })
    },[])

    const deleteHandler = () => {
        axios
            .delete(`http://localhost:2357/app/delete/${id}`)
            .then(() => console.log('delete'));
    }

    return(
        <div id="art">

            <header>
                <h1>Art-Books</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href={`/#/update/${id}`}>Update</a>
                    <a href={'/'} onClick={deleteHandler}>Delete</a>
                </nav>
            </header>
            
            { (res) ?
                <div id="art-container">
                    <div id="image-div">
                        {(result.image) ?
                            <img src={result.image} alt={result.name} id="art-img"/>
                            :
                            <img src={`https://via.placeholder.com/400x450`} alt={result.name}/>
                        }
                    </div>
                    <div id="info-div">
                        <p>Art Form: {result.form} </p>
                        <p>Name: {result.name}</p>
                        <p>Artist: {result.artist}</p>
                        <p>Year: {result.year}</p>
                        
                    </div>
                    
                    
                </div>
                :
                <div>There is no art exist with this id</div>
            }
                
        </div>
        
    )
}
export default Art;