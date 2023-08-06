import NutritionInfo from './NutritionInfo';
import { useState } from 'react';


function SearchIngredient() {

    const [foods, setFoods] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const APIKEY = import.meta.env.VITE_API_KEY;

    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=SR%20Legacy&api_key=${APIKEY}`;

    const url2 =`https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=Branded&pageSize=100&pageNumber=1&api_key=${APIKEY}`;

    const url3 =`https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=Survey%20%28FNDDS%29&pageSize=10&api_key=${APIKEY}`;

    const url4 =`https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=Foundation&pageSize=10&api_key=${APIKEY}`;

    const nutritionApiCall = async () => {
        // const res = await fetch(url2);
        // const data = await res.json();
        // // console.log(data);

        // setFoods(data.foods);
    }

    const handleChange = ({ target }) => {
        // console.log(target.value);
        if (target.value) {
            setIngredient(target.value);
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
                <input type="text" name='ingredient' placeholder='ingredient' onChange={handleChange} /> Add Brand Search option here
                <button onClick={handleSearch} className='primary-button'>Search</button>
            </form>

            <NutritionInfo foods={foods} />
        </div>
    )
}

export default SearchIngredient