const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const graphql = require('graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = graphql;
const users = require('./users.json')
const app = express();

const userType = new GraphQLObjectType({
    name:'User',
    fields: () => ({
        email: { type: GraphQLString},
        username: { type: GraphQLString},
        name: { type: GraphQLString},
        company: { type: GraphQLString},
        address: { type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: () => ({
        getAllUsers: {
            type: new GraphQLList(userType),
            resolve(parent,args){
                return users
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name:"mutation",
    fields: () => ({
        createUser: {
            type: userType,
            args:{
                email: { type: GraphQLString},
                username: { type: GraphQLString},
                name: { type: GraphQLString},
                company:{ type: GraphQLString},
                address: { type: GraphQLString},
            },
            resolve(parent,args){
                users.push({ email: args.email,
                             username: args.usename,
                             name: args.name,
                             company: args.company,
                             adress: args.adress,
                })
                return args
            }
        }
    })
})

const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true

}))
app.listen(5000, ()=>{
    console.log('server started')
})