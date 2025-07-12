
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("search-form");
    const input = document.getElementById("search-keyword");
    const resultsContainer = document.getElementById("search-results");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent form submission

      const keyword = input.value.trim().toLowerCase();
      if (keyword === "") {
        alert("Please enter a search term.");
        input.focus();
        return;
      }

      resultsContainer.innerHTML = ""; // clear previous results

      // Remove old highlights
      document.querySelectorAll(".search-highlight").forEach(el => {
        el.classList.remove("search-highlight");
      });

      const contentElements = Array.from(document.body.querySelectorAll("*"))
        .filter(el =>
          el.children.length === 0 &&
          el.textContent.trim().length > 0 &&
          el.offsetParent !== null // visible elements only
        );

      let matchCount = 0;
      const resultList = document.createElement("ul");

      contentElements.forEach((el, index) => {
        const text = el.textContent.trim();
        const textLower = text.toLowerCase();

        if (textLower.includes(keyword)) {
          el.classList.add("search-highlight");

          // Assign unique ID if not present
          if (!el.id) {
            el.id = "search-match-" + index;
          }

          // Create result link
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = "#" + el.id;
          a.textContent = truncate(text, 80); // short preview
          a.style.textDecoration = "none";
          a.style.color = "#007bff";
          a.style.fontWeight = "500";
          li.appendChild(a);
          resultList.appendChild(li);

          matchCount++;
        }
      });

      if (matchCount > 0) {
        resultsContainer.appendChild(resultList);
      } else {
        resultsContainer.innerHTML = "<p>No results found.</p>";
      }
    });

    function truncate(str, max) {
      return str.length > max ? str.substring(0, max) + "..." : str;
    }
  });


