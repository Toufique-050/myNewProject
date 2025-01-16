const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const productQuantityInput = document.getElementById("productQuantity");
const quantityError = document.getElementById("quantityError");

const maxQuantity = 3000;
productQuantityInput.addEventListener("input", function () {
  const enteredQuantity = parseFloat(productQuantityInput.value);

  if (enteredQuantity > maxQuantity) {
    quantityError.style.display = "block";
  } else {
    quantityError.style.display = "none";
  }
});

productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const productName = document.getElementById("productSelect").value;
  const productQuantity = parseFloat(
    document.getElementById("productQuantity").value
  );
  const productPrice = parseFloat(
    document.getElementById("productPrice").value
  );
  const discount = parseFloat(document.getElementById("discount").value) || 0;
  const tax = parseFloat(document.getElementById("tax").value) || 0;
  
// validation 
  if (
    productName === "" ||
    isNaN(productQuantity) ||
    productQuantity <= 0 ||
    productQuantity > maxQuantity ||
    isNaN(productPrice) ||
    isNaN(discount) ||
    isNaN(tax)
  ) {
    const emptyFieldModal = new bootstrap.Modal(document.getElementById("emptyFieldModal"));
    emptyFieldModal.show();
    return;
  }

  const totalCost = productQuantity * productPrice;
  const discountAmount = (totalCost * discount) / 100;
  const taxAmount = ((totalCost - discountAmount) * tax) / 100;
  const finalCost = totalCost - discountAmount + taxAmount;


  const currentDate = new Date();
  const dateAdded = currentDate.toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"

  const row = document.createElement("tr");

  const rowCount = productTable.rows.length + 1

 

  row.innerHTML = `

    <td>${rowCount}</td>
    <td>${productName}</td>
    <td>${productQuantity}</td>
    <td>${productPrice.toFixed(2)}</td>
    <td>${discount}%</td>
    <td>${tax}%</td>
    <td>${totalCost.toFixed(2)}</td>
    <td>${finalCost.toFixed(2)}</td>
    <td>${dateAdded}</td>
    <td><button class="btn btn-danger btn-sm deleteRow">Delete</button></td>
  `;

  row.querySelector(".deleteRow").addEventListener("click", function () {
    row.remove();
    updateGrandTotal()

  });

  productTable.appendChild(row);

  // function updateRowIndexes() {
  //   const rows = productTable.querySelectorAll("tr");
  //   rows.forEach(function (row, index) {
  //     row.children[0].textContent = index + 1;
  //   });
  // }

  function updateGrandTotal() {
    let total = 0;
    document.querySelectorAll("#productTable tr").forEach(function (row) {
      const finalCost = parseFloat(row.children[7].textContent) || 0;
      total = total + finalCost;
    });
    document.getElementById("grandTotal").textContent = total.toFixed(2);
  }


  // productForm.addEventListener("submit", updateGrandTotal);
  // productTable.addEventListener("click", function (event) {
  //   if (event.target.classList.contains("deleteRow")) {
  //     updateGrandTotal();
  //   }
  // });


  updateGrandTotal()
  productForm.reset();
});
