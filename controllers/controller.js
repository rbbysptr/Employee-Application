const {Employee} = require("../models");

class Controller{
    static async readEmployee(req, res) {
        try {
            let { order, sort } = req.query;
            let options = {};
            
            if (order === 'BachelorDegree') {
                options.where = { education: 'Bachelor Degree' };
            } else if (order === 'MasterDegree') {
                options.where = { education: 'Master Degree' };
            }
    
            if (sort === 'asc') {
                options.order = [['name', 'ASC']];
            } else if (sort === 'desc') {
                options.order = [['position', 'DESC']];
            }

            let data = await Employee.findAll(options);
            res.render('home', { data });
        } catch (error) {
            res.send(error)
        }
    }
    static async getAdd(req,res){
        try {
            res.render('getAddForm');
        } catch (error) {
            res.send(error)
        }
    }
    static async postAdd(req, res) {
        try {
            let {name,position,education,email,phone_number,profile_picture,age} = req.body
            await Employee.create({ name, position, education, email, phone_number, profile_picture, age });
            res.redirect('/');
        } catch (error) {
            res.send(error)
        }
    }
    static async getEdit(req, res) {
        try {
            let id = req.params.id;
            let data = await Employee.findByPk(id);
            res.render('getEditForm', { data });
        } catch (error) {
            res.send(error)
        }
    }
    static async postEdit(req, res) {
        try {
            let id = req.params.id;
            let { name, position, education, email, phone_number, profile_picture, age } = req.body
            await Employee.update({
                name: name,
                position: position,
                education: education,
                email: email,
                phone_number: phone_number,
                profile_picture: profile_picture,
                age: age
            }, {
                where: {
                    id: id
                }
            });
            res.redirect('/');
        } catch (error) {
            res.send(error)
        }
    }
    static async delete(req, res) {
        try {
            let id = req.params.id;
            await Employee.destroy({
                where: {
                    id: id
                }
            });
            res.redirect('/')
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;