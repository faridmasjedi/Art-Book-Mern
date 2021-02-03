import React, {useState,useEffect} from 'react';
import axios from 'axios';


let forms = ["Paint", "Architecture", "Sculpture", "Literature", "Music", "Performance","Cinema"];

function Form(props) {

    const formValue = props.form;
    let id = props.id;

    const [form, setFormChosen] = useState( () => formValue )
    const [name, setName] = useState( () => '' );
    const [artist, setArtist] = useState( () => '' );
    const [year, setYear] = useState( () => '' );
    const [image, setImage] = useState( () => '' );

    useEffect(()=>{
        setFormChosen(props.form);
        setName(props.name);
        setArtist(props.artist);
        setYear(props.year);
        setImage(props.image);
    },[props]);

    const selectHandler = (e) => setFormChosen(e.target.value);  
    const nameHandler = (e) => setName(e.target.value);
    const artistHandler = (e) => setArtist(e.target.value);
    const yearHandler = (e) => setYear(e.target.value);
    const imageHandler = (e) => setImage(e.target.value);
    

    const submitHandler = (e) => {
        e.preventDefault();
        
        let sendObj = (props.nameComponent === "add") ? {form, name, artist, year, image} : {id, form, name, artist, year, image};
        
        if (props.nameComponent === 'add') {
            axios.post(`http://localhost:2357/app/${props.nameComponent}`, sendObj)
            .then((promise) => {
                id = promise.data.id;
            })
            .then(() => props.onClick(id))

            setName( '' );
            setArtist ( '' );
            setYear( 1990 );
            setImage( '' );

        }else{
            axios.put(`http://localhost:2357/app/update/${id}`, sendObj)
                .then(() => props.onClick(id))
                .catch((err) => console.log(err))
        }
    }

    return(
        <div id="Form">

            <header>
                <h1>Art-Books</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href={`/#/art/${id}`}>back</a>
                </nav>
            </header>
            
            <form onSubmit={submitHandler} id='add-update-form'>
                <label>Art Form</label>
                    <select onChange={selectHandler} value={form} required>
                        <option></option>
                        {forms.map( (item,index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                    
                
                <label>Name</label>
                <input onInput={nameHandler} value={name} required/>

                <label>Artist</label>
                <input onInput={artistHandler} value={artist}/>

                <label>Year</label>
                <input onInput={yearHandler} type='number' value={year}/>

                <label>Image</label>
                <input onInput={imageHandler} value={image}/>
                
                <br/>
                <button>
                    {props.nameComponent[0].toUpperCase()+props.nameComponent.slice(1,6)}!
                </button>
                
            </form>
        </div>
        
    )
}

export default Form;