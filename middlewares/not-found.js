const notFound = (req,res)=>{

    res.status(404).send(`The Route doesnot exit`);
};

module.exports = notFound;