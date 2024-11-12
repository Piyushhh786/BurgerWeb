let currentIndex = 0;

// Arrays for images and titles
const images = [
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://imgs.search.brave.com/cwXvORtcIJSUsj8TndeW6xNM7tjPNk9ywAgjIH83mws/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmFtaWx5Zm9vZG9u/dGhldGFibGUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA1L0NoZWRkYXIt/Y2hpY2tlbi1idXJn/ZXJzLTQtNjgweDY2/Mi5qcGc",
    "https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?t=st=1730480023~exp=1730483623~hmac=8948b7e0d426452f1fa26f8c64b18cc8b263fdeb3005350025d60cfb9f1d35df&w=360"
];

const titles = [
    "Delicious Cheesy Burger",
    "Delicious Cheesy with Chicken Burger",
    "Delicious Chicken Burger"
];

function currentSlide(index) {
    const imageContainer = document.getElementById('dish-image');
    const titleContainer = document.getElementById('dish-title');
    const dots = document.querySelectorAll('.dot');
    currentIndex = index - 1;

    // Update image source and title
    imageContainer.src = images[currentIndex];
    titleContainer.textContent = titles[currentIndex];

    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}
// let currentIndex = 0; 

function showSlide(index) {
    const dishTitle = document.getElementById('dish-title');
    const dishImage = document.getElementById('dish-image');
    const dots = document.querySelectorAll('.dot');

    dishTitle.textContent = slides[index].title;
    dishImage.src = slides[index].image;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds