const API_BASE_URL = "http://127.0.0.1:8000/api";

async function handleResponse(response) {
  const contentType = response.headers.get("content-type");

  let data = null;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    };
  }

  return data;
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/categories/`);
  return handleResponse(response);
}

export async function createCategory(payload) {
  const response = await fetch(`${API_BASE_URL}/categories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function fetchTasks(categoryId = "") {
  const url = categoryId
    ? `${API_BASE_URL}/tasks/?category_id=${categoryId}`
    : `${API_BASE_URL}/tasks/`;

  const response = await fetch(url);
  return handleResponse(response);
}

export async function createTask(payload) {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function updateTask(taskId, payload) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw {
      status: response.status,
      data: null,
    };
  }

  return true;
}
