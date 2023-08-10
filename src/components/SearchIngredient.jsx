import { useState } from 'react';
import NutritionInfo from './NutritionInfo';


function SearchIngredient() {

    const [foods, setFoods] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [dataType, setDataType] = useState('Survey%20%28FNDDS%29');
    const APIKEY = import.meta.env.VITE_API_KEY;

    const url_SR_Legacy = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=SR%20Legacy&api_key=${APIKEY}`;

    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=${dataType}&pageSize=20&pageNumber=1&api_key=${APIKEY}`;

    const nutritionApiCall = async () => {

        try {
            const res = await fetch(url);
            const data = await res.json();    
            setFoods(data.foods);
        } catch(error) {
            console.log(error);
        }

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
        <div className='container'>
            <div className='form-container'>
                <form>
                    <input type="text" name='ingredient' placeholder='Type Ingredient' onChange={handleChange} />
                    <button onClick={handleSearch} className='primary-button'>Search</button>
                    <br />
                    <label className="form-control">
                        Search in Brand
                        <input type="checkbox" name="brand" onClick={handleCheckbox} />
                    </label>
                </form>
            </div>
            {/* <NutritionInfo foods={foods} /> */}
        </div>
    )
}

export default SearchIngredient;