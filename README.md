# Healthy Cooking App
- Calculate your food nutritions
- React App Project
- Support Mobile View
- Save user's ingrdients in the localstorage
-------
- EJ Kim
- August 2023


## Live Site
- https://healthy-cooking.netlify.app/


## API
- https://fdc.nal.usda.gov/api-guide.html


## Approach Taken
1. Project Setup
- Set up your development environment by installing Node.js, npm, and VITE (Node Package Manager).


2. Component Design
- Header
    - top header
- Container
    - contains all contents
- SearchIngredient
    - Search form
    - Search food ingredient via API
- NutritIoninfo
    - Get all food information, include nutrition info.
    - Save food info in the localstorage
    - See/Hide toggle
- IngredientInfo
    - Gather all ingredient's information to show combined nutritions
    - Contains PerServing Calculation form
    - Show per serving nutritions
- Footer
    - Sticky to the bottom


3. Styling
- Use CSS files to style components.
- /src/components/styles
- utility.css : style of elements
- style.css: style of component
- Support mobile view


4. Testing
- Tested in the local dev mode
- Tested in the production mode after deply in Netlify


5. Deployment
- Netlify
- https://healthy-cooking.netlify.app/
- Make sure APIKEY stays in the .env file and set up this in the Netlify website


## VITE
- Installatin & run
``` 
> npm create vite@latest 
> project-name -> react -> javascript
> cd project-name
> npm install
> npm run dev
```


## Unsolved Problem
- When remove ingredient, the nutrition value goes up
- Add calculation for the oz unit
- Check the 'Branded' food nutritions in deatail 