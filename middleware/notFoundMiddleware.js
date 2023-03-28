const notFoundMiddleware = 
(req,res) => { 
res.status(404).send("ROUTE IS NOT EXISTSSS ")
 }

 export default notFoundMiddleware