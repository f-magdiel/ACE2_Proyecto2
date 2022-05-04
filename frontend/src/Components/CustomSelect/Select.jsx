import React, {useEffect, useState} from "react"

const Select = ({ items, onChange }) => {

    const [options, setOptions] = useState([])

    useEffect (() => {
        setOptions(items)
    }, []);

    return (


        <div>

            <select class="form-select" id="inputGroupSelect01" onChange={onChange}>
                <option  >Elegir Grafica</option>
                {items && items.map((item, i) => 
                    <>
                    <option value={item.value}> {item.name} </option>
                    </>
                )}
            </select>
            
            
        </div>

    );
}
export default Select