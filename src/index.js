
import '../Loadenv/index.js'
import app from './app.js'
import ConnectDB from '../DB/index.js'


ConnectDB()

.then( () =>{
    app.listen(process.env.PORT || 8000, () => {
    console.log(`Our server is listening on port : ${process.env.PORT}`)
})
})
.catch( (err) =>{
    console.log(err);
    throw err
})
