console.log("Movers");
AOS.init();

const pages = ["index", "services", "blogs", "contact", "about"];
const renderHTML = async (elementId, filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.text();
    document.getElementById(elementId).innerHTML = data;

    // over-ridden firebase.config to not show .html extension in browser
    // but on localhost we have to use .html extension
    // manipulating the href attributes based on environment.
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
      const pageLinks = {
        index: "./index.html",
        services: "./services.html",
        blogs: "./blogs.html",
        about: "./about.html",
        contact: "./contact.html",
      };
      Object.keys(pageLinks).forEach((pageId) => {
        document.querySelectorAll(`.${pageId}`).forEach((element) => {
          element.href = pageLinks[pageId];
        });
      });
    }

    if (elementId !== "header") return;
    pages.forEach((page) => {
      if (window.location.pathname === "/") {
        document.querySelectorAll(".index").forEach((element) => {
          element.classList.add("border-bottom", "rounded-3", "pb-0");
        });
      } else if (window.location.pathname.indexOf(page) > -1) {
        document.querySelectorAll("." + page).forEach((element) => {
          element.classList.add("border-bottom", "rounded-3", "pb-0");
        });
      }
    });
    window.scrollTo(0, 0);
  } catch (error) {
    console.error("Error loading HTML:", error);
  } finally {
    window.scrollTo(0, 0);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderHTML("header", "../header.html");
  renderHTML("footer", "../footer.html");
  hideLoader();
});

const showLoader = () => {
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.style.display = "grid";
};

const hideLoader = () => {
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.style.display = "none";
};
