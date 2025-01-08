window.onload = function() 
{
	var loggedInEmail = localStorage.getItem('emailUser1');
	if (loggedInEmail) 
	{
		document.getElementById('userEmail').textContent = loggedInEmail;
	} 
	else 
	{
		document.getElementById('userEmail').textContent = '未登录';
	}
};