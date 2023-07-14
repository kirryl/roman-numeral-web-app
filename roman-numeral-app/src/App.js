import logo from './csr.svg';
import './App.css';

import NumberConverter from './components/number-converter/number-converter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Head-spin" alt="logo" />
        <NumberConverter/>
      </header>
    </div>
  );
}

export default App;
