const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema } = graphql;

const Movies = require('../server/models/movie')
const Directors = require('../server/models/director')

const Query = new GraphQLObjectType({
	name: 'Query',
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Movies.findById(args.id)
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Directors.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) { return Movies.find({}) }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) { return Directors.find({}) }
        }
    })
})

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Directors.findById(parent.directorId)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({directorId: parent.id})
            }
        }
    })
})

module.exports = new GraphQLSchema({
	query: Query,
});