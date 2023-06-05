import React from "react";
import Characters from "../Characters/Characters";
import Starships from "../Starships/Starships";
import Planets from "../Planets/Planets";
import "./Categories.css";

class Categories extends React.Component {
  state = {
    categories: ["People", "Planets", "Starships"],
    categoryId: 0,
  };

  changeCategory = (id) => {
    this.setState({
      ...this.state,
      categoryId: id,
    });
  };

  render() {
    const { categories, categoryId } = this.state;
    return (
      <div className="category_wrap">
        <div className="category_container">
          <div className="category_container_flex">
            {this.state.categories.map((category, index) => (
              <div
                className="category_element"
                key={index}
                onClick={() => this.changeCategory(index)}
              >
                {category}
              </div>
            ))}
          </div>
          {categoryId === 0 ? (
            <Characters category={categories[categoryId].toLocaleLowerCase()} />
          ) : null}
          {categoryId === 1 ? (
            <Planets category={categories[categoryId].toLocaleLowerCase()} />
          ) : null}
          {categoryId === 2 ? (
            <Starships category={categories[categoryId].toLocaleLowerCase()} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Categories;
