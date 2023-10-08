document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const user = document.getElementById("txtUser").value;
    const password = document.getElementById("txtPassword").value;
    const statusLabel = document.getElementById("credentialsStatus")
    statusLabel.textContent = "";
    let credentialsStatus = '';
    const userData = {userValue:user,passwordValue:password};

    fetch("http://localhost:3030/verifier", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    })
    .then(serverRes => {
      if (serverRes.ok) {
        return serverRes.json();
      } else {
        throw new Error('Error en la solicitud al servidor');
      }
    })
    .then(data => {
      if(data.status){
      credentialsStatus = data.status;
      statusLabel.textContent = credentialsStatus;
      }else{

        document.cookie = "user="+encodeURIComponent(user);
        window.location.href = "src/pages/appList.html";
      }
    })
    .catch(err => {
      console.error(err);
    });
  });
});
