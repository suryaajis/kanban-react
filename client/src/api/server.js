const baseUrl = "https://todo-api-18-140-52-65.rakamin.com";
const token = localStorage.getItem("auth_token");

export async function login(data) {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function fetchGroupTodos() {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your to
    },
  });
  return response.json();
}

export async function postGroupTodos(data) {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your to
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function fetchListTodos(id) {
  const response = await fetch(`${baseUrl}/todos/${id}/items`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your to
    },
  });
  return response.json();
}

export async function postTodo(id, data) {
  const response = await fetch(`${baseUrl}/todos/${id}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your to
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function editTodo(group_id, item_id, data) {
  const response = await fetch(
    `${baseUrl}/todos/${group_id}/items/${item_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your to
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
}

export async function deleteTodo(group_id, item_id) {
  const response = await fetch(
    `${baseUrl}/todos/${group_id}/items/${item_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your to
      },
    }
  );
  return response
}
