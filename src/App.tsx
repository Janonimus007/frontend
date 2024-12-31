
import './App.css';
import Autocomplete from './components/AutoCompleteInput';
import { mockData } from './data/Celulares';
import { Item } from './interfaces/celulares.interface';

function App() {
  const handleSelect = (item: Item) => {
    alert(`Seleccionaste el celular: ${item.name}`);
  };
  return (
    <div className='container'>
      <h1>Busca tu celular</h1>
      <Autocomplete data={mockData} onSelect={handleSelect} />
    </div>
  );
}

export default App;
