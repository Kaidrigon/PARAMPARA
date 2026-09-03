const API_BASE_URL = "https://parampara-2h4z.onrender.com";

export async function traceClaim(claim) {
    const response = await fetch(`${API_BASE_URL}/api/trace`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        claim,
    }),
    });

    if (!response.ok) {
    throw new Error(`Trace request failed: ${response.status}`);
    }

    return response.json();
}