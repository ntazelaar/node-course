// Object property shorthand

const name = 'Nick'
const userAge = 37

const user = {
    name,
    age: userAge,
    location: 'The Hague'
}

console.log(user)

// Object destructuring

const product = {
    label: 'Crystall ball',
    price: 2000,
    stock: 5,
    salePrice: undefined,
    rating: 4.2
}

// const { label: productLabel, stock, rating = 5 } = product
// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)