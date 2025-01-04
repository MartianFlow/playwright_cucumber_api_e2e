import * as dotenv from 'dotenv';

export const getENV= ()=>{
    dotenv.config({
        override:true,
        path:`src/test/Helper/env/.env.${process.env.ENV}`
    })
}