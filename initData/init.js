const burgerListings = [
    {
        title: "Classic Beef Burger",
        ingredients: ["Beef Patty", "Lettuce", "Tomato", "Cheese", "Pickles"],
        price: 8.99,
        category: "beef",
        isAvailable: true,
        rating: 4.5,
        imageUrl: "https://t4.ftcdn.net/jpg/05/61/78/69/360_F_561786951_IdQbtR0bga3RzISgodGvIRMFEBqmjfcn.jpg",
        description: "A juicy beef burger with fresh lettuce, tomato, and cheese."
    },
    {
        title: "Spicy Chicken Burger",
        ingredients: ["Spicy Chicken Patty", "Lettuce", "Jalapeños", "Spicy Sauce"],
        price: 7.49,
        category: "chicken",
        isAvailable: true,
        rating: 4.2,
        imageUrl: "https://t4.ftcdn.net/jpg/05/61/78/69/360_F_561786951_IdQbtR0bga3RzISgodGvIRMFEBqmjfcn.jpg",
        description: "For those who like it hot! A spicy chicken burger with jalapeños and spicy sauce."
    },
    {
        title: "Veggie Delight",
        ingredients: ["Veggie Patty", "Lettuce", "Tomato", "Avocado", "Cheese"],
        price: 6.99,
        category: "vegetarian",
        isAvailable: true,
        rating: 4.0,
        imageUrl: "https://t4.ftcdn.net/jpg/05/61/78/69/360_F_561786951_IdQbtR0bga3RzISgodGvIRMFEBqmjfcn.jpg",
        description: "A delicious veggie burger packed with fresh vegetables and creamy avocado."
    },
    {
        title: "Vegan Garden Burger",
        ingredients: ["Vegan Patty", "Lettuce", "Tomato", "Vegan Cheese", "Onion"],
        price: 7.99,
        category: "vegan",
        isAvailable: false,
        rating: 3.8,
        imageUrl: "https://t4.ftcdn.net/jpg/05/61/78/69/360_F_561786951_IdQbtR0bga3RzISgodGvIRMFEBqmjfcn.jpg",

        description: "A tasty vegan burger made with a plant-based patty and vegan cheese."
    },
    {

        title: 'Schzewan Burger',
        price: 99,
        isAvailable: true,
        ingredients: [
            'Cheese',
            'Onion',
            'Schzewan',
            'Cheese',
            'Lettuce',
            'Potato Patie'
        ],
        category: 'vegetarian',
        rating: 5,
        imageUrl: 'https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg',
        description: 'A crispy burger.',
    },
    {
        title: "Cheesy Beef Bacon Burger",
        ingredients: ["Beef Patty", "Bacon", "Cheese", "Lettuce", "Tomato", "Onion"],
        price: 9.99,
        category: "beef",
        isAvailable: true,
        rating: 4.7,
        imageUrl: "https://t4.ftcdn.net/jpg/05/61/78/69/360_F_561786951_IdQbtR0bga3RzISgodGvIRMFEBqmjfcn.jpg",
        description: "A savory beef burger with crispy bacon and melted cheese."
    },
    {
        title: 'Patty Cheese Burger',
        ingredients: ['Lettuce', 'Tomato', 'Potato', 'Onion', 'Margreta Cheese'],
        price: '69',
        category: 'vegetarian',
        isAvailable: true,
        rating: 4.5,
        imageUrl: 'https://cdn.pixabay.com/photo/2024/04/26/05/52/cheeseburger-8721189_1280.png',
        description: 'Hot Cheesy burger with Patty'
    }
];


module.exports = { data: burgerListings };
