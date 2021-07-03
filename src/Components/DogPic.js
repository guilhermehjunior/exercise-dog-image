import React from 'react';

const URL = 'https://dog.ceo/api/breeds/image/random';

class DogPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dogPic: undefined,
    }
  }

  async componentDidMount() {
    const response = await fetch(URL);
    const doguinho = await response.json();
    this.setState({
      dogPic: <img src={doguinho.message} alt="foto doguim"/>,
      loading: false,
    })
  }

  render() {
    return (
      <div>
        <h1>Foto de doguinho!</h1>
        {this.state.loading ? 'Loading...' : this.state.dogPic}
      </div>
    );
  }
}

export default DogPic;