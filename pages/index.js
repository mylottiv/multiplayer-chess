import React, {useState, useEffect} from 'react';
import ChessboardBackground from '../components/ChessboardBackground';
import SquareGrid from '../components/SquareGrid';
import UpdateButton from '../components/UpdateButton';
import {rankRangeEnum} from '../chessEngine/constants/chessboardEnums';
import {newBoard} from '../chessEngine/newGame/newBoard';
import tw from 'twin.macro';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache()
});

export default function Index({styling, squareRankRef, btnStyling, startingBoard, boardStore}){

    const [currentBoardState, setCurrentBoardState] = useState(startingBoard);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [currentColor, setCurrentColor] = useState('White');
    const [fetchedData, setFetchedData] = useState();

    useEffect(
        () => {
            if (fetchedData) {
                console.log('Data received', fetchedData);
                const newBoard = fetchedData.specificBoard.squares.map(({piece}) => {
                    return (piece === null) 
                        ? {Piece: null} 
                        : {Piece: {type: piece.type, color: piece.color, enPassant: piece.enPassant, canCastle: piece.canCastle}}
                });
                setCurrentBoardState(newBoard);
                console.log('Why no change', currentBoardState, newBoard);
                if (currentColor === 'White') setCurrentColor('Black');
                else {
                    setCurrentTurn(currentTurn + 1);
                    setCurrentColor('White');
                }
                // Idk why this neccessary but otherwise there's a loop
                setFetchedData(undefined)
            }
        },
        [fetchedData, currentBoardState, currentTurn, currentColor]
    )

    return (
        <ApolloProvider client={client}>
            <div css={styling}>
                <SquareGrid rangeRef={squareRankRef} boardState={currentBoardState}/>
                <ChessboardBackground />
            </div>
            <UpdateButton currentTurn={currentTurn} currentColor={currentColor} setData={(newData) => (newData !== fetchedData) && setFetchedData(newData)}/>
        </ApolloProvider>
    )
}

export async function getStaticProps() {
    return {
        props: {
            styling: [
                tw`relative mx-4 mt-8 mb-4`,
                `width: 330px; height: 330px`
            ],
            squareRankRef: rankRangeEnum,
            startingBoard: newBoard(),
        }
    }
};