var express = require("express");
var router = express.Router();
const Exam = require("../models/Exam");

router.post("/exam", async (req, res) => {
  let newExam = Exam({
    uuid: req.body.uuid,
    examName: req.body.examName,
    examDesc: req.body.examDesc,
    classCode: req.body.classCode,
    sched: req.body.sched,
    deadline: req.body.deadline,
    submittedExam: req.body.submittedExam,
    isChecked: req.body.isChecked,
    questions: req.body.questions,
  });

  await Exam.findOne({
    uuid: newExam.uuid,
  })
    .then(async profile => {
      if (!profile) {
        await newExam
          .save()
          .then(() => {
            res.status(200).send(newExam);
          })
          .catch(err => {
            console.log("Error is ", err.message);
          });
      } else {
        res.send("exam uuid already exists");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});

module.exports = router;
