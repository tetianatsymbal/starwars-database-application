import React from "react";
import "./Planets.css";
import SwService from "../../services/sw-service";

class Planets extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    image: null,
    name: null,
    diameter: null,
    climate: null,
    population: null,
    statusResponse: null,
    errorMessage: null,
  };

  SwService = new SwService();

  getPlanetsData = () => {
    const id = Math.floor(Math.random() * (20 - 1) + 1);
    this.SwService.getData(id, this.props.category).then((res) => {
      if (res.errorMessage !== undefined) {
        this.setState({
          errorMessage: res.errorMessage,
          statusResponse: res.status,
        });
        return;
      }
      this.setState({
        id: id,
        image: res[1].request.responseURL,
        name: res[0].data.name,
        diameter: res[0].data.diameter,
        climate: res[0].data.climate,
        population: res[0].data.population,
        statusResponse: res[0].status,
        errorMessage: "",
      });
    });
  };

  componentDidMount() {
    this.getPlanetsData();
  }

  render() {
    const {
      image,
      name,
      diameter,
      climate,
      population,
      statusResponse,
      errorMessage,
    } = this.state;
    return (
      <div className="planets_wrap">
        <div className="planets_container">
          <button className="planets_button" onClick={this.getPlanetsData}>
            NEXT
          </button>
          {statusResponse === 200 ? (
            <div className="planets_container_flex">
              <img className="planets_img" src={`${image}`} alt="image" />
              <ul className="planets_data_list">
                <h3 className="planets_title">{name}</h3>
                <li className="planets_data_list_element">
                  Diameter: {diameter}
                </li>
                <li className="planets_data_list_element">
                  Climate: {climate}
                </li>
                <li className="planets_data_list_element">
                  Population: {population}
                </li>
              </ul>
            </div>
          ) : (
            <div className="error">{errorMessage}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Planets;
