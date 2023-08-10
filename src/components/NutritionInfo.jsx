import { useEffect, useState } from "react";
import IngredientsInfo from "./IngredientsInfo";

function NutritionInfo({ foods }) {

    const [selectedFood, setSelectedFood] = useState({});
    const [toggle, setToggle] = useState({});
    const [weight, setWeight] = useState({});
    const [unit, setUnit] = useState({});
    const [resultStyle, setResultStyle] = useState('hidden');

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
        if (foods.length > 0) {
            setResultStyle('result');
        }

    }, [foods])

    // add reset button later
    const loaded = () => {
        return (
            <>
                <div className={resultStyle}>
                    <h3><img src="/images/title-bg.png" alt="lemon" />Search Result</h3>
                    <ol>
                        {/* {foods.map((food) => {
                            //console.log(food);
                            return (
                                <li key={food.fdcId}>

                                    {food.description} {food.dataType === 'Branded' && (` Brand: ${food.brandName} - ${food.brandOwner}`)}


                                    <div>
                                        <button onClick={(e) => handleToggle(food.fdcId, e)} className="secondary-button">
                                            {toggle[food.fdcId] ? "Hide" : "See"} Nutrition Info
                                        </button> / &nbsp;
                                        <input type="number" pattern='[0-9]{0,5}' className='number' onChange={(e) => handleChange(food.fdcId, e.target.value)} />

                                        <select className="select" value={unit[food.fdcId]} onChange={(e) => handleSelect(food.fdcId, e.target.value)}>
                                            <option value="">Weight unit</option>
                                            <option value="oz">oz</option>
                                            <option value="g">g</option>
                                        </select>

                                        <button onClick={() => handleAdd(food)} className="secondary-button">Add to Recipe</button>
                                    </div>

                                    {/* Show only exisiting nutritions }
                                    {food.foodNutrients.filter(item => item.value > 0).map((i) => {
                                        return (
                                            <div key={i.nutrientId} className={toggle[food.fdcId] ? "food-nutrition" : "food-nutrition hidden"}>
                                                <div><b>{i.nutrientName}</b></div>
                                                <div>{i.value} {i.unitName}</div>
                                            </div>
                                        )
                                    })}
                                </li>
                            )
                        })} */}
                    </ol>
                </div>
                <IngredientsInfo data={selectedFood} />
            </>
        )
    }

    const loading = () => <IngredientsInfo data={selectedFood} />;

    return (foods !== undefined && foods.length > 0) ? loaded() : loading();
}

export default NutritionInfo;