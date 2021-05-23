const app = require("express");
const connection = require("./DB");
const crypto = require("crypto");

const Router = app.Router();

Router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query(
    `SELECT username , password , profile_id FROM user WHERE username="${username}"`,
    (err, row) => {
      if (err) throw err;
      if (row.length === 0) {
        res.send("ไม่พบชื่อผู้ใช้ในระบบ");
      } else {
        if (row[0].password === password) {
            const usernameTemp = row[0].username;
            connection.query(`SELECT * FROM profile WHERE id=${row[0].profile_id}` , (err,row)=>{
                if(err) throw err;
                res.send({
                    username : usernameTemp,
                    id: row[0].id,
                    img: row[0].img,
                    name: row[0].name,
                    tel: row[0].tel,
                    type_skill: row[0].type_skill,
                    id_line: row[0].id_line,
                    about: row[0].about,
                    province: row[0].province
                });
            });
        } else {
          res.send("รหัสผ่านไม่ถูกต้อง");
        }
        // res.send(row[0].password);
        // const hash = crypto.createHash("sha256").update(password).digest("base64");
      }
    }
  );
});

Router.post("/signUp", (req, res) => {
  //User
  const username = req.body.username;
  const password = req.body.password;
  const img = req.body.img;
  const name = req.body.name;
  const tel = req.body.tel;
  const type_skill = req.body.type_skill;
  const id_line = req.body.id_line;
  const about = req.body.about;
  const province = req.body.province;

  const role = "m";

  connection.query(
    `INSERT INTO profile(img, name, tel, type_skill, id_line, about, province) 
                    VALUES ("${img}","${name}", "${tel}" , "${type_skill}","${id_line}","${about}","${province}")`,
    (err, row) => {
      if (err) throw err;
      // row.insertId
      connection.query(
        `INSERT INTO user(username, password, role, profile_id) 
                        VALUES ("${username}","${password}","${role}","${row.insertId}")`,
        (err, row) => {
          if (err) throw err;
          res.send("ลงทะเบียนเรียบร้อย");
        }
      );
    }
  );

  //   const hash = crypto.createHash("sha256").update(password).digest("base64");
  //   res.send("มีชื่อผู้ใช้นี้แล้วในระบบ");
  //Profile
});
Router.post("/testt", (req, res) => {
  connection.query(
    `INSERT INTO profile ( img, name, tel, type_skill, id_line, about, province) 
    VALUES ( 'dwad', 'awdawd', 'awdawd', 'awdawd', 'awdawd', 'awdawd', 'dwadawd')`,
    (err, row) => {
      if (err) throw err;
      res.send(row);
      console.log(row.insertId);
    }
  );
});

Router.post("/editProfile", (req, res) => {
  /* const id 

    //Profile 
    const img ;
    const name ; 
    const tel ; 
    const type_skill ;
    const id_ilne; 
    const id_facebook ;
    const about ; 
    const province ;  */
});

module.exports = Router;
