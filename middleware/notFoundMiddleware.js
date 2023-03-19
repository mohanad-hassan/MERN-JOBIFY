const notFoundMiddleware = 
(req,res) => { 
res.status(404).send("ROUTE IS NOT EXIST ")
 }

 export default notFoundMiddleware