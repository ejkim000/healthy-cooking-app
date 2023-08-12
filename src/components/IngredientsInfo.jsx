import { useEffect, useState } from "react";

function IngredientsInfo({ data }) {

  const savedData = JSON.parse(localStorage.getItem('allFoods'));
  const [selectedFoods, setSelectedFoods] = useState(savedData);
  const [nutritionList, setNutritionList] = useState([]);
  const [combinedNutritionList, setCombinedNutritionList] = useState([]);
  const [nutritionPerServing, setNutritionPerServing] = useState([]);
  const [perServing, setPerServing] = useState(1);
  const [resultStyle, setResultStyle] = useState('hidden');

  /* get all nutritions */
  const getTotalNutritions = () => {

    if (selectedFoods && selectedFoods.length > 0) {

      selectedFoods.map((food) => {

        food.foodNutrients.map((item) => {

          let gramWeight, nutritionValue = 0;

          if (item.value * 1 > 0) {
            /* get brand search nutritions */
            if (food.dataType === 'Branded') {
              nutritionValue = ((item.value / food.servingSize) * food.weight).toFixed(2);

              /* get regular search nutritions */
            } else {
              gramWeight = food.finalFoodInputFoods.reduce((sum, i) => sum + i.gramWeight, 0);
              nutritionValue = ((item.value / gramWeight) * food.weight).toFixed(2);
            }
          }
          /* add all the nutritions to the list */
          setNutritionList((prev) => {
            return [
              ...prev,
              {
                name: item.nutrientName,
                value: nutritionValue,
                unit: item.unitName
              }
            ]
          });
        });
      });
    }
  }

  /* get nutritions per serving */
  const getNutritionPerServing = () => {

    combinedNutritionList.map((item) => (
      setNutritionPerServing((prev) => {
        return [
          ...prev,
          {
            name: item.name,
            value: (item.value / perServing).toFixed(2),
            unit: item.unit,
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
    /* save slsectedFoods to the local storage */
    localStorage.setItem('allFoods', JSON.stringify(selectedFoods));
    /* get total nutritions of selectedFood */
    getTotalNutritions();

  }, [selectedFoods]);


  useEffect(() => {
    /* use redce to combine nutrition values */
    const getCombinedNutritionList = nutritionList.reduce((items, item) => {
      const { name, value, unit } = item;
      const itemIndex = items.findIndex(item => item.name === name)
      if (itemIndex === -1) {
        items.push({
          name, value, unit
        });
      } else {
        items[itemIndex].value = (items[itemIndex].value * 1 + value * 1).toFixed(2);
      }

      return items;
    }, []);

    setCombinedNutritionList(getCombinedNutritionList);

  }, [nutritionList]);


  useEffect(() => {

    perServing > 0 && setResultStyle('result');

  }, [perServing]);


  useEffect(() => {

    //console.log(combinedNutritionList);

  }, [combinedNutritionList]);


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
        <h3><img src="/images/title-bg.png" alt="lemon" />Total Nutrition Information</h3>
        {/* Show only exisiting nutritions */}
        {combinedNutritionList.filter(item => item.value > 0).map((i, id) => (
          <div key={id} className='food-nutrition'>
            <div><b>{i.name}</b></div>
            <div>{i.value}</div>
            <div>{i.unit}</div>
          </div>
        ))}
        <div className="serving">
          How many serving? <input type="number" pattern='[0-9]{0,5}' className='number' name='seving' onChange={(e) => handleChange(e.target.value)} />
          <button className="secondary-button" onClick={handleClick}> Calculate Nutritoin Per Serving </button>
          <div className={resultStyle}>
            <h3><img src="/images/title-bg.png" alt="lemon" />Nutritions Per Serving</h3>
            {/* show nutritions per serving */}
            {nutritionPerServing.length > 0 && nutritionPerServing.map((item, id) => (
              <div key={id} className='food-nutrition'>
                <div><b>{item.name}</b></div>
                <div>{item.value}</div>
                <div>{item.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }

  const loading = () => null;

  return (selectedFoods
    && selectedFoods.length > 0
    && nutritionList.length > 0
    && combinedNutritionList.length > 0
  ) ? loaded() : loading();
}

export default IngredientsInfo;