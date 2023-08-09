import { useEffect, useState } from "react";

function IngredientsInfo({ data }) {

  if (data.length === 0) {
    data = JSON.parse(localStorage.getItem('allFoods'))
  }

  const [selectedFoods, setSelectedFoods] = useState(data);

  const handleRemove = (foodId) => {

    setSelectedFoods((prev) => prev.filter((food) => food.fdcId !== foodId));

  }

  useEffect(() => {

    console.log(selectedFoods);

  }, [selectedFoods]);


  const loaded = () => {
    return (<div>
      <h3>Selected Ingredients</h3>
      <ul>
        {selectedFoods.map((food) => (
          <li key={food.fdcId}>{food.description} {food.weight} {food.unit} <button onClick={() => handleRemove(food.fdcId)}>❌</button></li>
        ))}
      </ul>
      <div>
        <h3>Total nutrition information</h3>
        <div className='food-nutrition'>
          <div>Nutrition Name</div>
          <div>Fact</div>
        </div>
        How many serving? <input type="text" name='seving' />
        <button> Calculate </button>
        <div className='hidden'>
          <h3>Nutritions per serving</h3>
          <div className='food-nutrition'>
            <div>Nutrition Name</div>
            <div>Fact</div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  const loading = () => {
    return null;
  }

  return selectedFoods ? loaded() : loading();
}

export default IngredientsInfo;