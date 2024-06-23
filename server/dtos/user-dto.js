const createUserDto = (user) => {
    return {
        email: user.email,
        nickname: user.nickname,
        id: user.id,
        isActivated: user.isActivated
    }
}
module.exports = createUserDto;
