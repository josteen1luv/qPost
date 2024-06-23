const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require("uuid");
const mailService = require("./mail-service");

const tokenService = require("./token-service");
const createUserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

const userService = {

    registration: async (email, password, nickname) => {
        const candidateEmail = await UserModel.findOne({where: {email}});
        if(candidateEmail){
            throw ApiError.BadRequest(`User with email ${email} already exists`);
        }
        const candidateNickname = await UserModel.findOne({where: {nickname}});
        if(candidateNickname){
            throw ApiError.BadRequest(`User with email ${nickname} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({nickname, email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = createUserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    },
    activation: async (activationLink) => {
        const user = await UserModel.findOne({ where: {activationLink}})
        if(!user){
            throw ApiError.BadRequest("Invalid activation link")
        }
        user.isActivated = true;
        await user.save();
    },
    login: async (email, password) => {
        const user = await UserModel.findOne({where: {email}});
        if(!user){
            throw ApiError.BadRequest(`Invalid login or password`);
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if(!isPasswordEqual){
            throw ApiError.BadRequest(`Invalid login or password`);
        }
        const userDto = createUserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    },
    logout:  async (refreshToken) => {
        await tokenService.removeToken(refreshToken);
    },
    refresh: async (refreshToken) => {
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findOne({where: {id: userData.id}});
        const userDto = createUserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    },
    getAllUsers: async () => {
        const users = await UserModel.findAll();
        return users.map(createUserDto);
    },
    getOneUser: async (nickname) => {
        const user = await UserModel.findOne({where: {nickname}});
        return createUserDto(user);
    }

}
module.exports = userService;