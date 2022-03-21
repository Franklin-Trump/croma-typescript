'use strict';
const express = require('express');
const router = express.Router();
const config = require('config');
// const redis = require('../helpers/redis.helper');
const pollsController = require('../controllers/polls.controller');

class Router {
    registerRouter() {

        router.get('/new', (req, res) => {
            return pollsController.getNewPolls()
                .then(result => {
                    // console.log(result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        router.get('/', (req, res) => {
            return pollsController.getAll()
                .then(result => {
                    // console.log(result)
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        });

        router.post('/create', (req, res) => {
            console.log('create new poll', req.body);
            if (res.locals.role === config.role.ADMIN) {
                return pollsController.createOne(req.body)
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => console.log(err));
            }
            else res.status(403).json({ message: 'Bạn không có quyền thực hiện chức năng này!' })
        })

        router.put('/update', (req, res) => {
            console.log('update poll', req.body);
            if (res.locals.role === config.role.ADMIN || res.locals.role === config.role.DEAN) {
                return pollsController.updateOne(req.body)
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => console.log(err));
            }
            else res.status(403).json({ message: 'Bạn không có quyền thực hiện chức năng này!' })
        })

        router.delete('/delete/:id', (req, res) => {
            console.log(`update poll id ${req.params.id}`);
            return pollsController.updateOne(req.params.id)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        return router;
    }
}

module.exports = new Router().registerRouter();