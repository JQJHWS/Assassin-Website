let cart = [];

// 监听每个购买按钮的点击事件，将游戏添加到购物车
document.querySelectorAll('.buy-button').forEach(button => {
	button.addEventListener('click', function() {
		const gameItem = this.closest('.game-item'); // 获取当前游戏项
		const gameName = gameItem.getAttribute('data-game');
		const gamePrice = parseFloat(gameItem.getAttribute('data-price'));

		// 将选中的游戏添加到购物车数组
		cart.push({
			name: gameName,
			price: gamePrice
		});
		updateCart(); // 更新购物车显示
	});
});

// 更新购物车显示
function updateCart() {
	const cartTableBody = document.getElementById('cart-items');
	cartTableBody.innerHTML = ''; // 清空购物车内容

	if (cart.length > 0) {
		document.querySelector('.cart').style.display = 'block';
	} else {
		document.querySelector('.cart').style.display = 'none';
	}

	let total = 0;

	cart.forEach((item, index) => {
		total += item.price;

		const row = document.createElement('tr');
		row.innerHTML = `
            <td>${item.name}</td>
            <td>￥${item.price.toFixed(2)}</td>
            <td><button class="remove-item" data-index="${index}">移除</button></td>`;
		cartTableBody.appendChild(row);
	});

	// 更新总价
	const totalRow = document.createElement('tr');
	totalRow.innerHTML = `
        <td colspan="2" style="text-align:right;">总计：</td>
        <td>￥${total.toFixed(2)}</td>
    `;
	cartTableBody.appendChild(totalRow);
}

// 监听移除商品按钮
document.getElementById('cart-items').addEventListener('click', function(event) {
	if (event.target.classList.contains('remove-item')) {
		const index = event.target.getAttribute('data-index');
		cart.splice(index, 1); // 从购物车数组中移除对应的商品
		updateCart(); // 更新购物车视图
	}
});

// 监听结算按钮
document.getElementById('purchase-button').addEventListener('click', function() {
	if (cart.length > 0) {
		document.querySelector('.purchase-form').style.display = 'block';
	} else {
		alert('您的购物车是空的，无法结算！');
	}
});

// 生成账单
document.getElementById('generate-invoice').addEventListener('click', function() {
	const name = document.getElementById('name').value;
	const address = document.getElementById('address').value;

	// 检查姓名和地址是否为空
	if (name.trim() === '' || address.trim() === '') {
		alert('请填写所有必填项！');
		return;
	}

	// 生成账单信息
	let invoiceDetails =
		`<strong>用户信息：</strong><br>姓名: ${name}<br>地址: ${address}<br><br><strong>购买的商品：</strong><br>`;
	let totalAmount = 0;

	// 计算所有商品的总价并生成账单内容
	cart.forEach(item => {
		invoiceDetails += `${item.name} - ￥${item.price.toFixed(2)}<br>`;
		totalAmount += item.price;
	});

	invoiceDetails += `<br><strong>总计: ￥${totalAmount.toFixed(2)}</strong>`;

	// 显示账单
	document.getElementById('invoice-details').innerHTML = invoiceDetails;

	// 清空购物车，并更新购物车视图
	cart = []; // 清空购物车
	updateCart(); // 更新购物车显示
});
document.addEventListener('DOMContentLoaded', function() {
    const gameList = document.querySelectorAll('.game-list li'); // 游戏名称列表
    const gameImagesContainer = document.querySelector('.game-images'); // 游戏图片容器
    const prevButton = document.querySelector('.prev-btn'); // 上一张按钮
    const nextButton = document.querySelector('.next-btn'); // 下一张按钮
    const indicatorContainer = document.querySelector('.indicator-container'); // 指示器容器
    let currentImageIndex = 0; // 当前显示的图片索引
    let currentGame = 'game1'; // 当前选中的游戏

    // 游戏名称对应的图片列表
    const gameImagesMap = {
        'game1': ['./image/社区游戏图片1.png', './image/商城图片-不羁联盟1.png', './image/商城图片-不羁联盟2.png', './image/商城图片-不羁联盟3.png'],
        'game2': ['./image/社区游戏图片2.png', './image/商城图片-彩虹六号：围攻1.png', './image/商城图片-彩虹六号：围攻2.png', './image/商城图片-彩虹六号：围攻3.png'],
        'game3': ['./image/社区游戏图片3.png', './image/商城图片-碧海黑帆1.png', './image/商城图片-碧海黑帆2.png', './image/商城图片-碧海黑帆3.png'],
        'game4': ['./image/社区游戏图片4.png', './image/商城图片-波斯王子：失落的王冠1.png', './image/商城图片-波斯王子：失落的王冠2.png', './image/商城图片-波斯王子：失落的王冠3.png'],
        'game5': ['./image/社区游戏图片5.png', './image/商城图片-阿凡达：潘多拉边境1.png', './image/商城图片-阿凡达：潘多拉边境2.png', './image/商城图片-阿凡达：潘多拉边境3.png'],
        'game6': ['./image/社区游戏图片6.png', './image/商城图片-刺客信条：幻景1.png', './image/商城图片-刺客信条：幻景2.png', './image/商城图片-刺客信条：幻景3.png'],
        'game7': ['./image/社区游戏图片7.png', './image/商城图片-飙酷车神：轰鸣盛典1.png', './image/商城图片-飙酷车神：轰鸣盛典2.png', './image/商城图片-飙酷车神：轰鸣盛典3.png'],
        'game8': ['./image/社区游戏图片8.png', './image/商城图片-全境封锁21.png', './image/商城图片-全境封锁22.png', './image/商城图片-全境封锁23.png']
    };

    // 显示当前游戏的图片
    function showGameImages(game) {
        const images = gameImagesMap[game];
        gameImagesContainer.innerHTML = ''; // 清空当前的图片容器

        images.forEach((imageSrc, index) => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.classList.add('image');
            gameImagesContainer.appendChild(img);
        });

        currentGame = game;
        currentImageIndex = 0; // 默认显示第一张图片
        updateIndicators(); // 更新指示器
        updateActiveImage(); // 更新当前图片的显示
    }

    // 更新指示器
    function updateIndicators() {
        indicatorContainer.innerHTML = ''; // 清空现有的指示器
        const images = gameImagesMap[currentGame];

        // 为每张图片添加一个指示器
        images.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (index === currentImageIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => changeImage(index));
            indicatorContainer.appendChild(indicator);
        });
    }

    // 更新当前显示的图片
    function updateActiveImage() {
        const allImages = gameImagesContainer.querySelectorAll('img');
        allImages.forEach((img, index) => {
            img.classList.remove('active');
            if (index === currentImageIndex) {
                img.classList.add('active');
            }
        });
    }

    // 切换到下一张图片
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % 4; // 循环切换
        updateActiveImage(); // 更新当前显示的图片
        updateIndicators(); // 更新指示器
    }

    // 切换到上一张图片
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + 4) % 4; // 循环切换
        updateActiveImage(); // 更新当前显示的图片
        updateIndicators(); // 更新指示器
    }

    // 鼠标悬停游戏名称时显示对应图片
    gameList.forEach(game => {
        game.addEventListener('mouseover', () => {
            showGameImages(game.dataset.game);
        });
    });

    // 绑定切换图片的按钮事件
    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);

    // 默认显示第一个游戏的图片
    showGameImages('game1');
});



// 商店
let currentSlide = 0;

// 获取游戏容器和按钮
const gameSlider = document.querySelector('.game-slider');
const gameRow = document.querySelector('.game-row');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

// 获取游戏项的数量
const totalItems = document.querySelectorAll('.game-item').length;
const itemsToShow = 4; // 每次显示4个游戏项

// 获取每个游戏项的宽度，注意要加上 `margin-right`
const itemWidth = gameRow.querySelector('.game-item').getBoundingClientRect().width;
const itemMargin = parseInt(window.getComputedStyle(gameRow.querySelector('.game-item')).marginRight, 10);

// 设置过渡效果
gameSlider.style.transition = 'transform 0.5s ease';

// 监听右箭头点击事件
rightBtn.addEventListener('click', function() {
	if (currentSlide < totalItems - itemsToShow) {
		currentSlide++;
	} else {
		currentSlide = 0; // 如果到达最后一个，回到第一个
	}
	// 计算并设置滑动的距离
	const slideDistance = currentSlide * (itemWidth + itemMargin) + 10;
	gameSlider.style.transform = `translateX(-${slideDistance}px)`;
});

// 监听左箭头点击事件
leftBtn.addEventListener('click', function() {
	if (currentSlide > 0) {
		currentSlide--;
	} else {
		currentSlide = totalItems - itemsToShow; // 如果到达第一个，回到最后一个
	}
	// 计算并设置滑动的距离
	const slideDistance = currentSlide * (itemWidth + itemMargin);
	gameSlider.style.transform = `translateX(-${slideDistance}px)`;
});