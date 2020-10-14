import {ErrorRequestHandler} from 'express';
import {ValidationError} from 'yup';

interface ValidationErrors{
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if(error instanceof ValidationError){
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });

        return response.status(400).json({message: 'Validation fails', errors});
    }
    // para o dev, o erro vai detalhado
    console.error(error);
    
    // para o cliente
    return  response.status(500).json({message: 'Internal server error'});
};

export default errorHandler;