const { Sequelize } = require('sequelize');
const {  GraphQLObjectType,
          GraphQLID,
          GraphQLInt,
          GraphQLString,
          GraphQLBoolean,
          GraphQLList,
          GraphQLSchema,
          GraphQLNonNull }  = require('graphql');
const GraphQLLong  = require('graphql-type-long');
const Db = require('./db');
const md5 = require('md5');


const User = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => {
    return {
      userid: {
        type: GraphQLID,
        resolve(user) {
          return user.userid
        }
      },
      seenArr: {
        type: GraphQLString,
        resolve(user) {
          return user.seenArr
        }
      },
      caughtArr: {
        type: GraphQLString,
        resolve(user) {
          return user.caughtArr
        }
      }
    }
  }
});

const Pokemon = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'Pokemon data',
  fields: () => {
    return {
      no: {
        type: GraphQLID,
        resolve(pokemon) {
          return pokemon.no
        }
      },
      name: {
        type: GraphQLString,
        resolve(pokemon) {
          return pokemon.name
        }
      },
      types: {
        type: GraphQLList(GraphQLString),
        resolve(pokemon) {
          return pokemon.types
        }
      },
      height: {
        type: GraphQLString,
        resolve(pokemon) {
          return pokemon.height
        }
      },
      weight: {
        type: GraphQLString,
        resolve(pokemon) {
          return pokemon.weight
        }
      },
      evoline: {
        type: GraphQLList(GraphQLString),
        resolve(pokemon) {
          return pokemon.evoline
        }
      }
    }
  }

});



const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return{
      users: {
        type: new GraphQLList(User),
        args: {
          userid: {
            type: GraphQLID
          }
        },
        resolve(_, args, req) {

          return Db.models.user.findAll({where: args});
        }
      },

      user: {
        type: User,
        args: {
          userid: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(_, args) {
          return Db.models.user.findOne({where: {userid: md5(args.userid)}})
          .then(user => {

            if(!user){
              return {
                      userid: args.userid,
                      seenArr: [],
                      caughtArr: []
                    };
            }
            else {
              return {
                      userid: user._id,
                      seenArr: user.seenArr,
                      caughtArr: user.caughtArr
                    };
            }


          });
        }
      },

      pokemon: {
        type: Pokemon,
        args: {
          no: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args) {
          return Db.models.pokemon.findOne({ where: args});
        }
      }


    }
  }
});


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions for updating database',
  fields(){
    return{
      addUser: {
        type: User,
        args: {
          userid: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args, req){

          return Db.models.user.findOne({where: {userid: md5(args.userid)}})
          .then(res => {
              if (res == null) {
                return Db.models.user.create({
                  userid: md5(args.userid),
                  seenArr: [],
                  caughtArr: []
                });
              }
          });
        }
      },

      updateSeen: {
        type: User,
        args: {
          userid: {
            type: new GraphQLNonNull(GraphQLID)
          },
          seenArr: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args, req){

          return Db.models.user.findOne({where: {userid: md5(args.userid)}})
            .then((obj) => {
                return obj.update({ seenArr: args.seenArr });

            });
        }
      },

      updateCaught: {
        type: User,
        args: {
          userid: {
            type: new GraphQLNonNull(GraphQLID)
          },
          caughtArr: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args, req){

          return Db.models.user.findOne({where: {userid: md5(args.userid)}})
            .then((obj) => {
                return obj.update({ caughtArr: args.caughtArr });

            });
        }
      }


    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;
