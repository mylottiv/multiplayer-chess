import { makeExecutableSchema, gql } from 'apollo-server-micro';
import {resolvers} from './resolvers';


const typeDefs = gql`

    type Piece {
        type: String!
        color: String!
        enPassant: Boolean
        canCastle: Boolean
    }

    type Square {
        index: Int!
        piece: Piece
    }

    type Board {
        currentTurn: Turn!
        squares: [Square!]
    }

    type Turn {
        count: Int!
        color: String!
    }

    input TurnInput {
        count: Int!
        color: String!
    }

    type Query {
        piece(index: Int!): Piece!
        pieces: [Piece!]
        square(index: Int!): Square!
        squares: [Square!]
        specificBoard(turn: TurnInput!): Board!
        currentBoard: Board!
    }
`

const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports = {schema};