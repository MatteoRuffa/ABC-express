const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let reviews = [
    { id: 1, nome: 'Mario', messaggio: 'Ottimo servizio!', valutazione: 5 },
    { id: 2, nome: 'Anna', messaggio: 'Esperienza nella media.', valutazione: 3 }
  ];

//try get reviews
  app.get('/reviews', (req, res) => {
    res.json(reviews);
  });

//try get single review
app.get('/reviews/:id', (req, res) => {
    const review = reviews.find(r => r.id === parseInt(req.params.id));
    if (!review) return res.status(404).send('Review not found');
    res.json(review);
});

//POST add a newreview
app.post('/reviews', (req, res) => {
    const newReview = {
        id: reviews.length + 1,
        nome: req.body.nome,
        messaggio: req.body.messaggio,
        valutazione: req.body.valutazione
    };
    reviews.push(newReview);
    res.status(201).json(newReview);
});

//PUT update a review
app.put('/reviews/:id', (req, res) => {
    const review = reviews.find(r => r.id === parseInt(req.params.id));
    if (!review) return res.status(404).send('Review not found');

    review.nome = req.body.nome;
    review.messaggio = req.body.messaggio;
    review.valutazione = req.body.valutazione;

    res.json(review); 
});

//DELETE delete a review
app.delete('/review/:is', (req, res ) => {
    const reviewIndex = reviews.findIndex(r => r.id === parseInt(req.params.id));
    if (reviewIndex === -1) return res.status(404).send('Review not found');

    reviews.splice(reviewIndex, 1);
    res.send('Review deleted');
});

//avvio server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 