import Container from "./components/Container"
import Footer from "./components/Footer"
import Header from "./components/Header"
import './components/styles/style.css';
import './components/styles/utility.css';

function App() {

  return (
    <div className="app">
      <Header />
      <Container />
      <Footer />
    </div>
  )
}

export default App
