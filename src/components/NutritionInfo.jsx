import { useState } from "react";

function NutritionInfo({ foods }) {

    const [selectedFood, setSelectedFood] = useState({});
    const [toggle, setToggle] = useState(false);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('oz');

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleChange = ({ target }) => {
        const val = target.value*1;
        isNaN(val) && setWeight(val);
    }

    const handleSelect = ({ target }) => {
        setUnit(target.value);
    }

    const handleAdd = () => {

    }


    return (
        <ol>
            {foods !== undefined ? (foods.map((food) => {
                console.log(food);
                // console.log(food.foodMeasures, food.foodNutrients);
                return (
                    <li key={food.fdcId}>
                        {food.description} {food.dataType === 'Branded' && (` Brand: ${food.brandName} - ${food.brandOwner}`)}
                        <button onClick={handleToggle} className="secondary-button">{toggle? "Hide" : "See"} Nutrition Info</button>
                        <br />
                        <input type="text" name="weight" onChange={handleChange} /> 
                        <select name="unit" onSelect={handleSelect}>
                            <option value="oz">oz</option>
                            <option value="g">g</option>
                        </select>
                        <button onClick={handleAdd} className="secondary-button">Add to Recipe</button>
                        <br />
                        {food.foodNutrients.map((item) => {
                            return (
                                <div key={item.nutrientId} className={toggle? "food-nutrition" : "food-nutrition hidden"}>
                                    <div>{item.nutrientName}</div>
                                    <div>{item.value}</div>
                                </div>
                            )
                        })}
                    </li>
                )
            })) : null
            }
        </ol>
    )
}

export default NutritionInfo