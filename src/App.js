import logo from "./logo.svg";
import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>some video:</p>
            </header>
            <div className="App-body">
                <video id="video" width="320" height="240" controls>
                    <source src="Videos/zoom_record.mp4" type="video/mp4" />
                </video>
            </div>
            <footer>
                <p>search</p>
            </footer>
        </div>
    );
}

export default App;
