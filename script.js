// Format total amount with commas (Indian number system)
document.getElementById("totalAmount").addEventListener("input", function(e) {
  let value = e.target.value.replace(/,/g, ""); // remove old commas
  if (!isNaN(value) && value.length > 0) {
    e.target.value = Number(value).toLocaleString("en-IN");
  }
});

// Handle form submission
document.getElementById("quotationForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.target));

  // Remove commas from totalAmount before sending to backend
  formData.totalAmount = formData.totalAmount.replace(/,/g, "");

  // Show loading
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "⏳ Generating quotation... please wait";

  try {
    let response = await fetch("https://script.google.com/macros/s/AKfycbyTNu9Jru-g7Nu--6XL9jKxVrrB1bI0_pezq5ovnU_Awgf7BPP_8AFbmAaYHYrp4n0C/exec", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    let result = await response.json();

    if (result.error) {
      resultDiv.innerHTML = `❌ Backend error: ${result.error}`;
    } else {
      resultDiv.innerHTML = `
        ✅ Quotation generated successfully! <br>
        <a href="${result.link}" target="_blank">📄 Download Quotation</a>
      `;
    }

    // Optional: reset form after success
    // document.getElementById("quotationForm").reset();

  } catch (err) {
    resultDiv.innerHTML = "❌ Error: " + err.message;
  }
});
