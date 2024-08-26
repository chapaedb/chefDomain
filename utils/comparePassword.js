const bcryptjs = require('bcryptjs');

const comparePassword = async (password, hashed)=>{
    return await bcryptjs.compare(password, hashed);
}

module.exports = comparePassword;