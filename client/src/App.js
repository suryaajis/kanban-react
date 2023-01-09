import "./App.css";
import { GroupTask } from "./components/GroupTask/GroupTask";
import { Task } from "./components/Task/Task";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import { fetchTodos, login } from "./api/server";

const list1 = [
  "Bundle interplenetary analytics for improved itransmission",
  'Re-design the zero-g doggie bags, No more spills"!',
];
const list2 = ["Data Migration and Culture End Game"];
const list3 = ["Create kanban board with react in one day just a mini project"];

function App() {

  const [listGroup, setListGroup] = useState([])

  useEffect(() => {
    const data = {
      email: "surya@mail.com",
      password: "surya",
    };

    login(data)
      .then(({ auth_token }) => localStorage.setItem("auth_token", auth_token))
      .catch((error) => console.log(error));
    
    fetchTodos()
    .then(result => console.log(result))
    .catch(err => console.log(err))
    
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main">
        <GroupTask section={{ id: 1, months: "January - March" }}>
          {list3.map((el) => {
            return <Task item={el} />;
          })}
        </GroupTask>
        <GroupTask section={{ id: 2, months: "April - June" }}>
          {list2.map((el) => {
            return <Task item={el} />;
          })}
        </GroupTask>
        <GroupTask section={{ id: 3, months: "July - September" }}>
          <Task item={null} />
        </GroupTask>
        <GroupTask section={{ id: 4, months: "October - December" }}>
          {list1.map((el) => {
            return <Task item={el} />;
          })}
        </GroupTask>
      </div>
    </div>
  );
}

export default App;
