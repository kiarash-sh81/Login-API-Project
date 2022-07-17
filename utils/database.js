//* mongo db
const mongoose = require('mongoose');

//* connecting to database
mongoose.connect("mongodb://localhost/Login_API",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Connected to Database..."))
.catch(err=>console.log(err));