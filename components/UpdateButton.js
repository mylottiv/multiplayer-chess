import React, {useEffect} from 'react';
import tw, { styled } from 'twin.macro';
import {useLazyQuery, gql} from '@apollo/client';
export default function UpdateButton({currentTurn, currentColor, setData}) {

    const BOARD_STATE_QUERY = gql`
        query BoardStateQuery($count: Int!, $color: String!) {
            specificBoard(turn: {count: $count, color: $color}) {
                currentTurn {
                    count
                    color
                }
                squares {
                    index
                    piece {
                    type
                    color
                    enPassant
                    canCastle
                    }
                }
            }
        }
    `;

    const [getBoard, {called, loading, data} ] = useLazyQuery(BOARD_STATE_QUERY);

    const StyledButton = styled.button`
        ${tw`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
    `
    const onClick = () => getBoard({variables: {count: currentTurn, color: currentColor}});

    useEffect(
        () => {
            if (called && !loading && (data !== undefined)) {
                console.log('initial fetch', data);
                setData(data);
            }
        },
        [data]
    );

    return (
        <StyledButton onClick={onClick}>
            Next Board T: {currentTurn + 1} C: {currentColor}
        </StyledButton>
    )

}