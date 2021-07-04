import React from 'react';

const URL = 'https://dog.ceo/api/breeds/image/random';

class DogPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dogPic: '',
      dogName: '',
      infos: [],
    }
    this.fecthDog = this.fecthDog.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
  }

  fecthDog() {
    this.setState({loading: true}, async () => {
    const response = await fetch(URL);
    const doguinho = await response.json();
    this.setState({
      dogPic: doguinho.message,
      loading: false,
    }, () => {
      const breed = doguinho.message.match(/https:\/\/images\.dog\.ceo\/breeds\/(\w+)/);
      alert(breed[1]);
    });
  })
  }

  onChangeHandle(event) {
    this.setState({dogName: event.target.value})
  }

  onClickHandle() {
    this.setState({
      infos: [this.state.dogPic, this.state.dogName]
    }, () => {
      localStorage.setItem('dogs', JSON.stringify(this.state.infos));
    });
  }

  componentDidMount() {
    const dog = JSON.parse(localStorage.getItem('dogs'));
    console.log(dog);
    if(dog) {
      this.setState({
        dogPic: dog[0],
        loading: false,
        dogName: dog[1],
      });
    } else {
      this.fecthDog();
    }
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
        <input type="text" placeholder="Nome do doguinho" onChange={ this.onChangeHandle } />
        <button onClick={ this.onClickHandle }>Salvar doguinho!</button>
      </div>
    );
  }
}

export default DogPic;