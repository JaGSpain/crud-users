import express from 'express';
import usersRoutes from './routes/user.routes.js'
import cors from 'cors';

const app=express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173'
}));

app.use('/api',usersRoutes);

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`servidor escuchando desde http://localhost:${PORT}`);
    console.log(`servidor escuchando desde http://localhost:${PORT}/api`);
    console.log(`servidor escuchando desde http://localhost:${PORT}/api/users`);
    console.log(`servidor escuchando desde http://localhost:${PORT}/api/users/local'`);
});
