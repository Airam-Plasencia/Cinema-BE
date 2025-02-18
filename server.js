server.post('/movies', (req, res) => {
    
    const newMovie = req.body;
  
    
    const db = router.db; 
  
    
    const movies = db.get('movies').value();
  
    
    newMovie.id = movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1;
  
    
    db.get('movies').push(newMovie).write();
  
    
    res.status(201).json(newMovie);
  });
  