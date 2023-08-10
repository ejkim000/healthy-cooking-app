import { useEffect, useState } from "react";

function IngredientsInfo({ data }) {

  const savedData = JSON.parse(localStorage.getItem('allFoods'));
  const [selectedFoods, setSelectedFoods] = useState(savedData);
  const [nutritions, setNutritions] = useState([]);
  const [nutritionList, setNutritionList] = useState({});

  const handleRemove = (foodId) => {
    setSelectedFoods((prev) => prev.filter((food) => food.fdcId !== foodId));
  }

  /* add all nutritions */
  const getTotalNutritions = () => {
    selectedFoods.map((food, i) => {

      food.foodNutrients.map((item) => {
        /* init setup for the first food */
        if (i === 0) {
          setNutritionList((prev) => {
            return {
              ...prev,
               [item.nutrientName]: (item.value / food.finalFoodInputFoods[0].gramWeight) * food.weight
            }
          })
        } else {
          setNutritionList((prev) => {
            return {
              ...prev,
               [item.nutrientName]: prev[item.nutrientName] + (item.value / food.finalFoodInputFoods[0].gramWeight) * food.weight
            }
          })
        }
      });
    })
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
    localStorage.setItem('allFoods', JSON.stringify(selectedFoods));

    getTotalNutritions();
  }, [selectedFoods]);

  useEffect(() => {
    
    console.log(nutritionList);
    
  }, [nutritionList]);


  const loaded = () => {
    return (<div>
      <h3>Selected Ingredients</h3><ul>
        {selectedFoods.map((food) => {
          return (
            <li key={food.fdcId}>
              <b>{food.description}</b> {food.weight} {food.unit}
              <button onClick={() => handleRemove(food.fdcId)}>❌</button>
            </li>
          )
        }
        )}
      </ul>
      <div>
        <h3>Total nutrition information</h3>

        {/* Show only exisiting nutritions */}
        {/* { nutritionList.filter(item => item.value > 0).map((i) => {
          return (
            <div key={i.nutrientName} className='food-nutrition'>
              <div>{i.nutrientName}</div>
              <div>{i.value}</div>
            </div>
          )
        })} */}
        <div className='food-nutrition'>
          <div>Nutrition Name</div>
          <div>Fact</div>
        </div>
        How many serving? <input type="text" name='seving' />
        <button> Calculate Nutritoin per Serving </button>
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

  return (selectedFoods && selectedFoods.length > 0 && nutritionList) ? loaded() : loading();
}

export default IngredientsInfo;