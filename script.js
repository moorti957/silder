const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


function updateSubtotals() {
    let rows = document.querySelectorAll("tbody tr");
    let total = 0;

    rows.forEach(row => {
        const price = parseFloat(row.querySelectorAll("td")[3].innerText.replace('$', ''));
        const qtyInput = row.querySelector("input");
        const quantity = parseInt(qtyInput.value);
        const subtotalCell = row.querySelectorAll("td")[5];

        const subtotal = price * quantity;
        subtotalCell.innerText = `$${subtotal.toFixed(2)}`;
        total += subtotal;

        // Update total on quantity change
        qtyInput.addEventListener("input", () => {
            updateSubtotals();
        });
    });

    document.querySelector("#subtotal table tr td:last-child").innerText = `$${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    updateSubtotals();
});



document.querySelector(".btn-success").addEventListener("click", () => {
    alert("Thank you for your purchase!");
    // You can also redirect to a payment page
    // window.location.href = "payment.html";
});
// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    const rows = document.querySelectorAll("#card tbody tr");
    const subtotalDisplay = document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)");
    const totalDisplay = document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)");

    function updateTotals() {
        let total = 0;

        rows.forEach((row, index) => {
            const priceText = row.children[3].innerText.replace('$', '');
            const price = parseFloat(priceText);
            const quantity = parseInt(row.querySelector('input[type="number"]').value);
            const itemSubtotal = price * quantity;

            row.children[5].innerText = `$${itemSubtotal.toFixed(2)}`;
            total += itemSubtotal;
        });

        subtotalDisplay.innerText = `$${total.toFixed(2)}`;
        totalDisplay.innerText = `$${total.toFixed(2)}`;
    }

    quantityInputs.forEach(input => {
        input.addEventListener("change", updateTotals);
    });

    // Run once on load
    updateTotals();
});
