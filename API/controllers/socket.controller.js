var socket = require('socket.io');
// const waitingPatientsController = require('./waitingPatient.controller');
// const patientsController = require('./patients.controller');
// const pollsController = require('./polls.controller');
// const roomsController = require('./rooms.controller');

class Io {
    constructor(httpServer, options) {
        this.httpServer = httpServer;
        this.options = options;
        this.io = socket(this.httpServer, this.options);
    }

    init() {
        this.io.on('connection', async (socket) => {
            console.log(`A user connect to server with id: ${socket.id}`)
            socket.join("waiting_patients");
            socket.join("patients");
            socket.join("polls");
            socket.join("rooms");
            socket.join("users")

            //users
            socket.on('users:nurses:update', (data) => {
                console.log(`id: ${socket.id} just emit to channel users:nurses:update`);
                socket.to('users').emit('users:nurses:update', data);
            })

            socket.on('users:doctors:update', (data) => {
                console.log(`id: ${socket.id} just emit to channel users:doctors:update`);
                socket.to('users').emit('users:doctors:update', data);
            })

            // Waiting patient
            socket.on('waiting_patients:get_all', (values) => {
                console.log(`id: ${socket.id} just emit to channel waiting_patients:get_all`, values);
                socket.to('waiting_patients').emit('waiting_patients:get_all', values);
            })

            socket.on('waiting_patients:create', (values) => {
                console.log(`id: ${socket.id} just emit to channel waiting_patients:create`, values);
                socket.to('waiting_patients').emit('waiting_patients:get_all', values);
            })

            socket.on('waiting_patients:selected', (values) => {
                console.log(`id: ${socket.id} just emit to channel waiting_patients:selected`, values);
                socket.to('waiting_patients').emit('waiting_patients:selected', values);
            })

            socket.on('waiting_patients:finished', (values) => {
                console.log(`id: ${socket.id} just emit to channel waiting_patients:finished`);
                socket.to('waiting_patients').emit('waiting_patients:finished', values);
            })

            // Polls
            socket.on('polls:create', (values) => {
                console.log(`id: ${socket.id} just emit to channel polls:create`, values);
                socket.to('polls').emit('polls:create', values)
            })

            socket.on('polls:update', (values) => {
                console.log(`id: ${socket.id} just emit to channel polls:update`, values);
                socket.to('polls').emit('polls:update', values);
            })

            socket.on('polls:processed', values => {
                console.log(`id: ${socket.id} just emit to channel polls:processed`, values);
                socket.to('polls').emit('polls:processed', values)
            })

            // Rooms
            socket.on('rooms:update', (values) => {
                console.log(`id: ${socket.id} just emit to channel rooms:update`, values);
                socket.to('rooms').emit('rooms:update', values)
            })

            socket.on('rooms:create', (values) => {
                console.log(`id: ${socket.id} just emit to channel rooms:create`, values);
                socket.to('rooms').emit('rooms:create', values)
            })

            //Patients
            socket.on('patients:add_new_un_room', (values) => {
                console.log(`id: ${socket.id} just emit to channel patients:add_new_un_room`, values);
                socket.to('patients').emit('patients:add_new_un_room', values);
            })

            socket.on('patients:add_room', (values) => {
                console.log(`id: ${socket.id} just emit to channel patients:add_room`, values);
                socket.to('patients').emit('patients:add_room', values)
            })

            // socket.on('patients:out_room', (values) => {
            //     console.log(`id: ${socket.id} just emit to channel patients:out_room`, values);
            //     return patientsController.updateOne(values)
            //         .then(res => {
            //             console.log(`res in patients:out_room: ${res}`);
            //             socket.to('patients').emit('patients:out_room', res)
            //         })
            //         .catch(err => console.log(err));
            // })

            socket.on('patients:finished', values => {
                console.log(`id: ${socket.id} just emit to channel patients:finished`, values);
                socket.to('patients').emit('patients:finished', values)
            })

            socket.on('patients:normal_update', values => {
                console.log(`id: ${socket.id} just emit to channel patients:normal_update`, values);
                socket.to('patients').emit('patients:normal_update', values)
            })

            socket.on('disconnect', () => {
                console.log(`User disconnected with id : ${socket.id}`);
            })
        })
    }

}

module.exports = (httpServer, options) => {
    return new Io(httpServer, options);
}; 