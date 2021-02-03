import React, {useState,useEffect} from 'react';
import axios from 'axios';
import '../style.css'

function Home() {
    let forms = ["Paint", "Architecture", "Sculpture", "Literature", "Music", "Performance","Cinema"];

    const [result,setResult] = useState( () => [] );
    const [filter,setFilter] = useState( () => {} );

    useEffect( () => {
        axios
            .get('http://localhost:2357/app/get')
            .then( (promise) => {
                setResult( promise.data );
            })
    },[]);

    const selectHandler = (e) => setFilter(prev => ({...prev, form: e.target.value}) )
    const nameFilter = (e) => setFilter(prev => ({...prev, name: e.target.value}) )
    const artistFilter = (e) => setFilter(prev => ({...prev, artist: e.target.value}) )
    const filterHandler = () => {
        axios
            .post('http://localhost:2357/app/filter', filter)
            .then(promise => {
                setResult(promise.data)
            })
    }

    return(
        <div id='home'>

            <header>
                <h1>Art-Books</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href="/#/add">Add</a>
                </nav>
            </header>

            <div id='filter'>
                <h2>Search Bar</h2>
                <label>Art Form&nbsp;</label>
                <select onChange={selectHandler}>
                    <option value="all" key="-1">all</option>
                    { forms.map ( (item,index) => (
                         <option value={item} key={index}>{item}</option>   
                    ))}
                </select>

                <label> Art Name&nbsp;</label>
                <input onChange={nameFilter} />
                
                <label> Artist Name&nbsp;</label> 
                <input onChange={artistFilter} />
                &nbsp;

                <button onClick={filterHandler}> Search</button>
            </div>
            
            <div id="container">
                {result.map((item) => (
                    <div key={item._id} id="list">
                        <a href={`/#/art/${item._id}`}>
                            {(item.image) ? 
                                <img src={item.image} alt={item.name} id="imageHome"/>
                                :
                                <img src={`https://via.placeholder.com/200x300?text=${item.name}`} alt={item.name}/>
                            }
                        </a>
                        <p><a href={`/#/art/${item._id}`}>{item.name}</a></p>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Home;