import React from 'react'
import { Link } from "react-router-dom"
import { Helmet } from 'react-helmet'
import mealdb from '../mealdb-api'

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = { recipes: null, isLoading: true }
  }

  async componentDidMount() {
    var recipes
    try {
      recipes = await mealdb.getLatest()
    } catch(e) { console.error(e); recipes = null }
    this.setState({ recipes, isLoading: false })
  }

  render() {
    const { recipes, isLoading } = this.state

    if( isLoading ) {
      return <div className="message">Cargando...</div>
    }

    return <div>
      <Helmet>
        <title>Recetas</title>
      </Helmet>

      <div className="recipes">
        { recipes && recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} className="recipe" key={recipe.id}>
            <span className="bg" style={ { backgroundImage: `url(${recipe.thumbnail})` } }></span>
            <span className="info">
              <h2>{ recipe.name }</h2>
            </span>
          </Link>
        )) }
      </div>
    </div>
  }

}