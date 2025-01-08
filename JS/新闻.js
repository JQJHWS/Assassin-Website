function searchNews() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const newsList = document.getElementById('newsList');
    const newsItems = newsList.getElementsByTagName('li');

    // 遍历所有新闻条目，根据关键词进行筛选
    for (let i = 0; i < newsItems.length; i++) {
        const title = newsItems[i].querySelector('div').textContent.toLowerCase();
        const content = newsItems[i].querySelector('p').textContent.toLowerCase();

        // 如果标题或内容包含关键词，则显示该新闻条目，否则隐藏
        if (title.includes(searchInput) || content.includes(searchInput)) {
            newsItems[i].classList.remove('hidden');
        } else {
            newsItems[i].classList.add('hidden');
        }
    }
}

// 轮播图
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // 更新轮播图显示
    const updateCarousel = () => {
        // 通过改变 carousel 容器的 transform 来实现平滑滑动
        const carousel = document.querySelector('.carousel');
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');  // 高亮当前圆点
            } else {
                indicator.classList.remove('active'); // 移除非当前圆点的高亮
            }
        });
    };

    // 点击下一张
    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;  // 循环到第一张
        updateCarousel();
    });

    // 点击上一张
    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;  // 循环到最后一张
        updateCarousel();
    });

    // 自动切换幻灯片
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;  // 每5秒切换
        updateCarousel();
    }, 5000); // 每 5 秒切换一次

    // 初始化显示第一张幻灯片
    updateCarousel();
});
