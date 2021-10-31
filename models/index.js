const Post = require('./Post');
const User = require('./User');

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

