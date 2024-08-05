const express = require('express');
const Article = require('../models/article'); // Correct import path
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

router.get('/edit/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article == null) return res.redirect('/');
    res.render('articles/edit', { article: article });
  } catch (err) {
    res.redirect('/');
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) return res.redirect('/');
    res.render('articles/show', { article: article });
  } catch (err) {
    res.redirect('/');
  }
});

router.post('/', async (req, res, next) => {
  req.article = new Article();
  next();
}, saveArticle('new'));

router.put('/:id', async (req, res, next) => {
  try {
    req.article = await Article.findById(req.params.id);
    next();
  } catch (err) {
    res.redirect('/');
  }
}, saveArticle('edit'));

router.delete('/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

function saveArticle(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
