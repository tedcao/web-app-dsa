var config = require("../../../config");
const nodemailer = require("nodemailer");
var crypt = require("../taskInsertHelp");
var account = config.emailAccount;
var password = config.emailPassward;
var filePrefix = "../../uploads/";
var urlPrefix = config.urlPrefix;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: account,
    pass: password
  }
});

//email sent to student after form submitted
async function studentEmail(
  name,
  student_email,
  student_phone,
  course,
  section,
  files,
  aggrement,
  file1_des,
  file2_des,
  file3_des
) {
  const mailOptions = {
    from: account, // sender address
    to: student_email,
    subject: "Recipt of your exam deffer request",
    html: `<p>Hi ${name} <p>
    <div>This is the email to confirm we received your request.</div>
    <div>Here is the information you submitted</div>
    <div><strong>Your Phone number: </strong>${student_phone}</div>
    <div><strong>Course: </strong>${course}</div>
    <div><strong>Section: </strong>${section}</div>
    <div><strong>Check attachment for uploaded files</strong></div>
    <div><strong>File descriptions (1st file): </strong>${file1_des}</div>
    <div><strong>File descriptions (2ed file): </strong>${file2_des}</div>
    <div><strong>File descriptions (3rd file): </strong>${file3_des}</div>
    <div><strong>Registered with Counselling/Disability services: </strong>${aggrement}</div>
    <br />
    <br />
    <div>Sent by Web_DSA system</div>`
  };
  let info = await transporter.sendMail(mailOptions);
  return info;
}

//email sent to insturctor after form submitted
async function insturctorEmail(name, instructor, course, section) {
  var hashedEmail = crypt.encrypt(instructor);
  var url = urlPrefix + "instructor/" + instructor + "&" + hashedEmail;
  const mailOptions = {
    from: account, // sender address
    to: instructor,
    subject: "Just receive a exam deferred request for course: " + course,
    html: `<p>Dear Insturctor <p>
        <div>Here is the information student submitted</div>
        <div><strong>Student Name: </strong>${name}</div>
        <div><strong>Course: </strong>${course}</div>
        <div><strong>Section: </strong>${section}</div>
        <div><a href = ${url}>Click to get more information > </a></div>
        <br />
        <br />
        <div>Sent by Web_DSA system</div>`
  };
  let info = await transporter.sendMail(mailOptions);
  return info;
}

//email sent to supervisor after task changed
async function supervisorEmail(name, supervisor, course, section) {
  var hashedEmail = crypt.encrypt(supervisor);
  var url = urlPrefix + "supervisor/" + supervisor + "&" + hashedEmail;
  const mailOptions = {
    from: account, // sender address
    to: supervisor,
    subject: "Just receive a exam deferred request for course: " + course,
    html: `<p>Dear Supervisor <p>
        <div>Here is the information student submitted</div>
        <div><strong>Student Name: </strong>${name}</div>
        <div><strong>Course: </strong>${course}</div>
        <div><strong>Section: </strong>${section}</div>
        <div><a href = ${url}>Click to get more information > </a></div>
        <br />
        <br />
        <div>Sent by Web_DSA system</div>`
  };
  let info = await transporter.sendMail(mailOptions);
  return info;
}

//email sent to student/supervisor/insturctor after task changed
function taskStateUpdate() {}

//scheduled email notified number of task need attention on
function scheduledEmail() {}

exports.studentEmail = studentEmail;
exports.insturctorEmail = insturctorEmail;
exports.supervisorEmail = supervisorEmail;
exports.taskStateUpdate = taskStateUpdate;
exports.scheduledEmail = scheduledEmail;
