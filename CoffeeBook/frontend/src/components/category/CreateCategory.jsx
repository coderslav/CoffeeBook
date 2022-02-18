import React, { Component } from 'react'

export default class CreateCategory extends Component {



  render() {
    return (
      <>
        <p className="h4">Créer une catégorie</p>
        <form action="" method="post">
          <input type="text" name="newCategory" placeholder="ex: Paris 2024" />
        </form>
      </>
    )
  }
}