import { useEffect, useState } from "react";
import IngredientsInfo from "./IngredientsInfo";

function NutritionInfo({ foods }) {

    const [selectedFood, setSelectedFood] = useState({});
    const [toggle, setToggle] = useState({});
    const [weight, setWeight] = useState({});
    const [unit, setUnit] = useState({});
    const [resultStyle, setResultStyle] = useState('result');

    const handleToggle = (foodId) => {
        setToggle({
            ...toggle,
            [foodId]: !toggle[foodId]
        });
    }

    const handleChange = (foodId, val) => {
        /* check val is number, then save */
        val = val * 1;

        !isNaN(val) && setWeight(prev => {
            return {
                ...prev,
                [foodId]: val
            }
        });
    }

    const handleSelect = (foodId, val) => {
        /* check selected unit is not empty, then save*/
        (val !== '') && setUnit(prev => {
            return {
                ...prev,
                [foodId]: val
            }
        });
    }

    const addWeightunit = () => {
        /* Add weight and unit to the selectedFood */
        setSelectedFood(prev => {
            return {
                ...prev,
                weight: weight[prev.fdcId],
                unit: unit[prev.fdcId]
            }
        });
    }

    /* Add selected food in the recipe */
    const handleAdd = (food) => {
        setSelectedFood(food);
        addWeightunit();
        setResultStyle('hidden');
    }

    useEffect(() => {
        setResultStyle('result');
    }, [foods])

    // add reset button later

    return (
        <div>
            <ol className={resultStyle}>
                {foods !== undefined ? (foods.map((food) => {
                    //console.log(food);
                    return (
                        <li key={food.fdcId}>

                            {food.description} {food.dataType === 'Branded' && (` Brand: ${food.brandName} - ${food.brandOwner}`)}

                            <button onClick={(e) => handleToggle(food.fdcId, e)} className="secondary-button">
                                {toggle[food.fdcId] ? "Hide" : "See"} Nutrition Info
                            </button>
                            <br />

                            <input type="text" onChange={(e) => handleChange(food.fdcId, e.target.value)} />

                            <select value={unit[food.fdcId]} onChange={(e) => handleSelect(food.fdcId, e.target.value)}>
                                <option value="">Select weight unit</option>
                                <option value="oz">oz</option>
                                <option value="g">g</option>
                            </select>

                            <button onClick={() => handleAdd(food)} className="secondary-button">Add to Recipe</button>
                            <br />

                            {food.foodNutrients.map((item) => {
                                return (
                                    <div key={item.nutrientId} className={toggle[food.fdcId] ? "food-nutrition" : "food-nutrition hidden"}>
                                        <div>{item.nutrientName}</div>
                                        <div>{item.value}</div>
                                    </div>
                                )
                            })}
                        </li>
                    )
                })) : <li> Cannot find the ingredient you are looking for</li>
                }
            </ol>

            <IngredientsInfo data={selectedFood} />
        </div>

    )
}

export default NutritionInfo;