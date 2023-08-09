import React from 'react';

function IngredientsInfo() {
  const handleRemove = () => {

  }

  return (
    <div>
      <h3>Selected Ingredients</h3>
      <ul>
        <li>Carrot 100g <button onClick={handleRemove}>❌</button></li>
        <li>White Rice 100g <button onClick={handleRemove}>❌</button></li>
        <li>Chicken Brest 200g <button onClick={handleRemove}>❌</button></li>
        <li>Onion 100g <button onClick={handleRemove}>❌</button></li>
        <li>Avocado Oil 20g <button onClick={handleRemove}>❌</button></li>
      </ul>
      <div>
        <h3>Total nutrition information</h3>
        <div className='food-nutrition'>
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
        How many serving? <input type="text" name='seving' />
        <button> Calculate </button>
        <div className='hidden'>
          <h3>Nutritions per serving</h3>
          <div className='food-nutrition'>
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
        </div>
      </div>
    </div>
  )
}

export default IngredientsInfo