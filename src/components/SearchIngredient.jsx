import NutritionInfo from './NutritionInfo';
import { useState } from 'react';


function SearchIngredient() {

    const [foods, setFoods] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const APIKEY = import.meta.env.VITE_API_KEY;

    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=SR%20Legacy&api_key=${APIKEY}`;

    const url2 =`https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=Branded&pageSize=25&pageNumber=2&api_key=Q4WtkvTm76lg58wT9dtIYG8Iju7anawRNIHyJOTf`;

    const url3 =`https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=Survey%20%28FNDDS%29&pageSize=10&api_key=Q4WtkvTm76lg58wT9dtIYG8Iju7anawRNIHyJOTf`;


    const nutritionApiCall = async () => {
        const res = await fetch(url3);
        const data = await res.json();
        // console.log(data);

        setFoods(data.foods);
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
                <input type="text" name='ingredient' placeholder='ingredient' onChange={handleChange} />
                <button onClick={handleSearch}>Search</button>
            </form>

            <NutritionInfo foods={foods} />
        </div>
    )
}

export default SearchIngredient