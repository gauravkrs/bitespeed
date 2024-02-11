import express from 'express'
import { sequelize } from './config/dbConfig';
import contactRoutes from './routes/identityRoute';

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/biteSpeed',(Request,Response)=>{
  Response.send("Hello BiteSpeed !!!")
})
app.use('/biteSpeed',contactRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});