document.getElementById('registerButton').onclick = function() {
	event.preventDefault();  // 阻止 <a> 标签的默认行为
	var emailUser1 = document.getElementById("userInput3").value
	var pwdUser1 = document.getElementById("userInput4").value
	// 此处是输入正确的账号和密码
	if (emailUser1 === '' || pwdUser1 === '') {
		alert('请填写完整信息！');
	} else {
		alert('注册账号成功！')
		localStorage.setItem('emailUser1', emailUser1)
		localStorage.setItem('pwdUser1', pwdUser1)

		window.location.href = '登录.html';
	}
}
