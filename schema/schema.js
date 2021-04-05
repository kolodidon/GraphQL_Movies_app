const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const movies = [
    { id: '1', name: 'Willy\'s Wonderland', genre: 'Horror' },
    { id: '2', name: 'Twist', genre: 'Criminal' },
    { id: '3', name: 'Fear of Rain', genre: 'Thriller' },
    { id: '4', name: 'Bliss', genre: 'Drama' },
    { id: '5', name: 'The Dig', genre: 'History' }
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const Query = new GraphQLObjectType({
	name: 'Query',
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return movies.find(movie => movie.id === args.id)
            }
        }
    })
})

module.exports = new GraphQLSchema({
	query: Query,
});