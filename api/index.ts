import 'dotenv/config';
import Express from 'express';
import "reflect-metadata";
import "../src/infrastructure/container";
import cors from 'cors';
import routes from '../src/presentation/routes';
const app = Express();

app.use(cors());
app.use(routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
