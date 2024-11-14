import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>

  );
}

export default App;
