const { PasswordItem, passwordItemVlidation } = require('../models/passwordsModel');

const getLists = async (req, res, next) => {
    try {   
         const list = await PasswordItem.find({
            _userId: req.user_id
         })   
         return res.status(200).json({ count: list.length, list})
    } catch {
        return res.status(500).json({
            message: err.message
        })
    }
}

const createList = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        if(!name) {
            return res.status(403).send({
                message: 'Title is required'
            })
        }
        if(!password) {
            return res.status(403).send({
                message: 'Description is required'
            })
        }
        
        const newList = new PasswordItem({
            name,
            password,
            _userId: req.user_id
        })

        await newList
        .save()
        .then(listDoc => {
            res.status(200).send({
                message: 'List created successfully',
                listDoc
            })
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const updateList = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(id){
         await PasswordItem.findByIdAndUpdate({ _id: id, _userId: req.user_id }, {
            $set: req.body
         }).then((item) => {
            if(item !== null){
            return res.status(200).send({
                message: 'List is successfully update'
            })
        } else {
            return res.status(403).json({ message: 'There is no list with this id' });
        }
         }).catch(err => {
            return res.status(400).send({
                message: err
            })
         })
        } else {
            return res.status(403).json({ message: 'List was not updated' });
        }

    } catch (err) {
         res.status(500).json({
            message: err.message
        })
    }
}

const deleteList = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(id){
            await PasswordItem.findByIdAndDelete({ _id: id, _userId: req.user_id})
            .then((removedListDoc) => {
                if(removedListDoc !== null){
                    res.status(200).send({
                   message: 'List was successfully deleted',
                   removedListDoc
               })
                } else {
                    return res.status(403).json({ message: 'There is no list with this id' });
                }
            }).catch(err => {
                console.dir(err)
                return res.status(400).send({
                   message: 'List cannot be deleted'
               })
            })
           } else {
              return  res.status(403).json({ message: 'List was not updated' });
           }

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    getLists,
    createList,
    updateList,
    deleteList
}