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
        squares: [Square!]
    }

    type BoardStore {
        turnNumber: Int!
        board: Board!
    }

    type GameState {
        currentTurnInfo: CurrentTurnInfo!
        currentBoard: Board!
        boardStateStore: BoardStateStore!
    }

    type BoardStateStore {
        startingBoard: Board!
        store: [BoardStore!]
    }

    type Turn {
        count: Int!
        color: String!
    }

    type CurrentTurnInfo {
        currentTurn: Turn!
        validMoves: AllValidMoves
    }

    type AllValidMoves {
        white: PlayerValidMoves
        black: PlayerValidMoves
    }

    type PlayerValidMoves {
        pieceMovesets: [PieceValidMoves]
    }

    type PieceValidMoves {
        type: String!
        coordinates: String!
        moveset: [String!]
        canCapture: [String!]
    }

    input TurnInput {
        count: Int!
        color: String!
    }

    type Query {
        # piece(index: Int!): Piece!
        # pieces: [Piece!]
        # square(index: Int!): Square!
        # squares: [Square!]
        # specificBoard(turn: TurnInput!): Board!
        # currentBoard: Board!
        gameState: GameState!
        currentTurnInfo: CurrentTurnInfo!
        currentBoard: Board!
        boardStateStore: BoardStateStore!    
        specificBoard(turn: TurnInput!): Board!
    }

    type Mutation {
        playerMakesMove(color: String! move: String!): GameState!
    }

    type Subscription {
        opponentMakesMove: GameState!
    }
`

const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports = {schema};