import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userService from '../user/user.service';
import config from '../../common/config';


const login = async(req, res) => {
    const {password, login} = req.body;

    const user = await userService.getByLogin(login);
    
    if (!user) {
        return res.status(403).send('Forbidend');
    };

    const isPasswordMatch = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatch) {
        return res.status(403).send('Forbidend');
    };

    jwt.sign(
        { userId : user.id, login: user.login },
        config.JWT_SECRET_KEY,
        (err, token) => {
          if (err) res.status(500).send(new Error(err));
    
          res.status(200).send(token)
        }
    );
};

const registration = async(req, res) => {
  const {name, login, password} = req.body;
  const result = await userService.create({name, login, password});
  res.code(201).send(result);
}


const verifyToken = (req, res, done) => {
    const {authorization} = req.headers
    
    if (!authorization) res.status(401).send('Unauthorized');

    const token = authorization.split(' ')[1];

    jwt.verify(token, config.JWT_SECRET_KEY, (err, decoded) => {
        
      if (err) {
        res.status(401).send('Unauthorized')
      }
  
      req.decoded = {
        userId: decoded.userId, 
      };
    });
  
    done();
  };

export default { login, verifyToken, registration }