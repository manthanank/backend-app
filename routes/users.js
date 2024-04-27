const express = require('express');
const Users = require('../models/users.js');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const controller = require('../controllers/users');

router.get('/users', controller.getUsers);

// get users request
// router.get('/users',(req,res,next) => {
//     Users.find({}).then((data) =>{
//         res.send(data);
//     }).catch(next);
// });

// router.get('/users', (req, res) => {
//     Users.find((err, doc) => {
//         if (err) {
//             console.log('Error While Getting' + err);
//         }
//         else {
//             res.send(doc);
//         }
//     })
// });

// get users by id request
// router.get('/users/:id', (req, res, next) => {
//     Users.findOne({ _id: req.params.id }).then((data) => {
//         res.send(data);
//     });
// });

router.get('/users/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Users.findById(req.params.id, (err, doc) =>{
            if (err) {
                console.log('Error While Getting by id' + err);
            }
            else {
                res.send(doc);
            }
        })
    }
    else {
        return res.status(400).send('No Users found with id ' + req.params.id);
    }
});

// post users request
// router.post('/users',(req,res,next) => {
//     Users.create(req.body).then((data) =>{
//         res.send(data);
//     }).catch(next);
// });

// router.post('/users', (req, res) => {
//     let users = new Users({
//         name: req.body.name,
//         age: req.body.age
//     })
//     users.save((err, doc) => {
//         if (err) {
//             console.log('Error While Posting' + err);
//         }
//         else {
//             res.send(doc);
//         }
//     });
// });

router.post('/users', async (req, res) => {
    try {
        let users = new Users({
            name: req.body.name,
            age: req.body.age
        });
        const doc = await users.save();
        res.send(doc);
    } catch (err) {
        console.log('Error While Posting', err);
        res.status(500).send('Internal Server Error');
    }
});

// update users by id request
// router.put('/users/:id', (req, res, next) => {
//     Users.findOneAndUpdate({ _id: req.params.id }, req.body).then((data) => {
//         Users.findOne({ _id: req.params.id }).then((data) => {
//             res.send(data);
//         });
//     });
// });

// router.put('/users/:id', (req, res) => {
//     if (ObjectId.isValid(req.params.id)) {
//         let users = {
//             name: req.body.name,
//             age: req.body.age
//         }

//         Users.findByIdAndUpdate(req.params.id, {$set: users}, {new: true}, (err, doc) =>{
//             if (err) {
//                 console.log('Error While Updating by id' + err);
//             }
//             else {
//                 res.send(doc);
//             }
//         })
//     }
//     else {
//         return res.status(400).send('No Users found with id ' + req.params.id);
//     }
// });

router.put('/users/:id', async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            let users = {
                name: req.body.name,
                age: req.body.age
            }

            const doc = await Users.findByIdAndUpdate(req.params.id, {$set: users}, {new: true});
            if (doc) {
                res.send(doc);
            } else {
                res.status(404).send('No Users found with id ' + req.params.id);
            }
        } else {
            res.status(400).send('Invalid id format');
        }
    } catch (err) {
        console.log('Error While Updating by id', err);
        res.status(500).send('Internal Server Error');
    }
});

// delete users by id request
// router.delete('/users/:id', (req, res, next) => {
//     Users.findOneAndDelete({ _id: req.params.id }).then((data) => {
//         res.send(data);
//     });
// });

// router.delete('/users/:id', (req, res) => {
//     if (ObjectId.isValid(req.params.id)) {
//         Users.findByIdAndDelete(req.params.id, (err, doc) =>{
//             if (err) {
//                 console.log('Error While Deleting by id' + err);
//             }
//             else {
//                 res.send(doc);
//             }
//         })
//     }
//     else {
//         return res.status(400).send('No Users found with id ' + req.params.id);
//     }
// });

router.delete('/users/:id', async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const doc = await Users.findByIdAndDelete(req.params.id);
            if (doc) {
                res.send(doc);
            } else {
                res.status(404).send('No Users found with id ' + req.params.id);
            }
        } else {
            res.status(400).send('Invalid id format');
        }
    } catch (err) {
        console.log('Error While Deleting by id', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;