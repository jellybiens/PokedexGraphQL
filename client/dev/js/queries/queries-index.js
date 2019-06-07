import gql from 'graphql-tag';



// create user
// add user (give starter)
// add catch
// add encountered

export const ALL_POKEMON_QUERY = gql`
    query allPokemon($pokemonid: [ID!]){
      allPokemon(id: $pokemonid) {
        id
        name
        about
        types
        weight
        height
        evoline

      }
    }
    `;

export const UPDATE_CAUGHT = gql`
    mutation updateCaught($userid: ID!, $wordid: ID!){
      updateCaught(userid: $userid, wordid: $wordid) {
        score
      }
    }
    `;

export const UPDATE_ENCOUTNERED = gql`
    mutation updateEncountered($userid: ID!, $wordid: ID!){
      updateEncountered(userid: $userid, wordid: $wordid) {
        score
      }
    }
    `;


export const USER_LOGIN = gql`
    query userLogin($username: String!, $password: String!){
      userLogin(username: $username, password: $password) {
        userid
        username
        admin
        token
        tokenExpiration
      }
    }
    `;

export const AUTH_TOKEN_VALIDATE = gql`
    query authTokenValidate($userid: ID!){
      authTokenValidate(userid: $userid) {
        userid
        username
        admin
        token
        tokenExpiration
      }
    }
    `;

export const USER_SIGN_UP = gql`
    mutation createUser($username: String!, $password: String!){
      addUser(username: $username, password: $password){
        _id
     }
    }
    `;
