  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#admission-form");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload
      alert("Form submitted! We will contact you soon.");
      form.reset(); // Optional: clear form after submit
    });
  });
