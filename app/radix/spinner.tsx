'use client'
import React from "react";
import { RotatingLines } from "react-loader-spinner";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export function Spinner(props: Props) {
    return (
        <div {...props}>
            <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="26px"
                visible={true}
            />
        </div>
    )
}