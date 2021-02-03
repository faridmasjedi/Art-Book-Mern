import React from 'react';
import Form from './Form';

function Add(props) {
    
    const fetchData = (id) => props.history.push(`/art/${id}`);
    
    return(

        <Form 
            nameComponent='add'
            form= ''
            name= ''
            artist= ''
            year= {1990}
            image = ''
            onClick={fetchData}
        />
        
    )
}

export default Add;