import "./App.css";
import { GroupTask } from "./components/GroupTask/GroupTask";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <GroupTask section={{ id: 1, months: "January - March" }} />
        <GroupTask section={{ id: 2, months: "April - June" }} />
        <GroupTask section={{ id: 3, months: "July - September" }} />
        <GroupTask section={{ id: 4, months: "October - December" }} />
      </div>
    </div>
  );
}

export default App;
