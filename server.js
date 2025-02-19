server.post('/movies', (req, res) => {
  const newMovie = req.body;
  const db = router.db; 
  const movies = db.get('movies').value();

  newMovie.id = movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1;
  db.get('movies').push(newMovie).write();

  res.status(201).json(newMovie);
});


server.delete('/movies/:id', (req, res) => {
  const { id } = req.params;  
  const db = router.db; 

  
  const movie = db.get('movies').find({ id: parseInt(id) }).value();
  
  if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
  }

  
  db.get('movies').remove({ id: parseInt(id) }).write();
  
  res.status(200).json({ message: 'Película eliminada correctamente' });
});
