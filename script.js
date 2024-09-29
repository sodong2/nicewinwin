const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active'); // 메뉴 열기
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active'); // 메뉴 닫기
    });
}



document.addEventListener('DOMContentLoaded', function() {
    // URL에서 상품 ID를 추출
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // JSON 파일에서 데이터를 가져오는 함수
    function fetchProductData() {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                const product = data.find(p => p.id === productId);
                if (product) {
                    displayProduct(product);
                } else {
                    document.getElementById('product-detail').innerHTML = '<p>상품 정보를 찾을 수 없습니다.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }

    // 상품 정보를 화면에 표시하는 함수
    function displayProduct(product) {
        document.getElementById('product-img').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-brand').textContent = product.brand;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = product.price;

        let stars = '';
        for (let i = 0; i < product.stars; i++) {
            stars += '<i class="fa fa-star"></i>';
        }
        document.getElementById('product-stars').innerHTML = stars;
    }

    // 상품 데이터 가져오기 호출
    fetchProductData();
});