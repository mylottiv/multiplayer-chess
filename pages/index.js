import React from 'react';
import tw from 'twin.macro';

export default ({styling}) => (
    <div css={styling}>Hello World</div>
)

export async function getStaticProps() {
    return {
        props: {
            styling: [
                tw`flex flex-col items-center justify-center h-screen`,
                tw`bg-gradient-to-b from-blue-200 to-red-100`
            ]
        }
    }
};