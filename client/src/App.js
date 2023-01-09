import "./App.css";
import { GroupTask } from "./components/GroupTask/GroupTask";
import { Task } from "./components/Task/Task";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import { fetchGroupTodos, login } from "./api/server";

function App() {
  const [listGroup, setListGroup] = useState([]);

  useEffect(() => {
    const data = {
      email: "surya@mail.com",
      password: "surya",
    };

    login(data)
      .then(({ auth_token }) => localStorage.setItem("auth_token", auth_token))
      .catch((error) => console.log(error));

    fetchGroupTodos()
      .then((result) => {
        setListGroup(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main">
        {listGroup.map((el, idx) => {
          return (
            <GroupTask
              section={{
                id: idx + 1,
                group_id: el.id,
                months: el.description,
              }}
              key={idx}
            >
              <Task group={{ id: idx + 1, item: el }} />
            </GroupTask>
          );
        })}
      </div>
    </div>
  );
}

export default App;
