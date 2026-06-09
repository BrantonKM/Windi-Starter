// client/main.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.success) {
        alert(" Message submitted successfully!");
        form.reset();
      } else {
        alert(" Failed to submit message.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert(" Server error. Please try again later.");
    }
  });
});
