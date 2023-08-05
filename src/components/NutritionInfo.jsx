
function NutritionInfo({ foods }) {

    return (
        <ol>
           {foods !== undefined ? (foods.map((food) => {
            console.log(food);
            // console.log(food.foodMeasures, food.foodNutrients);
            return <li key={food.fdcId}>{food.description} / {food.brandName} - {food.brandOwner}</li>
           })) : null
        }     
        </ol>
    )
}

export default NutritionInfo