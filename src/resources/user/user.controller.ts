import usersService from './user.service';

const getUsers = async (_, res) => {
    const users = usersService.getAll();
    res.send(users);
};

const getUser = async (req, res) => {
    const {userId} = req.decoded;
    const user = await usersService.getById(userId);
    if(!user) res.status(404)
    res.send(user);
};

const addUser = async (req, res) => {
    const {name, login, password} = req.body;
    const result = await usersService.create({name, login, password});
    res.code(201).send(result);
};

const updateUser = async (req, res) => {
    const {userId} = req.decoded;
    
    const {name, login, password} = req.body;
    const findUser = await usersService.getById(userId);
    if(!findUser) return res.status(404).send({message: `User ${userId} not found`});

    const result = await usersService.update({name, login, password}, userId)
    return res.send(result)
};

const deleteUser = async (req, res) => {
    const {userId} = req.decoded;

    const findUser = await usersService.getById(userId);
    if(!findUser) return res.status(404).send({message: `User ${userId} not found`});

    await usersService.remove(userId);

    return res.send({message: `User ${userId} has been removed`})
};

export {getUser, getUsers, addUser, updateUser, deleteUser};