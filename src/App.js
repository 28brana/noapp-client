import "./App.css";
import UploadCSV from "./component/UploadCSV";

function App() {
  return (
    <div className="container flex [background:#F1F3F7] justify-center  h-screen ">
      <div className="[width:600px] mt-10">
        <UploadCSV />
      </div>
    </div>
  );
}

export default App;
