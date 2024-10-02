import { Router } from "express";
//TODO: import controllers

const router = Router();

router.get("/post", (req, res) => {
  res.send("Endpoint to get all posts");
})

router.post("/post", (req, res) => {
    res.send("endpoint to create a post");
})

router.patch("/post/:id", (req, res) => {
    res.send("endpoint to update a post");
})

router.delete("/post/:id", (req, res) => {
    res.send("endpoint to delete a post");
})

export default router;