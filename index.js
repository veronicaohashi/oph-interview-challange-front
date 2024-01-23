document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const personId = document.getElementById('personId').value;


    window.location.href = 'list.html?personId=' + encodeURIComponent(personId);
  });