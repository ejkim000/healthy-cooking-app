import { useEffect, useState } from "react";

function IngredientsInfo({ data }) {

  const [selectedFoods, setSelectedFoods] = useState([]);

  const handleRemove = (foodId) => {
    setSelectedFoods((prev) => prev.filter((food) => food.fdcId !== foodId));
  }

  useEffect(() => {
    /* add received data to the selectedFoods and local storage */
    if (Object.keys(data).length > 0) {

      selectedFoods ? setSelectedFoods(prev => [
        ...prev,
        data
      ]) : setSelectedFoods([data]);
    }
  }, [data]);

  useEffect(() => {
    /* save local storage data to selectedFoods initially */
    const savedData = JSON.parse(localStorage.getItem('allFoods'));
    setSelectedFoods(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem('allFoods', JSON.stringify(selectedFoods));
  }, [selectedFoods]);

  const loaded = () => {
    return (<div>
      <h3>Selected Ingredients</h3><ul>
        {selectedFoods.map((food) => {
          return (
            <li key={food.fdcId}>
              {food.description} {food.weight} {food.unit}
              <button onClick={() => handleRemove(food.fdcId)}>❌</button>
            </li>
          )
        }
        )}
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

  const loading = () => null;

  return (selectedFoods && selectedFoods.length > 0) ? loaded() : loading();
}

export default IngredientsInfo;