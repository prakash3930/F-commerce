const {app,DATA_BASE,mongoose,PORT} = require('./app');



// connect mongoose..

const connceMongoose = async()=>{
    try {
           await mongoose.connect(DATA_BASE);
            console.log('Successfully mongoose connected.');     
    } catch (err) {
        console.log(err);
    }
};

// server run ......

app.listen(PORT,async()=>{
        try {
            console.log(`server run successfully http://127.0.0.1:${PORT}`);
            await connceMongoose();         
        } catch (err) {
            console.log(err);
        }
});