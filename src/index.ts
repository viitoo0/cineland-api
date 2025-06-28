import 'dotenv/config';
import Express from 'express';
import "reflect-metadata";
import "./infrastructure/container";
import routes from './presentation/routes';
import cors from 'cors';
const app = Express();

app.use(cors());
app.use(routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
