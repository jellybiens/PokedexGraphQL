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

const jwt = require('jsonwebtoken');

const Card = new GraphQLObjectType({
  name: 'Card',
  description: 'A word translation',
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
        resolve(card) {
          return card._id
        }
      },
      french: {
        type: GraphQLString,
        resolve(card) {
          return card.french
        }
      },
      english: {
        type: GraphQLString,
        resolve(card) {
          return card.english
        }
      },
      wordType: {
        type: GraphQLString,
        resolve(card) {
          return card.wordType
        }
      }
    }
  }

});


const AuthData = new GraphQLObjectType({
  name: 'AuthData',
  description: 'Authentication for a user login',
  fields: () => {
    return {
      userid: {
        type: GraphQLID,
        resolve(auth) {
          return auth.userid
        }
      },
        username: {
          type: GraphQLString,
          resolve(auth) {
            return auth.username
          }
        },
      admin: {
        type: GraphQLBoolean,
        resolve(auth) {
          return auth.admin
        }
      },
      token: {
        type: GraphQLString,
        resolve(auth) {
          return auth.token
        }
      },
      tokenExpiration: {
        type: GraphQLLong,
        resolve(auth) {
          return auth.tokenExpiration
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
          username: {
            type: GraphQLString
          }
        },
        resolve(_, args, req) {

          if(!req.isAdmin){
            throw new Error('Unauthorised!')
          }

          return Db.models.user.findAll({where: args});
        }
      },

      userLogin: {
        type: AuthData,
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args) {
          return Db.models.user.findOne({ where: { username: args.username, password: md5(args.password) }})
          .then(user => {

            if(!user) throw new Error("Invalid login credentials.");

            const stringHash = user.admin ? process.env.ADMIN_TOKEN : process.env.NORMIE_TOKEN;

            const token = jwt.sign( {
                                    userid: user._id,
                                    username: user.username,
                                    admin: user.admin,
                                    },
                                    stringHash,
                                    { expiresIn: '1d' }
                                  );
                    let tokenExp = new Date();
                    tokenExp.setDate(tokenExp.getDate()+1);

                    return {
                              userid: user._id,
                              username: user.username,
                              admin: user.admin,
                              token: token,
                              tokenExpiration: Date.parse(tokenExp)
                            };

          });
        }
      },
      //create new auth token if logged in within valid timeframe of last token
      authTokenValidate: {
        type: AuthData,
        args: {
          userid: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(_, args, req) {
          if(!req.isLoggedIn && !req.isAdmin){
            throw new Error('Not logged in!')
          }

          return Db.models.user.findOne({ where: { _id: args.userid }})
          .then(user => {

            if(!user) throw new Error("Not logged in.");

            const stringHash = user.admin ? process.env.ADMIN_TOKEN : process.env.NORMIE_TOKEN;

            const token = jwt.sign( {
                                    userid: user._id,
                                    username: user.username,
                                    admin: user.admin,
                                    },
                                    stringHash,
                                    { expiresIn: '1d' }
                                  );
            let tokenExp = new Date();
            tokenExp.setDate(tokenExp.getDate()+1);

                    return {
                              userid: user._id,
                              username: user.username,
                              admin: user.admin,
                              token: token,
                              tokenExpiration: Date.parse(tokenExp)
                            };

          });
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
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args, req){

          return Db.models.user.findOne({where: {username: args.username}})
          .then(res => {
              if (res != null) {
                throw new Error("Username already exists.");
              }
              return Db.models.user.create({
                username: args.username,
                password: md5(args.password),
                admin: false
              });
          });
        }
      },

      updateScoreNeg: {
        type: Score,
        args: {
          userid: {
            type: new GraphQLNonNull(GraphQLID)
          },
          wordid: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(_, args, req){

          if(!req.isLoggedIn && !req.isAdmin){
            throw new Error('Not logged in!')
          }

          return Db.models.score.findOne({ where: args })
            .then((obj) => {
                if(obj) { // update
                    return obj.update({ score: obj.score - 1 });
                }
                else { // insert
                    return Db.models.score.create({ userid: args.userid, wordid: args.wordid, score: -1 });
                }
            });
        }
      },


    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;
