document.getElementById('loginButton').onclick = function() {
	event.preventDefault();  // 阻止 <a> 标签的默认行为
	var email = document.getElementById("userInput1").value
	var password = document.getElementById("userInput2").value

	var emailUser2 = localStorage.getItem('emailUser1')
	var pwdUser2 = localStorage.getItem('pwdUser1')

	if (email !== emailUser2 || password !== pwdUser2) {
		alert('邮箱或密码错误！');
	} else {
		alert('登录成功')
		window.location.href = '社区.html';
	}

}