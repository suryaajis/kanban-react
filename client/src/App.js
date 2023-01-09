import "./App.css";
import { GroupTask } from "./components/GroupTask/GroupTask";
import { Task } from "./components/Task/Task";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import { fetchGroupTodos, login } from "./api/server";

function App() {
  const [listGroup, setListGroup] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = {
      email: "surya@mail.com",
      password: "surya",
    };

    setLoading(true);
    login(data)
      .then(({ auth_token }) => {
        localStorage.setItem("auth_token", auth_token);
        fetchGroupTodos(auth_token)
          .then((result) => {
            setListGroup(result);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="main">
        <h3>Loading . . .</h3>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      {listGroup.length > 0 ? (
        <div className="main">
          {listGroup?.map((el, idx) => {
            return (
              <GroupTask
                key={idx}
                section={{
                  id: idx + 1,
                  group_id: el.id,
                  months: el.description,
                }}
              >
                <Task
                  group={{ id: idx + 1, item: el }}
                  nextGroup={listGroup[idx + 1]}
                  prevGroup={listGroup[idx - 1]}
                />
              </GroupTask>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
