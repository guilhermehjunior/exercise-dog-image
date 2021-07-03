import React from 'react';

const URL = 'https://dog.ceo/api/breeds/image/random';

class DogPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dogPic: '',
    }
    this.fecthDog = this.fecthDog.bind(this);
  }

  fecthDog() {
    this.setState({loading: true}, async () => {
    const response = await fetch(URL);
    const doguinho = await response.json();
    this.setState({
      dogPic: doguinho.message,
      loading: false,
    },() => {
      const breed = doguinho.message.match(/https:\/\/images\.dog\.ceo\/breeds\/(\w+)/);
      alert(breed[1]);
    });
    localStorage.setItem('dogPic', doguinho.message);
  })
  }

  componentDidMount() {
    this.fecthDog();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if(nextState.dogPic && nextState.dogPic.includes('terrier')) {
      return false;
    }
    return true;
  }

  render() {
    const { dogPic, loading } = this.state;
    return (
      <div>
        <h1>Foto de doguinho!</h1>
        <p>
          { loading ? 'Loading...' : <img src={dogPic} alt="foto doguim"/> }
        </p>
        <button onClick={ this.fecthDog }>Outro doguinho!</button>
      </div>
    );
  }
}

export default DogPic;