import React, { useState } from 'react';
import axios from 'axios';

export const Check = () => {
    const [check, setCheck] = useState([]);

    const handleCheck = () => {

        console.log(" handle working fine")
        axios.get('http://localhost:3001/APIRoutes/Check')
            .then(response => {
                setCheck(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div>
            <h1> CHECK Component</h1>
            <button onClick={handleCheck}>Check</button>
            <div>
                {check.map(item => (
                    <div key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
