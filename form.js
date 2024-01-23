const transactions = []

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var form = event.target;
    var formData = new FormData(form);
    var entries = Object.fromEntries(formData)

    var tableBody = document.querySelector('#transactions-table tbody');
    tableBody.innerHTML = '';
    
    transactions.push({...entries, amount: Number(entries.amount)})

    transactions.forEach(function (item) {
      var row = tableBody.insertRow();

      var date = row.insertCell(0);
      date.textContent = item.date;
      date.classList.add('whitespace-nowrap','px-6','py-4', 'text-left')

      var description = row.insertCell(1);
      description.textContent = item.description;
      description.classList.add('whitespace-nowrap','px-6','py-4', 'text-left')

      var amount = row.insertCell(2);
      amount.classList.add('whitespace-nowrap','px-6','py-4', 'text-left')
      if(item.type === 'income') {
        amount.classList.add('text-green-700')
        amount.textContent = '£ ' + item.amount;
      } else {
        amount.classList.add('text-red-700')
        amount.textContent = '£ -' + item.amount;
      }

    });
    form.reset();
  });

  document.getElementById('save').addEventListener('click', function(event) {
    event.preventDefault();

    const personId = new URLSearchParams(window.location.search).get('personId');

    var requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            personId: personId,
            transactions
        }),     
    }

    fetch('http://localhost:8080/financial-statements',requestData)
    .then(response => response.json())
    .then(data => {
        console.log('Transaction saved:', data);
        window.location.href = 'list.html?personId=' + encodeURIComponent(personId);
    })
    .catch(error => {
        console.error('Error saving transaction:', error);
    });
  });
