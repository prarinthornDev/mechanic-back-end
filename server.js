//=============import=============
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mysql = require("mysql");
const path = require("path");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const crypto = require("crypto");

const app = express();
app.use(fileUpload());
app.use(helmet());
app.use(express.json());
app.use(cors());
const connection = require("./DB");

const user = require("./user");

//app.use('/f' , service);  // Prefix PATH
app.use("/users", user); //ALL

app.get("/province", (req, res) => {
  console.log("province");
  connection.query("SELECT DISTINCT province  FROM districts", (err, row) => {
    if (err) throw err;
    res.send(row);
  });
});

app.get("/", (req, res) => {
  /*   const hash = crypto.createHash("sha256").update("1234").digest("base64");
  console.log(hash); */
  /*   const p1 = "1234";
  const p2 = "1234";
  const p3 = "1234";
  const p4 = "1234";

  console.log(`Hash 1 : ${crypto.createHash("sha256").update(p1).digest("base64")}`);
  console.log(`Hash 2 : ${crypto.createHash("sha256").update(p2).digest("base64")}`);
  console.log(`Hash 3 : ${crypto.createHash("sha256").update(p3).digest("base64")}`);
  console.log(`Hash 4 : ${crypto.createHash("sha256").update(p4).digest("base64")}`);

  if(crypto.createHash("sha256").update(p1).digest("base64") === crypto.createHash("sha256").update(p2).digest("base64") ){
    console.log('true');
  } */

  res.send("<h1>SERVER IS RUNNING! </h1>");
});
//-----TIME--------
/* const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const dateFomat = today.toISOString();
  const date = dateFomat.substring(0, 10);
  const date_update = date; */

//-----------------------LOGIN-------------------//

//-----------------------SIGNUP------------------//

//----------------------ADD PROFILE---------------//

//---------------------Show PROFILE by ID-------------//

//---------------------EDIT PROFILE-------------//
app.post('/editProfile' , (req,res)=>{
  const id = req.body.id;
  const img = req.body.img;
  const name = req.body.name;
  const tel = req.body.tel;
  const type_skill = req.body.type_skill;
  const id_line = req.body.id_line;
  const about = req.body.about;
  const province = req.body.province ;

  connection.query(`UPDATE profile SET img="${img}",name="${name}",tel="${tel}",type_skill="${type_skill}",id_line="${id_line}",about="${about}",province="${province}" WHERE id="${id}"` , (err,row)=>{
    if (err) throw err;
    res.send('สำเร็จ');
  })
});


//-----------------------ADD IMG-----------------//
app.post("/uploadImg", function (req, res) {
  let sampleFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  sampleFile = req.files.myImage;
  uploadPath = __dirname + "/uploads/" + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    // console.log(uploadPath);
    // console.log(sampleFile.name);
    res.send(sampleFile.name);
  });
});
//-----------------------SHOW IMG-----------------//
app.get("/img/:id", (req, res) => {
  if (req.params.id === "undefined") {
    let p = path.join(__dirname, "/uploads/fix.png");
    res.sendFile(p);
  } else {
    let param = req.params.id;
    let p = path.join(__dirname, "/uploads/", param);
    res.sendFile(p);
  }
});

//------------------------ADD jobs-----------------//
app.post("/addJob", (req, res) => {
  const id = req.body.id;
  const jobsName = req.body.jobsName;
  const description = req.body.description;
  const price = req.body.price;
  const type = req.body.type;
  const province = req.body.province;
  const time = req.body.time;
  const img1 = req.body.img1;
  const img2 = req.body.img2;
  const img3 = req.body.img3;
  const img4 = req.body.img4;

  connection.query(
    `INSERT INTO jobs(img1, img2, img3, img4 ,jobs_name, description, price, type, time, province, profile_id) VALUES ("${img1}","${img2}","${img3}","${img4}","${jobsName}","${description}","${price}","${type}","${time}","${province}","${id}")`,
    (err, row) => {
      if (err) throw err;
      res.send(row);
    }
  );
});

//-------------------------EDIT Jobs---------------//
/* app.post("/editJobs", (req, res) => {
  const idJobs = req.body.idJobs;
  const jobsName = req.body.jobsName;
  const description = req.body.description;
  const price = req.body.price;
  const type = req.body.type;
  const province = req.body.province;
  const time = req.body.time;
  const img1 = req.body.img1;
  const img2 = req.body.img2;
  const img3 = req.body.img3;
  const img4 = req.body.img4;
  connection.query(
    `UPDATE jobs SET img1="${img1}" , img2="${img2}" , img3="${img3}" , img4="${img4}" , jobs_name="${jobsName}", description="${description}" , price="${price}", type="${type}" , time="${time}" , province="${province}"  WHERE id="${idJobs}"`,
    (err, row) => {
      if (err) throw err;
      res.send(row);
    }
  );
}); */
//-------------------------Show Job ALL ------------------//
app.get("/showJobs", (req, res) => {
  connection.query(
    `SELECT profile.id as profile_id, profile.img , profile.name , profile.tel , profile.type_skill , profile.id_line , profile.about , profile.province , jobs.id as jobs_id , jobs.img1, jobs.img2, jobs.img3,jobs.img4,jobs.jobs_name, jobs.description, jobs.price, jobs.type, jobs.time, jobs.province as job_province, jobs.profile_id FROM jobs INNER JOIN profile ON jobs.profile_id=profile.id`,
    (err, row) => {
      if (err) throw err;
      res.send(row);
    }
  );
});
//-------------------------Show Job By id ------------------//
app.post("/showJobsByIDjobs", (req, res) => {
  const idJobs = req.body.idJobs;
  connection.query(
    `SELECT profile.id as profile_id, profile.img , profile.name , profile.tel , profile.type_skill , profile.id_line , profile.about , profile.province , jobs.id as jobs_id , jobs.img1, jobs.img2, jobs.img3,jobs.img4,jobs.jobs_name, jobs.description, jobs.price, jobs.type, jobs.time, jobs.province as job_province, jobs.profile_id FROM jobs INNER JOIN profile ON jobs.profile_id=profile.id WHERE jobs.id=${idJobs}`,
    (err, row) => {
      if (err) throw err;
      res.send(row);
    }
  );
});

//-------------------------Show Job by ID Profile------------------//
app.post("/showJobsByIdProfile", (req, res) => {
  const idProfile = req.body.idProfile;
  connection.query(
    `SELECT profile.id as profile_id, profile.img , profile.name , profile.tel , profile.type_skill , profile.id_line , profile.about , profile.province , jobs.id as jobs_id , jobs.img1, jobs.img2, jobs.img3,jobs.img4,jobs.jobs_name, jobs.description, jobs.price, jobs.type, jobs.time, jobs.province  as job_province , jobs.profile_id FROM jobs INNER JOIN profile ON jobs.profile_id=profile.id WHERE profile.id=${idProfile}`,
    (err, row) => {
      if (err) throw err;
      res.send(row);
    }
  );
});

//--------------EDit JOBS------------//
app.post("/editJobs", (req, res) => {
  const id = req.body.idJ;
  const img1 = req.body.img1;
  const img2 = req.body.img2;
  const img3 = req.body.img3;
  const img4 = req.body.img4;
  const jobs_name = req.body.jobs_name;
  const description = req.body.description;
  const price = req.body.price;
  const type = req.body.type;
  const time = req.body.time;
  const province = req.body.province;
  connection.query(
    `UPDATE jobs SET img1="${img1}", img2="${img2}", img3="${img3}", img4="${img4}", jobs_name="${jobs_name}", description="${description}", price="${price}", type="${type}", time="${time}", province="${province}" WHERE id="${id}" `,  
    (err, row) => {
      if (err) throw err;
      res.send(row);
    }
  ); 
});

/* SELECT * FROM `profile` WHERE id=1 */
app.post("/getProfileByid", (req, res) => {
  const id = req.body.id;
  connection.query(
    `SELECT * FROM profile WHERE id="${id}"`,  
    (err, row) => {
      if (err) throw err;
      res.send(row);
    }
  ); 
});


//--------------DELETE JOBS------------//
app.post("/deleteJobs", (req, res) => {
  const id = req.body.idJ;
  connection.query(
    `DELETE FROM jobs WHERE id="${id}" `,  
    (err, row) => {
      if (err) throw err;
      res.send(row);
    }
  ); 
});


//-------------------------Show Job by Type------------------//
app.post("/showJobsByType", (req, res) => {
  const type = req.body.type;
  connection.query(
    `SELECT profile.id as profile_id, profile.img , profile.name , profile.tel , profile.type_skill , profile.id_line , profile.about , profile.province , jobs.id as jobs_id , jobs.img1, jobs.img2, jobs.img3,jobs.img4,jobs.jobs_name, jobs.description, jobs.price, jobs.type, jobs.time, jobs.province, jobs.profile_id FROM jobs INNER JOIN profile ON jobs.profile_id=profile.id WHERE jobs.type="${type}"`,
    (err, row) => {
      if (err) throw err;
      res.send(row);
    }
  );
});

app.post("/test", (req, res) => {
  connection.query("SELECT * FROM profile WHERE 1", (err, row) => {
    if (err) throw err;
    res.send(row);
  });
});
//---------------------view Comment by ID jobs--------------
app.post("/getCommentByIDjobs", (req, res) => {
  const id = req.body.idJobs;
  connection.query(
    `SELECT * FROM comment WHERE jobs_id=${id} ORDER BY id DESC`,
    (err, row) => {
      if (err) throw err;
      //console.log(row);
      res.send(row);
    }
  );
});
//---------------------view Comment by ID jobs--------------
app.post("/getCommentByIDprofile", (req, res) => {
  const idProfile = req.body.idProfile;
  connection.query(
    `SELECT * FROM comment WHERE profile_id=${idProfile} ORDER BY id DESC`,
    (err, row) => {
      if (err) throw err;
      //console.log(row);
      res.send(row);
    }
  );
});




//---------------add comment-----------------//
app.post("/addComment", (req, res) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const dateFomat = today.toISOString();
  const date = dateFomat.substring(0, 19);

  const img = req.body.img;
  const text = req.body.text;
  const username_email = req.body.username_email;
  const jobs_id = req.body.jobs_id;
  const profile_id = req.body.profile_id;

  connection.query(
    `INSERT INTO comment( img, text, username_email, time, jobs_id, profile_id) VALUES ("${img}","${text}","${username_email}","${date}","${jobs_id}","${profile_id}")`,
    (err, row) => {
      if (err) throw err;
      res.send("YAHOO");
    }
  );

  /* INSERT INTO `comment`(`id`, `text`, `username_email`, `time`, `jobs_id`, `profile_id`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6]) */
});

//----------------------------------
app.listen(5001, () => {
  console.log(`Server start on port: 5001`);
});
