import React, {useState} from 'react';
import './App.css';
import api from './services/api';


function App() {

  const [cep, setCep] = useState('')
  const [dados, setDados] = useState('')


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
    <>
      <h1>Consultar CEP</h1>
      <div>
        <input type='number' name='cep' onChange={(e) => atribuirCep(e)}></input>
        <button onClick={() => consultarCep()}>Buscar Cep</button>
      </div>
      <div name='resultado'>
        {dados}
      </div>
    </>
  );
}

export default App;
