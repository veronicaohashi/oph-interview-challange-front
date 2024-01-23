let personId;
async function fetchFinancialStatement() {
    try {
      console.log(personId)

        var requestData = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },     
      }
      
      const response = await fetch(`http://localhost:8080/financial-statements?personId=${personId}`, requestData);

      if (response.status === 500) {
          console.error('Statement not found (404)');
          handleStatementNotFound()
      } else {
        const data = await response.json();
        renderTransactions(data)
      }
    } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

function handleStatementNotFound() {
    document.getElementById('card-current-balance').textContent = '£ 0.00';
    document.getElementById('card-total-incomes').textContent = '£ 0.00';
    document.getElementById('card-total-expenditures').textContent = '£ 0.00';

    var tableBody = document.querySelector('#transactions-table tbody');
    tableBody.innerHTML = '';
    var row = tableBody.insertRow()
    var singleCell = row.insertCell(0)
    singleCell.classList.add('whitespace-nowrap','px-6','py-4')
    singleCell.colSpan = "3"
    singleCell.textContent = "Nothing to display"
}

function renderTransactions(transactions) {
    document.getElementById('card-current-rating').textContent = `${transactions.rating}`;
    document.getElementById('card-current-balance').textContent = `£ ${transactions.balance}`;
    document.getElementById('card-total-incomes').textContent = `£ ${transactions.totalIncome}`;
    document.getElementById('card-total-expenditures').textContent = `£ ${transactions.totalExpenditure}`;

    var tableBody = document.querySelector('#transactions-table tbody');
    tableBody.innerHTML = '';

    transactions.transactions.forEach(function (item, index) {
      var row = tableBody.insertRow();

      var date = row.insertCell(0);
      date.textContent = item.date;
      date.classList.add('whitespace-nowrap','px-6','py-4', 'text-left')

      var description = row.insertCell(1);
      description.textContent = item.description;
      description.classList.add('whitespace-nowrap','px-6','py-4', 'text-left')

      var amount = row.insertCell(2);
      amount.classList.add('whitespace-nowrap','px-6','py-4', 'text-left')
      console.log(item)
      if(item.type === 'income') {
        amount.classList.add('text-green-700')
        amount.textContent = '£ ' + item.amount;
      } else {
        amount.classList.add('text-red-700')
        amount.textContent = '£ -' + item.amount;
      }
    });
  }

document.getElementById('btn-redirect-form').addEventListener('click', function() {
    window.location.href = 'form.html?personId=' + encodeURIComponent(personId);
});

document.addEventListener('DOMContentLoaded', function() {
    personId = new URLSearchParams(window.location.search).get('personId');
    if (personId) {
      fetchFinancialStatement();
  } else {
      console.error('Parameter "personId" not found');
  }
});

  