import { useState } from "react";

function NutritionInfo({ foods }) {

    const [selectedFood, setSelectedFood] = useState({});
    const [nutritionStyle, setNutritionStyle] = useState('food-nutrition');

    const handleToggle = () => {

    }

    const handleSelect = () => {

    }

    const handleChange = ({ target }) => {

    }

    return (
        <ol>
            <li key='1234' className='food-name'>
                Food name
                <button onClick={handleToggle} className="secondary-button">See Nutrition Info</button>

                <div className={nutritionStyle}>
                    <div>Nutrition Name</div>
                    <div>Fact</div>
                    <div>Nutrition Name</div>
                    <div>Fact</div>
                    <div>Nutrition Name</div>
                    <div>Fact</div>
                    <div>Nutrition Name</div>
                    <div>Fact</div>
                    <div>Nutrition Name</div>
                    <div>Fact</div>
                    <div>Nutrition Name</div>
                    <div>Fact</div>
                </div>
                <div>
                    Input weight <input type="text" onChange={handleChange} name='1234-weight' />
                    <button onClick={handleSelect}> Add to Receipe</button>
                </div>
            </li>



            {foods !== undefined ? (foods.map((food) => {
                console.log(food);
                // console.log(food.foodMeasures, food.foodNutrients);
                return (
                    <>
                        <li key={food.fdcId}>
                            {food.description} / {food.brandName} - {food.brandOwner}
                            <button onClick={handleToggle} className="secondary-button">See Nutrition Info</button>
                            <button onClick={handleSelect} className="secondary-button">Select</button>
                        </li>
                        {food.foodNutrients.map((item) => {
                            return (
                                <>
                                    <div key={item.nutrientId} className="food-nutrition">
                                        <div>{item.nutrientName}</div>
                                        <div>{item.value}</div>
                                    </div>
                                </>)
                        })}
                    </>
                )

            })) : null
            }
        </ol>
    )
}

export default NutritionInfo