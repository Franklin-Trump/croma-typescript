'use strict';
const db = require('../model');
const config = require('config');

class UserController {
    async getAll() {
        try {
            const result = await db.users.find({});
            return {
                message: 'success',
                data: result,
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    async getAllDoctors() {
        try {
            const result = await db.users.find({ role: 3 });
            return {
                message: 'success',
                data: result,
            }
        } catch (error) {
            console.log(error);
            return { message: error }
        }
    }

    async getAllNurses() {
        try {
            const result = await db.users.find({ role: 4 });
            return {
                message: 'success',
                data: result,
            }
        } catch (error) {
            console.log(error);
            return { message: error }
        }
    }

    async createUser(data) {
        try {
            const user = await db.users.findOne({ email: data.email });
            console.log('user in databases', user);
            if (user) {
                return { message: 'Email này đã được sử dụng!' };
            }

            if (Number(data.role) === config.role.DEAN) {
                const deans = await db.users.find({ role: config.role.DEAN });
                const deanOfPosition = deans.find(dean => dean.position === Number(data.position));
                if (deanOfPosition) {
                    switch (Number(data.position)) {
                        case 1: return { message: 'Khoa chấn thương đã có trưởng khoa!' };
                        case 2: return { message: 'Khoa hô hấp đã có trưởng khoa!' };
                        case 3: return { message: 'Khoa tim mạch đã có trưởng khoa!' };
                    }
                }
                else {
                    const result = await db.users.create(data);
                    return {
                        message: 'success',
                        data: result,
                    }
                }
            }
            else {
                const result = await db.users.create(data);
                // console.log('user', data);
                return {
                    message: 'success',
                    data: result,
                }
            }
        }
        catch (err) {
            console.log('err', err);
            return { message: err };
        }
    }

    async updateUser(data) {
        try {
            let result = null;
            let user = await db.users.findOne({ id: data.id });

            if (user) {
                result = await db.users.findOneAndUpdate({ id: data.id }, data, { new: true });
                return {
                    message: 'updated user',
                    data: result,
                }
            }
            else {
                return {
                    message: 'update error',
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(id) {
        try {
            await db.users.deleteOne({ id: id });
            return { message: 'success' }
        } catch (error) {
            console.log(error);
            return { message: 'Something wrong delete false', }
        }
    }

    async getById(id) {
        try {
            const result = await db.users.findOne({ id: id });
            if (result) {
                return {
                    message: 'success',
                    data: result,
                }
            }
            else return { message: 'error in get user by id' }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController();