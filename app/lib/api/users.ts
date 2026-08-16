const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Admin {
  id: number;
  file?: string;
  fullName: string;
  phone: string;
  created_at: string;
  role: string;
  status: string;
}

export async function getAdmins(): Promise<Admin[]> {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/user/admin`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const text = await response.text();

  console.log("STATUS:", response.status);
  console.log("BACKEND RESPONSE:", text);

  if (!response.ok) {
    throw new Error(
      `GET /user/admin: ${response.status} ${text}`,
    );
  }

  const data = JSON.parse(text);

  console.log("PARSED DATA:", data);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  if (Array.isArray(data.result)) {
    return data.result;
  }

  return [];
}

export async function createAdmin(formData: FormData) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/user/admin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Не удалось создать администратора");
  }

  return response.json();
}

export async function updateAdmin(
  id: number,
  formData: FormData,
) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/user/admin/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Не удалось обновить администратора");
  }

  return response.json();
}

export async function deleteAdmin(id: number) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/user/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Не удалось удалить администратора");
  }

  return response.json();
}