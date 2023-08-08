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
    }

    const handleChange = ({ target }, foodId) => {
        const val = target.value * 1;

        isNaN(val) && setWeight({
            ...weight,
            [foodId]: val
        });
    }

    const handleSelect = (foodId, { target }) => {
        setUnit({
            ...unit,
            [foodId]: target.value
        });
    }

    const handleAdd = () => {

    }


    useEffect(() => {
        console.log(toggle)
    }, []);

    return (
        <ol>
            {foods !== undefined ? (foods.map((food) => {
                console.log(food);
                
                return (
                    <li key={food.fdcId}>
                        {food.description} {food.dataType === 'Branded' && (` Brand: ${food.brandName} - ${food.brandOwner}`)}
                        <button onClick={(e) => handleToggle(food.fdcId,e)} className="secondary-button">{food.toggle? "Hide" : "See"} Nutrition Info</button>
                        <br />
                        <input type="text" pattern="[0-9]*" name="weight" onChange={(e) => handleChange(food.fdcId, e)} /> 
                        <select name="unit" onSelect={(e) => handleSelect(food.fdcId, e)}>
                            <option value="oz">oz</option>
                            <option value="g">g</option>
                        </select>
                        <button onClick={handleAdd} className="secondary-button">Add to Recipe</button>
                        <br />
                        {food.foodNutrients.map((item) => {
                            return (
                                <div key={item.nutrientId} className={food.toggle? "food-nutrition" : "food-nutrition hidden"}>
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