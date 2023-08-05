import NutritionInfo from './NutritionInfo';
import { useState } from 'react';


function SearchIngredient() {

    const [nutrition, setNutrition] = useState({});
    const [ingredient, setIngredient] = useState('');
    const APIKEY = import.meta.env.VITE_API_KEY;

    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&api_key=${APIKEY}`;
    

    const nutritionApiCall = async () => {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setNutrition(data);

    }

    const handleClick = ({ target }) => {
        if (target.value) {
            setIngredient(target.value);
        }
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        nutritionApiCall(ingredient);
    };

    return (
        <div>
            <form>
                <input type="text" name='ingredient' onClick={handleClick} />
                <button onClick={handleSearch}>Search</button>
            </form>

            <NutritionInfo data={nutrition} />
        </div>
    )
}

export default SearchIngredient