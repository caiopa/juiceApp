'use client';

import { useEffect } from "react";

type ErrorProps = {
    error: Error;
}

export default function Error({ error }:ErrorProps ) {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <>
          <h1>Ooooops! Something went wrong!</h1>
          <p>{error.message}</p>
          <p>Tente novamente</p>
        </>
    )

} 