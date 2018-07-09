import React from 'react'

export default class RecipeIngredients extends React.Component {

  render() {
    const { ingredients } = this.props
    
    return <div className="ingredients">
      <h2>Ingredients</h2>
      <ul>
        { ingredients.map((i, ix) => (
          <li key={ix}>{ i.ingredient }: { i.measure }</li>
        )) }
      </ul>
    </div>
  }

}