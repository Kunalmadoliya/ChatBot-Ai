import Ai from "./components/Ai";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col h-screen  text-white ">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <Ai />
      </div>
    </div>
  );
};

export default App;
