const isAdmin = (req, res, next)=>{

    try{
        if(req.user.role === true){
            next()
        }
    }
    catch{
        res.status(401).json("Access denied")
    }

    
}
module.exports = isAdmin;