const { ApolloServer, gql } = require('apollo-server')
const { buildSubgraphSchema } = require('@apollo/subgraph')

const typeDefs = gql`
  type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    username: String
  }
`

const resolvers = {
  Query: {
    me() {
      return { id: '1', username: '@ava' }
    },
  },
  User: {
    __resolveReference(user, { fetchUserById }) {
      return fetchUserById(user.id)
    },
  },
}

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
})

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
