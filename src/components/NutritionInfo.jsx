
function NutritionInfo({ foods }) {

    console.log(foods)
    return (
        <div>
           {foods !== undefined ? (foods.map((food) => {
            return <h3>{food.description}</h3>
           })) : null
        }     
        </div>
    )
}

export default NutritionInfo