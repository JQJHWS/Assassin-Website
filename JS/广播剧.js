document.addEventListener('DOMContentLoaded', function() {
    var dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        var menu = dropdown.querySelector('.dropdown-menu');
        var link = dropdown.querySelector('a');

        // 显示下拉菜单
        link.addEventListener('mouseover', function(event) {
            menu.classList.add('show'); // 添加show类来显示下拉菜单
        });

        // 隐藏下拉菜单
        var timeout; // 用于存储setTimeout的引用，以便稍后可以清除它
        dropdown.addEventListener('mouseleave', function(event) {
            timeout = setTimeout(() => {
                // 如果没有立即触发mouseenter事件，则隐藏下拉菜单
                if (!dropdown.matches(':hover') && !menu.matches(':hover')) {
                    menu.classList.remove('show'); // 移除show类来隐藏下拉菜单
                }
            }, 100); // 延迟时间可以根据需要调整，但应该与CSS中的transition时间相匹配

            // 如果鼠标移回下拉菜单或触发元素，则清除超时并停止隐藏操作
            const cancelHide = () => {
                clearTimeout(timeout); // 清除超时
                dropdown.removeEventListener('mouseenter', cancelHide);
                menu.removeEventListener('mouseenter', cancelHide);
            };

            dropdown.addEventListener('mouseenter', cancelHide);
            menu.addEventListener('mouseenter', cancelHide);
        });

        // 监听文档的点击事件，隐藏下拉菜单（如果点击发生在外部）
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target) && !menu.contains(event.target)) {
                menu.classList.remove('show'); // 移除show类来隐藏下拉菜单
            }
        });
    });
});
