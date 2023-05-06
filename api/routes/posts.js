import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  verifyPost,
  getPosts,
  getVerificationPost,
  getVerificationPosts,
  updatePost,
  updateVerificationPost,
  deleteVerificationPost,
  getBloodTest,
  addBloodTest,
  verifyBloodTest,
} from "../controllers/post.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/verify", getVerificationPosts);
router.get("/verify:id", getVerificationPost);
router.get("/:id", getPost);
router.post("/", addPost);
router.post("/verify:id", verifyPost);
router.delete("/:id", deletePost);
router.delete("/verify/:id", deleteVerificationPost);
router.put("/:id", updatePost);
router.put("/verify/:id", updateVerificationPost);
router.get("/bloodtests/get", getBloodTest);
router.post("/bloodtests", addBloodTest);
router.put("/bloodtests/:id", verifyBloodTest);
export default router;
