/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react';
import './App.css';
import api from './services/api';
import icon from './img/seta.svg'


function App() {

  const [cep, setCep] = useState('')
  const [dados, setDados] = useState('')
  
  const listar = dados.map((dado, value) => {
    return <li key={value}>{dado}</li>
  })

  function atribuirCep(e) {
    e.preventDefault()
    setCep(e.target.value)
  }

  function consultarCep(){
    let url = cep + '/json'
    api.get(url).then(
      (response) => {
        if(!response.data.erro){
          let objeto = JSON.stringify(response.data)
          setDados(objeto)
        }else{
          setDados('Dados não encontrados')
        }
      }
      ).catch(
      (err) => {
        setDados('Dados não encontrados')
      }
    )

  }


  return (
    <div id='box'>
      <h1>Consultar <span id='span'>CEP</span></h1>
      <div id='inputs'>
        <input type='tel' name='cep' onChange={(e) => atribuirCep(e)}></input>
        <button onClick={() => consultarCep()}><img src={icon} id='icon'></img></button>
      </div>
      <div id='resultado'>
        <ul>
          {listar}
        </ul>
      </div>
    </div>
  );
}

export default App;
