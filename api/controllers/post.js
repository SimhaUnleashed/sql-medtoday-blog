import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * from posts where cat=?"
    : "select * from posts";

  

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
  // console.log("test");
};

export const getVerificationPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * from verifyposts where cat=?"
    : "select * from verifyposts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "select p.id,`username`,`title`,`desc`,p.img,u.img as userimg,`cat`,`date` from users u join posts p on u.id=p.uid where p.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const getVerificationPost = (req, res) => {
  const q =
    "select p.id,`username`,`title`,`desc`,p.img,u.img as userimg,`cat`,`date` from users u join verifyposts p on u.id=p.uid where p.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "insert into verifyposts(`title`,`desc`,`img`,`cat`,`date`,`uid`) values(?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been created");
    });
  });
};

export const verifyPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "insert into posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) select v.title,v.desc,v.img,v.cat,v.date,v.uid from verifyposts v where `id`=? ; delete from verifyposts where `id`=?";

    

    const values = req.params.id

    db.query(q, [values,values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been created");
    });
    
  });
};

export const addBloodTest = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "insert into bloodtest(`name`,`age`,`bloodgroup`,`address`,`verified`,`amount`) values(?)";

    const values = [
      req.body.Name,
      req.body.Age,
      req.body.BloodGroup,
      req.body.address,
      "0",
      req.body.selectedItem,
    ];

    

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      
      return res.json("Blood Test has been booked");
    });
  });
  console.log("test");
};

export const getBloodTest = (req, res) => {
  const q = "SELECT * from bloodtest where verified=0";

  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
  
};

export const verifyBloodTest = (req, res) => {
  const postId = req.params.id;
  const q = "update bloodtest set verified=1 where id=?";

  // const values = 1;

  db.query(q, [parseInt(postId)], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(postId)
    return res.json("Blood Test has been verified");
  });
};

export const deletePost = (req, res) => {
  const postId = req.params.id;
  const q = "delete from posts where `id`= ?";

  db.query(q, [postId], (err, data) => {
    return res.json("Post has been deleted");
  });
};

export const deleteVerificationPost = (req, res) => {
  const postId = req.params.id;
  const q = "delete from verifyposts where `id`= ? ";

  db.query(q, [postId], (err, data) => {
    
    return res.json("Post has been deleted");
  });
};
export const updatePost = (req, res) => {
  const postId = req.params.id;
  const q = "update posts set `title`=?,`desc`=?,`img`=?,`cat`=? where `id`=? ";

  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

  db.query(q, [...values, postId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json("Post has been updated");
  });
};

export const updateVerificationPost = (req, res) => {
  const postId = req.params.id;
  const q = "update verifyposts set `title`=?,`desc`=?,`img`=?,`cat`=? where `id`=? ";

  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

  db.query(q, [...values, postId], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log("update complete")
    return res.json("Post has been updated");
   
  });
};