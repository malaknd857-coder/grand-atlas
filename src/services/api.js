const API_BASE_URL = "/api/v1";

export async function getData(endpoint, params = {}) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
            query.append(key, value);
        }
    });

    const queryString = query.toString();
    const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || `API Error: ${response.status}`);
    }

    return result;
}

export async function postData(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || `API Error: ${response.status}`);
    }

    return result;
}

export async function uploadData(endpoint, formData, method = "POST") {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || `Upload Error: ${response.status}`);
    }

    return result;
}