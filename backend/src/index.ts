import express from 'express';
import cookieParser from 'cookie-parser';
import { secrets } from './modules/auth/controllers/env.loader';

import loginRouter from './modules/auth/routes/login';
import registrationRouter from './modules/auth/routes/registration';
import refreshRouter from './modules/auth/routes/refresh';
import logoutRouter from './modules/auth/routes/logout';

// Authors
import delelteBookRouter from './modules/records/routes/author/books/delete.book';
import createBookRouter from './modules/records/routes/author/books/create.book';
import readBookRouter from './modules/records/routes/author/books/read.book';
import updateBookRouter from './modules/records/routes/author/books/update.book';

import deleltePageRouter from './modules/records/routes/author/pages/delete.page';
import createPageRouter from './modules/records/routes/author/pages/create.page';
import readPageRouter from './modules/records/routes/author/pages/read.page';
import updatePageRouter from './modules/records/routes/author/pages/update.page';

// Readers
import readBooksReaderRouter from './modules/records/routes/reader/books/read.book';
import readPagesReaderRouter from './modules/records/routes/reader/pages/read.page';


import { AppDataSource } from './inits/pg/pg.connect.init';
import errorHandler from './middleware/errorHandler';

AppDataSource.initialize().then(() => {
    console.log('Cookie Sign:', secrets.cookie_sign);

    const app = express();
    const port = 3001;

    app.use(express.json()); 
    app.use(cookieParser(secrets.cookie_sign));

    app.use('/', loginRouter, registrationRouter, refreshRouter, logoutRouter);

    app.use('/author', delelteBookRouter, createBookRouter, readBookRouter, updateBookRouter); // books
    app.use('/author', deleltePageRouter, createPageRouter, readPageRouter, updatePageRouter); // pages

    app.use('/reader', readBooksReaderRouter, readPagesReaderRouter);

    app.get('/', (req, res) => {
        res.status(200).send('backend server is running!');
    });

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}).catch(error => console.log(error));