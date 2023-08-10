import { useEffect, useState } from "react";

function IngredientsInfo({ data }) {

  const savedData = JSON.parse(localStorage.getItem('allFoods'));
  const [selectedFoods, setSelectedFoods] = useState(savedData);
  const [nutritionList, setNutritionList] = useState({});
  const [nutritionPerServing, setNutritionPerServing] = useState({});
  const [perServing, setPerServing] = useState(1);

  const handleRemove = (foodId) => {
    setSelectedFoods((prev) => prev.filter((food) => food.fdcId !== foodId));
  }

  /* get all nutritions */
  const getTotalNutritions = () => {
    selectedFoods.map((food, i) => {

      food.foodNutrients.map((item) => {
        /* init nutrition list in the first round */
        if (i === 0) {
          setNutritionList((prev) => {
            return {
              ...prev,
              [item.nutrientName]: (item.value / food.finalFoodInputFoods[0].gramWeight) * food.weight //findout right calculation , brand name search dont have finalinput foods
            }
          })
        } else {
          /* add nuritions from 2nd round*/
          setNutritionList((prev) => {
            return {
              ...prev,
              [item.nutrientName]: prev[item.nutrientName] + (item.value / food.finalFoodInputFoods[0].gramWeight) * food.weight //findout right calculation , brand name search dont have finalinput foods
            }
          })
        }
      });
    })
  }

  /* get nutritions per serving */
  const getNutritionPerServing = () => {
    console.log(nutritionList);
    Object.keys(nutritionList).map((key, value) => (
      setNutritionPerServing((prev) => {
        console.log(key, value, perServing);
        return {
          ...prev,
          [key]: (value / perServing) // the calculation is wrong
        }
      })
    ))
  }

  const handleChange = (val) => {
    setPerServing(val * 1);
    console.log(perServing);
  }

  const handleClick = () => {
    getNutritionPerServing();
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


  // useEffect(() => {

  //   console.log(nutritionList);
  //   console.log(nutritionPerServing);

  // }, [nutritionList, nutritionPerServing]);


  const loaded = () => {
    return (<div className="result">
      <h3><img src="/images/title-bg.png" alt="lemon" />Selected Ingredients</h3>
      <ul>
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
        <h3><img src="/images/title-bg.png" alt="lemon" />Total nutrition information</h3>
        {/* Show only exisiting nutritions */}
        {Object.keys(nutritionList).filter(key => nutritionList[key] > 0).map((k, i) => (
          <div key={i} className='food-nutrition'>
            <div><b>{k}</b></div>
            <div>{nutritionList[k]} </div>
          </div>
        ))}
        <div className="serving">
          How many serving? <input type="number" pattern='[0-9]{0,5}' className='number' name='seving' onChange={(e) => handleChange(e.target.value)} />
          <button className="secondary-button" onClick={handleClick}> Calculate Nutritoin per Serving </button>
          <div className='hidden'>
            <h3>Nutritions per serving</h3>
            {/* show nutritions per serving */}
            {/* {Object.keys(nutritionPerServing).filter(key => nutritionPerServing[key] > 0).map((k, i) => (
            <div key={i} className='food-nutrition'>
              <div>{k}</div>
              <div>{nutritionPerServing[k]}</div>
            </div>
          ))} */}
          </div>
        </div>
      </div>
    </div>
    )
  }

  const loading = () => null;

  return (selectedFoods && selectedFoods.length > 0 && Object.keys(nutritionList).length > 0) ? loaded() : loading();
}

export default IngredientsInfo;