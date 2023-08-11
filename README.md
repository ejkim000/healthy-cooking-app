# Healthy Cooking App
- Calculate your food nutritions
- React App Project
- EJ Kim
- August 2023
- Save user's data in the localstorage
- Support mobile view

## Live Site
- https://healthy-cooking.netlify.app/

## API
- https://fdc.nal.usda.gov/api-guide.html

## VITE
- Installatin & run
``` 
> npm create vite@latest 
> project-name -> react -> javascript
> cd project-name
> npm install
> npm run dev
```

## Approach Taken
1. Project Setup
Set up your development environment by installing Node.js, npm, and VITE (Node Package Manager).

2. Component Design
- Header: top header
- Container: contains all contents
- SearchIngredient: Search form, search food ingredient via API
- NutritIoninfo: Get all food information, include nutrition info. See/Hide toggle
- IngredientInfo: Gather all ingredient's information to show combined nutritions. Also shows perservign nutritions as well.
- Footer: sticky to the bottom

3. Styling
- Use CSS files to style components.
- /src/components/styles
- utility.css : style of elements
- style.css: style of component

4. Testing
- Tested in the local dev mode
- Tested in the production mode after deply in Netlify

5. Deployment
- https://healthy-cooking.netlify.app/
- Make sure API KEy stays in the .env file and set up this in the Netlify website

## Unsolved Problems
1. Calculation of each Nutrition 
    - I see some values are infinity, fix this issue
2. Combining same nutrition togather
    - Have to figure out which method I will use for this