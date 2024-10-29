import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
