import { useEffect, useState } from "react";

function IngredientsInfo({ data }) {

  const savedData = JSON.parse(localStorage.getItem('allFoods'));
  const [selectedFoods, setSelectedFoods] = useState(savedData);
  const [nutritionList, setNutritionList] = useState([]);
  const [nutritionPerServing, setNutritionPerServing] = useState({});
  const [perServing, setPerServing] = useState(1);

  const handleRemove = (foodId) => {
    setSelectedFoods((prev) => prev.filter((food) => food.fdcId !== foodId));
  }


  /* get all nutritions */
  const getTotalNutritions = () => {

    if (selectedFoods && selectedFoods.length > 0) {

      selectedFoods.map((food) => {
        food.foodNutrients.map((item) => {

          if (item.value > 0) {
            let gramWeight, nutritionValue = 0;

            /* get brand search nutritions */
            if (outerHeight.dataType === 'Branded') {
              nutritionValue = ((item.value / food.servingSize) * food.weight).toFixed(2);
  
            /* get regular search nutritions */
            } else {
              gramWeight = food.finalFoodInputFoods.reduce((sum, i) => sum + i.gramWeight, 0);
              nutritionValue = ((item.value / gramWeight) * food.weight).toFixed(2);
            }

            setNutritionList((prev) => {
              return [
                ...prev,
                {
                  name: item.nutrientName,
                  value: nutritionValue,
                  unit: item.unitName
                }
              ]
            })
          }
        });
      })
    }
  }

  /* get nutritions per serving */
  const getNutritionPerServing = () => {

    nutritionList.map((item) => (
      setNutritionPerServing((prev) => {

        return [
          ...prev,
          {
            name: item.nutrientName,
            value: (item.value / perServing).toFixed(2),
            unit: item.unitName,
          }
        ]
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
        {nutritionList.filter(item => item.value > 0).map((i, id) => (
          <div key={id} className='food-nutrition'>
            <div><b>{i.name}</b></div>
            <div>{i.value}</div>
            <div>{i.unit}</div>
          </div>
        ))}
        <div className="serving">
          How many serving? <input type="number" pattern='[0-9]{0,5}' className='number' name='seving' onChange={(e) => handleChange(e.target.value)} />
          <button className="secondary-button" onClick={handleClick}> Calculate Nutritoin per Serving </button>
          <div className='hidden'>
            <h3>Nutritions per serving</h3>
            {/* show nutritions per serving */}
            {/* {nutritionPerServing.filter(item => item.value > 0).map((i, id) => (
              <div key={id} className='food-nutrition'>
                <div><b>{i.name}</b></div>
                <div>{i.value} {i.unit}</div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
    )
  }

  const loading = () => null;

  // return (selectedFoods && selectedFoods.length > 0 && Object.keys(nutritionList).length > 0) ? loaded() : loading();
  return (selectedFoods && selectedFoods.length > 0 && nutritionList.length > 0) ? loaded() : loading();
}

export default IngredientsInfo;