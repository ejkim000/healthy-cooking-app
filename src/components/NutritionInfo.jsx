import { useEffect, useState } from "react";

function NutritionInfo({ foods }) {

    const [selectedFood, setSelectedFood] = useState({});
    const [toggle, setToggle] = useState({});
    const [weight, setWeight] = useState({});
    const [unit, setUnit] = useState({});

    const handleToggle = (foodId) => {
        setToggle({
            ...toggle,
            [foodId]: !toggle[foodId]
        });
        console.log(toggle);
    }

    const handleChange = (foodId, val) => {
        val = val * 1;

        !isNaN(val) && setWeight({
            ...weight,
            [foodId]: val
        });

        console.log(weight);
    }

    const handleSelect = (foodId, val) => {
        setUnit({
            ...unit,
            [foodId]: val
        });

        console.log(unit);
    }

    const handleAdd = () => {

    }


    useEffect(() => {
        console.log(toggle)
    }, []);

    return (
        <ol>
            {foods !== undefined ? (foods.map((food) => {
                //console.log(food);
                
                return (
                    <li key={food.fdcId}>
                        {food.description} {food.dataType === 'Branded' && (` Brand: ${food.brandName} - ${food.brandOwner}`)}
                        <button onClick={(e) => handleToggle(food.fdcId,e)} className="secondary-button">{toggle[food.fdcId] ? "Hide" : "See"} Nutrition Info</button>
                        <br />
                        <input type="text" onChange={(e) => handleChange(food.fdcId, e.target.value)} /> 
                        <select value={unit[food.fdcId]} onChange={(e) => handleSelect(food.fdcId, e.target.value)}>
                            <option value="oz">oz</option>
                            <option value="g">g</option>
                        </select>
                        <button onClick={handleAdd} className="secondary-button">Add to Recipe</button>
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
            })) : null
            }
        </ol>
    )
}

export default NutritionInfo