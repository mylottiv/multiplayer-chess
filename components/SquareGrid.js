import React from 'react';
import tw, { styled } from 'twin.macro';
import Square from './Square';

export default function SquareGrid({rangeRef, boardState}) {

    const reversedKeys = Object.keys(rangeRef).reverse();
    const squares = [];
    reversedKeys.forEach(rank => {
        const lowerLimit = rangeRef[rank][0];
        const upperLimit = rangeRef[rank][1];
        for (let i = lowerLimit; i <= upperLimit; i++) {
            squares.push({index: i, Piece: boardState[i].Piece});
        }
    })
    const StyledGrid = styled.div`
        ${''/* Still not comfortable with how not flush the grid is, will probably have better idea at higher resolution*/}
        padding: 2.15px 2.15px 2.15px 2.15px;
        ${tw`relative z-10 w-full h-full grid grid-cols-8 min-w-0 min-h-0`}
    `
        
    return (
        <StyledGrid>
            {squares.map(({index, Piece}) => {
                const keyAndIdStr = `chessboard-square-${index}`;
                return (<Square key={keyAndIdStr} id={keyAndIdStr} squareIndex={index} pieceType={Piece !== null && Piece.type} color={Piece !== null && Piece.color} />)
            })}
        </StyledGrid>
    )
}
