
function NutritionInfo({ foods }) {

    return (
        <ul>
           {foods !== undefined ? (foods.map((food) => {
            // console.log(foods);
            console.log(food.foodMeasures, food.foodNutrients);
            return <li key={food.fdcId}>{food.description}</li>
           })) : null
        }     
        </ul>
    )
}

export default NutritionInfo