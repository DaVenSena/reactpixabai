import React, { Component } from 'react';
import './bootstrap.min.css';
import Buscador from './componentes/Buscador.js'
import Resultado from './componentes/Resultado.js'

class App extends Component {
  state = {
    termino :'',
    imagenes :[],
    pagina :''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron')
    elemento.scrollIntoView('smooth', 'start')
  }

  paginaAnterior = () => {
    //leer la pagina actual
    let pagina = this.state.pagina;

    //si la pagina es 1 ya no volver
    if (pagina === 1) return null;

    //restar 1 a la pagina actual
    pagina --;

    //agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    //console.log(pagina);
  }

  paginaSiguiente = () => {
    //leer la pagina actual
    let pagina = this.state.pagina;

    //sumar 1 a la pagina actual
    pagina ++;

    //agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    //console.log(pagina);
  }

  datosBusqueda = (termino)=>{
    this.setState({
      termino : termino,
      pagina : 1
    }, ()=>{
      this.consultarApi();
    });
  }

  consultarApi = ()=>{
    const termino = this.state.termino
    const pagina = this.state.pagina
    const url = `https://pixabay.com/api/?key=25855821-f9dc08ca09bc4ea9d526c7f14&q=${termino}&per_page=30&page=${pagina}`;
    console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes : resultado.hits}))
  }

  render() {
    return (
      <div className="app container">
          <div className="jumbotron">
            <p className="lead text-center">Busca tu imagen</p>
            <Buscador            
            datosBusqueda={this.datosBusqueda}            
            />
          </div >
          <div className="row justify-content-center">
            <Resultado
              imagenes={this.state.imagenes}
              paginaAnterior={this.paginaAnterior}
              paginaSiguiente={this.paginaSiguiente}/>
          </div>
      </div>
    );
  }
}

export default App;
