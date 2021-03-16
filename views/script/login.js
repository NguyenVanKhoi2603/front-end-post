$("#btn-login").click(function () {
    var username = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    $.ajax({
        method: "POST",
        url: "http://localhost:3001/login",
        data: { username: username, password: password },
    }).done(function (msg) {
        if (msg.login) {
            alert("Notification: " + msg.message);
            localStorage.setItem("token", msg.accessToken);
            localStorage.setItem("username", username);
            window.location.href = "/index.html";
        } else {
            alert("Notification: " + msg.message);
            localStorage.removeItem("token");
            localStorage.removeItem("username");
        }
    });
    return false;
});
