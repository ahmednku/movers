console.log("Movers");
AOS.init();

const pages = ["index", "services", "blogs", "contact", "about"];
const renderHTML = async (elementId, filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.text();
    document.getElementById(elementId).innerHTML = data;

    pages.forEach((page) => {
      if (window.location.pathname === "/")
        document
          .getElementById("index")
          .classList.add("border-bottom", "rounded-3", "pb-0");
      else if (window.location.pathname.indexOf(page) > -1) {
        const activePage = document.getElementById(page);
        activePage.classList.add("border-bottom", "rounded-3", "pb-0");
      }
    });
  } catch (error) {
    console.error("Error loading HTML:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderHTML("header", "../header.html");
  renderHTML("footer", "../footer.html");
});
