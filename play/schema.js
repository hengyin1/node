const { buildSchema } = require('graphql');
const fs = require('fs');

const schema = buildSchema(fs.readFileSync(__dirname + '/schema/comment.gql', 'utf-8'));

console.log(schema);



