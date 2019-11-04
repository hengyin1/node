const { buildSchema } = require('graphql');
const fs = require('fs');
const commentClient = require('./rpc-client/comment-client');
const praiseClient = require('./rpc-client/praise-client');

// const schema = buildSchema(fs.readFileSync(__dirname + '/schema/comment.gql', 'utf-8'));
const schema = buildSchema(`
  type Comment {
    id: Int,
    avatar: String,
    name: String,
    isTop: Boolean,
    content: String,
    publishDate: String,
    commentNum: Int,
    praiseNum: Int,
  }

  type Query {
    comment: [Comment]
  }

  type Mutation {
    praise(id: Int): Int
  }
`);

const mockdata = {
  1: {
      id: 1,
      avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
      name: '僵尸浩',
      isTop: true,
      content: '哈哈哈哈',
      publishDate: '今天',
      commentNum: 10,
      praiseNum: 5
  },
  2: {
      id: 2,
      avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
      name: '极客主编',
      isTop: true,
      content: '我来送大礼了！！',
      publishDate: '上周',
      commentNum: 10,
      praiseNum: 2
  },
  3: {
      id: 3,
      avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
      name: '极客老板',
      isTop: true,
      content: '我来发股票了！！！',
      publishDate: '十年前',
      commentNum: 10,
      praiseNum: 0
  }
}

const rootValue = {
  comment: () => {
    return Object.keys(mockdata).map(key => mockdata[key]);
  },
  praise: ({ id }) => {
    mockdata[id].praiseNum += 1;
    return mockdata[id].praiseNum;
  }
};

module.exports = { 
  schema, 
  rootValue 
}



