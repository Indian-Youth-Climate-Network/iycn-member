if (localStorage.token === undefined || localStorage.user_id === undefined) {
  $("#login_me").click(function() {
    let username = $("#login_username").val();
    let pwd = $("#login_pwd").val();

    if (username === "" || pwd === "") {
      $("#error_login").css("display", "block");
      return false;
    }

    $.post({
      url: `${BASE}/api-token-auth/`,
      data: {
        username: username,
        password: pwd
      },
      success: function(data, status) {
        $("#success_login").css("display", "block");
        $("#error_login").css("display", "none");
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user_id", data.data.user_id);
        window.location = "/profile.html"
      },
      error: function(data, status, error) {
        $("#error_login").css("display", "block");
      }
    });
  });
} else {
  window.location = "/profile.html";
}
