const express = require('express');
const articleRouter = require('./routes/articles');
const Article= require('./models/article')
const mongoose = require('mongoose');
const path = require('path'); // Ensure this is not commented out
const methodOverride = require('method-override');


const app = express();
mongoose.connect('mongodb://localhost/VidhiInternData')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory if needed
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
const articles = [
    {
        title: 'Test Article 1',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article 2',
        createdAt: new Date(),
        description: 'Test description'
    }
];

app.get('/', (req, res) => {
    res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
