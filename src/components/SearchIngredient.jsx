import NutritionInfo from './NutritionInfo';
import { useState } from 'react';


function SearchIngredient() {

    const [foods, setFoods] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [dataType, setDataType] = useState('Survey%20%28FNDDS%29');
    const APIKEY = import.meta.env.VITE_API_KEY;

    const url_SR_Legacy = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=SR%20Legacy&api_key=${APIKEY}`;

    const url =`https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=${dataType}&pageSize=100&pageNumber=1&api_key=${APIKEY}`;

    const nutritionApiCall = async () => {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        setFoods(data.foods);
    }

    const handleChange = ({ target }) => {
        // console.log(target.value);
        if (target.value) {
            setIngredient(target.value);
        }
    };

    const handleCheckbox = ({ target }) => {
        //console.log(target.value);
        if (target.value === 'on') {
            setDataType('Branded');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // console.log(ingredient);
        if (ingredient) {
            nutritionApiCall(ingredient);
        } else {
            console.log('input ingredient name')
        }
    };

    return (
        <div>
            <form>
                <input type="text" name='ingredient' placeholder='ingredient' onChange={handleChange} />
                <button onClick={handleSearch} className='primary-button'>Search</button>
                <br />Search in Brand <input type="checkbox" name="brand" onClick={handleCheckbox} />
            </form>

            <NutritionInfo foods={foods} />
        </div>
    )
}

export default SearchIngredient;