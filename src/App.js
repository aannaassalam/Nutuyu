import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layout/components/navbar/navbar";
import Homepage from "./layout/pages/homepage/homepage";
import Footer from "./layout/components/footer/footer";
import DoubleImageText from "./layout/components/doubleImageText/doubleImageText";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Homepage />
      <DoubleImageText />
      <Footer />
    </div>
  );
}

export default App;
