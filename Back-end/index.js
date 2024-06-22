const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require('express');
const cors = require('cors') 
const app = express();
const PORT = 3000

app.use(cors()); 
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is Running: ${PORT}`);
})


app.get("/board", async (req, res) => {  // Gets all boards
    const books = await prisma.board.findMany(
      {
      include: {cards : true}
      }
    )
    res.json(books);
})

app.get("/search/:id", async(req, res) => { // Search boards
    const id = req.params.id;
    const result = await prisma.board.findMany({
      where: {
        title: {
          equals: id,
        }
      }
      
    })
    console.log(result);
    res.json(result);
})
app.get("/filter/:id", async(req, res) => { // Filters boards
    const id = req.params.id;
    const result = await prisma.board.findMany({
      where: {
        category: { 
          equals: id,
        }
      }
    })
    res.json(result);
})

app.post('/board', async (req, res) => {  // Creates Boards
    const {title, author, category} = req.body;
    const newBook = await prisma.board.create({
        data: {
            title,
            category,
            author
        }
    })
    res.json(newBook);
})

app.post('/:id', async (req, res) => { // Make a new board
  const  boardId = parseInt(req.params.id);
  const likecount = 0;
  const {title, description, gif, owner} = req.body;
  const newCard = await prisma.card.create({
        data: {
          title,
          description,
          gif,
          owner,
          boardId,
          likecount,
        } 
  })
  res.json(newCard);
})
app.post('/comments/:id', async (req, res) => { // Makes Comments
  const cardId = parseInt(req.params.id);
  const {text} = req.body;
  const newComment = await prisma.comments.create({
      data: {
        text,
        cardId
      }
  })
  res.json(newComment);
})
app.delete('/card/:id', async (req, res) => { // DELETE CARD
  const { id } = req.params;
  const deletedCard = await prisma.card.delete({
    where: { id: parseInt(id) }
  })
  res.json(deletedCard);
})
app.get("/cards/:id", async (req, res) => { // Get Cards
  const id = parseInt(req.params.id);
  const result = await prisma.card.findMany({
    where: {
      boardId: parseInt(id)
    },
    include: {
      comments: true
    },
    orderBy: [{
      id: 'desc',
    }],
  })
  res.json(result);
})
app.get("/comments/:id", async (req, res) => { // Get Comments
  const id = parseInt(req.params.id);
  const result = await prisma.comments.findMany({
    where: {
      cardId: parseInt(id)
    },
    orderBy: [{
      id: 'desc',
    }],
  })
  res.json(result);
})
app.put("/cards/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await prisma.card.update({
    where: { id: parseInt(id) },
    data: {
      likecount: {
        increment: 1,
      }
    }
  })
  res.json(result);
})

  app.delete('/board/:id', async (req, res) => {
    const { id } = req.params;
    const deleteCards = await prisma.card.deleteMany({
      where:{ boardId: parseInt(id) }
    }) 
    const deletedBook = await prisma.board.delete({
      where: { id: parseInt(id) }
    })
    res.json(deletedBook);
  })
