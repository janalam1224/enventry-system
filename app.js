const express = require('express');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/api', userRouter);  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
