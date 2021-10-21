const { ApolloServer, gql } = require("apollo-server");

// スキーマとエンドポイントを定義
const typeDefs = gql`
  type Book {
    id: Int
    title: String
    author: String
  }
  
  type Query {
    books(id: Int): [Book]
    booksAll(id: Int): [Book]
  }
`;

// クエリで取得するデータを定数で置いておく
const books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets 22",
    author: "J.K. Rowling"
  },
  {
    id: 2,
    title: "Jurassic Park",
    author: "Michael Crishton"
  }
];

// booksクエリ発行時の処理を指定する
const resolvers = {
  Query: {
    // books: () => books
    books: (obj, args, context, info) => {
      console.log(args);
      id = args['id']
      res = books.filter(e => e.id == id)
      return res
    },
    booksAll: (obj, args, context, info) => {
      console.log(args);
      return books
    }

  }
};

// サーバーを起動する
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});



