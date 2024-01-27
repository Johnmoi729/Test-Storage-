// All input Variables
let prodcode = document.getElementById("prodcode");
let price = document.getElementById("price");
let quantity = document.getElementById("quantity");
let ads = document.getElementById("amount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let notes = document.getElementById("notes");
let search = document.getElementById("search");
let currUpdateBtn;
let searchedItem = "prodcode";
let tbody = document.getElementById("tbody");

// Check for Product List in Local Storage
let prodList = [];
if (localStorage.getItem("products")) {
  prodList = JSON.parse(localStorage.getItem("products"));
  console.log("found local storage");
} else {
  console.log("no local storage found");
}

// Create Product
function createProd(c) {
  if (c == "") {
    c = 1;
  }
  for (let i = 0; i < c; i++) {
    let thisProd = {
      prodcode: prodcode.value,
      price: price.value,
      quantity: quantity.value,
      amount: amount.value,
      notes: notes.value,
    };
    prodList.push(thisProd);
    var retVal = confirm("Are you sure add new product?");
    if (retVal == true) {
      alert("Product added");
      return saveProd(1), window.location.reload();
    } else {
      alert("Cancelled");
      return false;
    }
  }
  showData();
  clearInput();
}

// Save Data in LocalStorage
function saveProd() {
  localStorage.setItem("products", JSON.stringify(prodList));
  console.log("Save data to localstorage successfully!");
}

// Clear Inputs after creating a product
function clearInput() {
  prodcode.value = "";
  price.value = "";
  quantity.value = "";
  amount.value = "";
  count.value = "";
  notes.value = "";
}

// Read and Show Data In Table (output)
function showData() {
  let table = ``;
  for (let i = 0; i < prodList.length; i++) {
    table += `           <tr>
                        <td>${i + 1}</td>
                        <td>${prodList[i].prodcode}</td>
                        <td>${prodList[i].price}</td>
                        <td>${prodList[i].quantity}</td>
                        <td>${prodList[i].amount}</td>
                        <td>${prodList[i].notes}</td>
                        <td><input onclick="updateProd(${i})" type="button" value="Update"></td>
                        <td><input onclick="deleteProd(${i})" type="button" value="Delete"></td>
                    </tr>`;
  }
  tbody.innerHTML = table;

  let deleteAllBtn = document.getElementById("deleteAll");
  if (prodList.length < 1) {
    deleteAllBtn.style.display = "none";
  } else {
    deleteAllBtn.style.display = "block";
    deleteAllBtn.setAttribute("value", `Delete All ( ${prodList.length} )`);
  }
}

// Delete a product
function deleteProd(i) {
  prodList.splice(i, 1);
  localStorage.products = JSON.stringify(prodList);
  showData();
}

// Submit button ( Create Or Update)
function submit(counter) {
  if (prodcode.value != "") {
    let btnValue = document.getElementById("create").getAttribute("value");
    console.log(btnValue);
    if (btnValue == "Add") {
      createProd(counter);
    } else if (btnValue == "Update") {
      submitUpdate(currUpdateBtn);
    }
  }
}

// Update a product
function updateProd(i) {
  currUpdateBtn = i;
  prodcode.value = prodList[i].prodcode;
  price.value = prodList[i].price;
  quantity.value = prodList[i].quantity;
  amount.value = prodList[i].amount;
  notes.value = prodList[i].notes;
  document.getElementById("create").setAttribute("value", "Update");
  document.getElementById("count").setAttribute("disabled", "true");
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
function submitUpdate(i) {
  prodList[i].prodcode = prodcode.value;
  prodList[i].price = price.value;
  prodList[i].taxes = quantity.value;
  prodList[i].amount = amount.value;
  prodList[i].notes = notes.value;
  localStorage.products = JSON.stringify(prodList);
  showData();
  document.getElementById("create").setAttribute("value", "Create");
  clearInput();
  document.getElementById("count").setAttribute("disabled", "false");
}

// Delete All
function deleteAll() {
  prodList = [];
  localStorage.products = JSON.stringify(prodList);
  showData();
  document.getElementById("create").setAttribute("value", "Add");
}

// Search
function searchName(id = searchedItem) {
  searchedItem = id;
  let table = ``;
  search.setAttribute("placeholder", `Search by ${id}`);
  for (let i = 0; i < prodList.length; i++) {
    if (prodList[i][id].toLowerCase().includes(search.value.toLowerCase())) {
      table += `           <tr>
                        <td>${i + 1}</td>
                        <td>${prodList[i].prodcode}</td>
                        <td>${prodList[i].price}</td>
                        <td>${prodList[i].quantity}</td>
                        <td>${prodList[i].amount}</td>
                        <td>${prodList[i].notes}</td>
                        <td><input onclick="updateProd(${i})" type="button" value="Update"></td>
                        <td><input onclick="deleteProd(${i})" type="button" value="Delete"></td>
                    </tr>`;
    } else {
      console.log("false");
    }
  }
  tbody.innerHTML = table;
}

showData();
