const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello From NODE API');
});

//get product
app.get('/api/products', async (req,res) =>{
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
}
)

//get product by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } =  req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
    
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
})


//Create product post
app.post('/api/products', async (req, res) => {
    try {
        
        const product = await Product.create(req.body);
        res.status(201).json(product); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update product
app.put('/api/products/:id', async (req, res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product){
      return res.status(404).json({message: "Product not found"}); 
    }

      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json(updatedProduct);
    
  }
})

//Delete a product 

app.delete('./api/products/:id'), async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    
    if(!Product){
      return res.status(404).json({message: "Product not Found"});
    }
  
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

//connect DB
mongoose.connect("mongodb+srv://enzonoriega:bNLn1Ids0Z2pvC6K@backenddb.e6tql.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected to the DB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.error("Connection Failed", error.message);
    });
