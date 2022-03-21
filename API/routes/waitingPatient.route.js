'use strict';
const express = require('express');
const router = express.Router();
const config = require('config');
const redisClient = require('../helpers/redis.helper')
const waitingPatientController = require('../controllers/waitingPatient.controller')

class Router {
    registerRouter() {

        router.get('/get-by-selected', (req, res) => {
            return waitingPatientController.getBySelected()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => console.log(err));
        })

        router.get('/selected/:id', (req, res) => {
            return waitingPatientController.selected(req.params.id)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => console.log(err));
        })

        router.put('/finished', (req, res) => {
            return waitingPatientController.finished(req.body)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => console.log(err));
        })

        router.post('/create', (req, res) => {
            return waitingPatientController.create(req.body)
                .then(result => {
                    return res.status(200).json(result);
                })
                .catch(err => console.log(err));
        })

        router.get('/get-one/:id', (req, res) => {
            return waitingPatientController.getById(req.params.id)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => console.log(err));
        })

        //only doctor
        router.get('/check-phone/:phone', (req, res) => {
            return waitingPatientController.checkPhoneNumber(req.params.phone)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => console.log(err))
        })

        router.put('/update', (req, res) => {
            if (!res.locals.role) {
                return res.status(401).json({ message: 'token_not_valid' });
            } else
                if (res.locals.role === config.role.DOCTOR) {
                    return waitingPatientController.update(req.params.id, req.body)
                        .then(result => {
                            // console.log(result)
                            res.status(200).json(result);
                        })
                        .catch(err => console.log(err))
                }
                else {
                    return res.status(403).json({ message: 'Forbidden' });
                }
        })

        router.get('/get-by-phone/:phone', (req, res) => {
            return waitingPatientController.getByPhone(req.params.phone)
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        })

        router.get('/', (req, res) => {
            return waitingPatientController.getAll()
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => console.log(err));
        });

        return router;
    }
}

module.exports = new Router().registerRouter();