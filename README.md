# ⚡ Shock It !

**Shock It** is a shopping website where users can:  
- Register  
- Log in  
- Create shopping carts  
- Browse and add products by category

---

## 🧱 Project Structure

client/ Frontend (Angular)
server/ Backend (Node.js + Express + MongoDB)

## 🚀 How to Run the Project

### Prerequisites:
- Node.js installed on your computer  
- MongoDB running locally or in the cloud (for example, MongoDB Atlas)  
- Angular CLI installed globally (`npm install -g @angular/cli`)

---

### ✅ Backend (Server)

1. Open terminal and go to the server folder:
   ```bash
 ב
cd myServer
nodemon index

Main server dependencies:
body-parser@2.2.0
cors@2.8.5
express@5.1.0
mongoose@8.14.2
nodemon@3.1.10

### ✅ Frontend (Client - Angular)
cd UI-App
npm i
ng s -o


How to Use the App
-Register a new user via the UI

-Log in with your username and password

-Create a new shopping cart

-Browse products and add them to your cart

Sample Products Data for MongoDB
To add example products to your MongoDB database, insert the following documents into your products collection using MongoDB Compass or the Mongo shell:
db.products.insertMany([
  {
    _id: ObjectId("6847cf0076036b1a2621decf"),
    name: "Cashews",
    type: "Salted",
    price: 10,
    image: "cashews.jpg",
    description: "Salted cashews, a tasty and satisfying snack.",
    category: "nuts",
    stock: 25
  },
  {
    _id: ObjectId("6847cf0076036b1a2621ded0"),
    name: "Peanuts",
    type: "Roasted",
    price: 5,
    image: "peanuts.jpg",
    description: "Roasted peanuts, a classic snack for any occasion.",
    category: "nuts",
    stock: 25
  },
  {
    _id: ObjectId("6847cf0076036b1a2621ded1"),
    name: "Carrot",
    type: "Organic",
    price: 3,
    image: "carrot.jpg",
    description: "Fresh organic carrots, perfect for salads or cooking.",
    category: "vegetable",
    stock: 25
  },
  {
    _id: ObjectId("6847cf0076036b1a2621ded2"),
    name: "Tomato",
    type: "Roma",
    price: 6,
    image: "tomato.jpg",
    description: "Sweet and juicy Roma tomatoes, ideal for salads.",
    category: "vegetable",
    stock: 25
  },
  {
    _id: ObjectId("6847cf0076036b1a2621ded3"),
    name: "Cucumber",
    type: "Green",
    price: 4,
    image: "cucumber.jpg",
    description: "Crunchy and refreshing cucumbers, perfect for salads.",
    category: "vegetable",
    stock: 25
  }
])





