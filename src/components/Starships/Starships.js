import React from "react";
import "./Starships.css";
import SwService from "../../services/sw-service";

class Starships extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    image: null,
    name: null,
    model: null,
    length: null,
    consumables: null,
    statusResponse: null,
    errorMessage: null,
  };

  SwService = new SwService();

  getStarshipsData = () => {
    const id = Math.floor(Math.random() * (30 - 1) + 1);
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
        model: res[0].data.model,
        length: res[0].data.length,
        consumables: res[0].data.consumables,
        statusResponse: res[0].status,
        errorMessage: "",
      });
    });
  };

  componentDidMount() {
    this.getStarshipsData();
  }

  render() {
    const {
      image,
      name,
      model,
      length,
      consumables,
      statusResponse,
      errorMessage,
    } = this.state;
    return (
      <div className="starships_wrap">
        <div className="starships_container">
          <button className="starships_button" onClick={this.getStarshipsData}>
            NEXT
          </button>
          {statusResponse === 200 ? (
            <div className="starships_container_flex">
              <img className="starships_img" src={`${image}`} alt="image" />
              <ul className="starships_data_list">
                <h3 className="starships_title">{name}</h3>
                <li className="starships_data_list_element">Model: {model}</li>
                <li className="starships_data_list_element">
                  Length: {length}
                </li>
                <li className="starships_data_list_element">
                  Consumables: {consumables}
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

export default Starships;
