import React, {useState} from 'react';
import { Punto1 } from './components/punto1';
import { Punto2 } from './components/punto2';
import { Punto3 } from './components/punto3';
import logo from './assets/logo.svg';
import './App.css';

export const App: React.FC = (): JSX.Element => {
  const [option, setOption] = useState(1);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          UAI | Algoritmo RSA | 1° PARCIAL
        </p>
      </header>
      <main className="App-body">
        <div className="App-options">
          <button className="btn-action-outline" onClick={() => setOption(1)}>
            Punto 1
          </button>
          <button className="btn-action-outline" onClick={() => setOption(2)}>
            Punto 2
          </button>
          <button className="btn-action-outline" onClick={() => setOption(3)}>
            Punto 3
          </button>
        </div>
        <div className="App-content">
          { (option === 1) && <Punto1/> }
          { (option === 2) && <Punto2/> }
          { (option === 3) && <Punto3/> }
        </div> 
      </main>
      <footer className="App-footer">
        *** Aldana Abril Godoy ***
      </footer>
    </div>
  );
}

export default App;
