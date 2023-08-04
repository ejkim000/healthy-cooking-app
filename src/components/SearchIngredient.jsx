import React from 'react'
import IngredientInfo from './IngredientInfo';

const handleClick = () => { };

function SearchIngredient() {
    return (
        <div>
            <form>
                <input type="text" name='ingredient' onClick={handleClick} />
                <button onClick={handleClick}>Search</button>
            </form>

            <IngredientInfo />
        </div>
    )
}

export default SearchIngredient