const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

const movies = [
    { id: 1, name: 'Страна чудес Вилли', genre: 'Ужасы', directorId: '1' },
    { id: 2, name: 'Афера Оливера Твиста', genre: 'Криминал', directorId: '2' },
    { id: 3, name: 'Девушка, которая боялась дождя', genre: 'Триллер', directorId: '3' },
    { id: 4, name: 'Блаженство', genre: 'Драма', directorId: '4' },
    { id: 5, name: 'Раскопки', genre: 'История', directorId: '5' }
]

const directors = [
    { id: 1, name: 'Кевин Льюис', age: 51 },
    { id: 2, name: 'Мартин Оуэн', age: 32 },
    { id: 3, name: 'Кастилл Лэндон', age: 44 },
    { id: 4, name: 'Майк Кэхилл', age: 49 },
    { id: 5, name: 'Саймон Стоун', age: 36 }
]

const Query = new GraphQLObjectType({
	name: 'Query',
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return movies.find(movie => movie.id == args.id)
            }
        },
        director : {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return directors.find(director => director.id == args.id)
            }
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
                return directors.find(director => director.id == parent.id)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

module.exports = new GraphQLSchema({
	query: Query,
});