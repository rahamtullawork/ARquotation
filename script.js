// // Handle form submission
// document.getElementById("quotationForm").addEventListener("submit", function(e) {
//   e.preventDefault(); // stop page refresh

//   const formData = Object.fromEntries(new FormData(e.target));

//   // For now, simulate a backend response
//   // Later we will replace this with a fetch() call to Google Apps Script
//   setTimeout(() => {
//     const fakeQuotationLink = "https://drive.google.com/fake-sample-quotation.pdf";
//     document.getElementById("result").innerHTML = `
//       ✅ Quotation generated successfully! <br>
//       <a href="${fakeQuotationLink}" target="_blank">📄 Download Quotation</a>
//     `;
//   }, 800); // simulate processing delay
// });

// Format total amount with commas (Indian number system)
document.getElementById("totalAmount").addEventListener("input", function(e) {
  let value = e.target.value.replace(/,/g, ""); // remove old commas
  if (!isNaN(value) && value.length > 0) {
    e.target.value = Number(value).toLocaleString("en-IN");
  }
});

document.getElementById("quotationForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.target));

  // Remove commas from amount before sending
  formData.totalAmount = formData.totalAmount.replace(/,/g, "");

  document.getElementById("result").innerHTML = "⏳ Generating quotation... please wait";

  try {
    let response = await fetch("https://script.google.com/macros/s/AKfycbyTNu9Jru-g7Nu--6XL9jKxVrrB1bI0_pezq5ovnU_Awgf7BPP_8AFbmAaYHYrp4n0C/exec", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });

    let result = await response.json();
    document.getElementById("result").innerHTML = `
      ✅ Quotation generated successfully! <br>
      <a href="${result.link}" target="_blank">📄 Download Quotation</a>
    `;
  } catch (err) {
    document.getElementById("result").innerHTML = "❌ Error: " + err.message;
  }
});
