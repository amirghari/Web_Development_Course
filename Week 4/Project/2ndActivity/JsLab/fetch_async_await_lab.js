// fetch_async_await_lab.js

async function fetchData() {
  console.log("Fetching data...");

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/nonexistent"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
