const baseUrl = "https://todo-api-18-140-52-65.rakamin.com"

export async function login(data) {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    body: JSON.stringify(data) 
  });
  return response.json();
}

export async function fetchTodos() {
  const token = localStorage.getItem("auth_token")
  const response = await fetch(`${baseUrl}/todos`, {
    method: 'GET', 
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`, // notice the Bearer before your to
    },
  });
  return response.json();
}
