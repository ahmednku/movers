console.log("Movers");
AOS.init();

const renderHTML = async (elementId, filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.text();
    document.getElementById(elementId).innerHTML = data;
  } catch (error) {
    console.error("Error loading HTML:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderHTML("header", "../header.html");
  renderHTML("footer", "../footer.html");
});
