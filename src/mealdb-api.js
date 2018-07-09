import 'isomorphic-fetch'

const baseUrl = 'https://www.themealdb.com/api/json/v1/1'

export default {
  getLatest,
  getRecipe
}

async function getLatest() {
  const request = await fetch(`${baseUrl}/latest.php`)
  const data = await request.json()
  const recipes = data.meals.map((m) => normalizeMeal(m))

  return recipes
}

async function getRecipe(recipeId) {
  const request = await fetch(`${baseUrl}/lookup.php?i=${recipeId}`)
  const data = await request.json()
  if( ! data.meals ) return null
  const recipe = normalizeMeal(data.meals.shift())

  return recipe
}

function normalizeMeal(meal) {
  const newMeal = {}

  newMeal.id = meal.idMeal
  newMeal.name = meal.strMeal
  newMeal.category = meal.strCategory
  newMeal.origin = meal.strArea
  newMeal.instructions = meal.strInstructions.split('\n').filter((i) => i.trim() !== '')
  newMeal.thumbnail = meal.strMealThumb
  newMeal.tags = meal.strTags ? meal.strTags.split(',') : []
  newMeal.youtube = meal.strYoutube
  newMeal.ingredients = []
  newMeal.url = meal.strSource
  newMeal.dateModified = meal.dateModified

  for( let i=1; i<=20; i++ ) {
    if( meal[`strIngredient${i}`] !== '' && meal[`strMeasure${i}`] !== '' ) {
      newMeal.ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`]
      })
    }
  }

  return newMeal
}


