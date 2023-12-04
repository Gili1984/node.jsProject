const { Toy } = require("../models/Toys.model");

//add toy to db
exports.addNewToy = async (req, res, next) => {
    const body = req.body;
    const userId = res.locals.userId;
    try {
        const newToy = new Toy(body);
        newToy.user_id = userId;
        //newToy.id = newTask._id;
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

//get toys from db
exports.getToys = async (req, res, next) => {
    try {
        // console.log(res.locals.userId);
        // const userId = res.locals.userId;
        const toys = await Toy.find({});
        res.send(toys);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
//search toy from db
exports.searchToy = async(req,res) => {
    const perPage = req.query.perPage || 10;
    const page = req.query.page || 1;
      try{
        const queryS = req.query.s;
        const searchReg = new RegExp(queryS,"i")
        // {$or:[{name:searchReg}, {manufacturer:searchReg},{info:searchReg}]}
        let data = await Toy.find({$or:[{name:searchReg},{info:searchReg}]})
       
     .limit(perPage)
        .skip((page - 1) * perPage)
        .sort({price:1})
        res.json(data);
      }
      catch(err){
        console.log(err);
        res.status(500).json({msg:"there error try again later",err})
      }
    }
//search by category toy from db
    exports.searchByCategory = async(req,res) => {
        const perPage = req.query.perPage || 10;
        const page = req.query.page || 1;
          try{
            const queryCat = req.params.catname;
            //const searchReg = new RegExp(queryCat,"i");
            let data = await Toy.find({category:queryCat})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({price:1})
            res.json(data);
          }
          catch(err){
            console.log(err);
            res.status(500).json({msg:"there error try again later",err})
          }
    }

//search by id toy from db
exports.getByIdToy = async(req,res) => {
 
      try{
        const paramId = req.params.idGet;
        //console.log(paramId);
        let data = await Toy.find({_id:paramId})
        res.json(data);
      }
      catch(err){
        console.log(err);
        res.status(500).json({msg:"there error try again later",err})
      }
}

    //function that check if the uaerId have that toyId
    async function owner (toyId, userId){
        //console.log(userId);
        let data=await Toy.findOne({_id:toyId});
        //console.log(data.user_id);
        if(data.user_id==userId){return true;}
        else {return false;}
    }

    //delete toy from db
    exports.deleteToy = async(req,res) => {
       
        const userId = res.locals.userId;
        try {
            const deleteId = req.params.idDel;
            console.log(await owner(deleteId,userId))
            if(owner(deleteId,userId)==true) {
            data = await Toy.deleteOne({_id:deleteId})
            res.status(201).send({data:"hi"});
        }
            else 
            res.status(201).send({data:"This toy belongs to another user so you cannot delete it."});
            //console.log("This toy belongs to another user so you cannot delete it.");
            
        } catch (error) {
            console.log(error);
            res.sendStatus(400);
        }
   
    }


//edit toy from db
    exports.editToy = async(req,res) => {
        const body = req.body;
        const userId = res.locals.userId;
        try {
            
            const editId = req.params.editId;
            data = await Toy.updateOne({_id:editId,user_id:userId},body)
            //await data.save();
            res.status(201).send(data);
        } catch (error) {
            console.log(error);
            res.sendStatus(400);
        }
   
    }


   