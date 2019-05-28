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
  reference_number,
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
    subject: `Recipt of your exam deffer request`,
    html: `<p>Hi ${name} <p>
    <div>This is the email to confirm we received your request.</div>
    <div>Here is the information you submitted</div>
    <div><strong>Your Reference Number is: </strong>${reference_number}</div>
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
  transporter.sendMail(mailOptions);
  // let info = await transporter.sendMail(mailOptions);
  // return info;
}

//email sent to insturctor after form submitted
async function insturctorEmail(name, instructor, course, section) {
  var hashedEmail = crypt.encrypt(instructor);
  var url = urlPrefix + "instructor/" + instructor + "&" + hashedEmail;
  const mailOptions = {
    from: account, // sender address
    to: instructor,
    subject: `Just receive a exam deferred request for course: ${course}`,
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
  transporter.sendMail(mailOptions);
  // let info = await transporter.sendMail(mailOptions);
  // return info;
}

//email sent to supervisor after task changed
async function supervisorEmail(name, supervisor, course, section) {
  var hashedEmail = crypt.encrypt(supervisor);
  var url = urlPrefix + "supervisor/" + supervisor + "&" + hashedEmail;
  const mailOptions = {
    from: account, // sender address
    to: supervisor,
    subject: `Just receive a exam deferred request for course: ${course}`,
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
  transporter.sendMail(mailOptions);
  // let info = await transporter.sendMail(mailOptions);
  // return info;
}

//email sent to student/supervisor/insturctor after task changed
async function taskStateUpdate(
  state,
  name,
  reference_number,
  course,
  section,
  student_id,
  insturctorEmail,
  supervisorEmail,
  studentEmail
) {
  //Approved-student
  const studentEmailApproved = {
    from: account,
    to: studentEmail,
    subject: `DSA request on course: ${course} has been approved`,
    html: `<p>Hi, ${name}<p>
        <div>Your DSA request has been <strong>Approved</strong></div>
        <div><strong>Reference Number: </strong>${reference_number}</div>
        <div><strong>Student ID: </strong>${student_id}</div>
        <div><strong>Course: </strong>${course}</div>
        <div><strong>Section: </strong>${section}</div>
        <div>Please contact admin office immediately if above information is not correct.</div>
        <br />
        <br />
        <div>Sent by Web_DSA system</div>`
  };
  //Approved-instructor
  const insturctorEmailApproved = {
    from: account,
    to: insturctorEmail,
    subject: `DSA request by student ${name} on course: ${course} has been approved`,
    html: `<p>Hi, <p>
        <div>DSA request by student ${name} on course: ${course} has been approved</div>
        <div><strong>Reference Number: </strong>${reference_number}</div>
        <div><strong>Student ID: </strong>${student_id}</div>
        <div><strong>Course: </strong>${course}</div>
        <div><strong>Section: </strong>${section}</div>
        <div>Please contact admin office immediately if you did not make the change.</div>
        <br />
        <br />
        <div>Sent by Web_DSA system</div>`
  };
  //denied-student
  const studentEmailDenied = {
    from: account,
    to: studentEmail,
    subject: `DSA request on course: ${course} has been denied`,
    html: `<p>Hi, ${name}<p>
        <div>Your DSA request has been <strong>Denied</strong></div>
        <div><strong>Reference Number: </strong>${reference_number}</div>
        <div><strong>Student ID: </strong>${student_id}</div>
        <div><strong>Course: </strong>${course}</div>
        <div><strong>Section: </strong>${section}</div>
        <div>Please contact admin office immediately if above information is not correct.</div>
        <br />
        <br />
        <div>Sent by Web_DSA system</div>`
  };
  //denied-insturctor
  const insturctorEmailDenied = {
    from: account,
    to: insturctorEmail,
    subject: `DSA request by student ${name} on course: ${course} has been denied`,
    html: `<p>Hi, <p>
        <div>DSA request by student ${name} on course: ${course} has been denied</div>
        <div><strong>Reference Number: </strong>${reference_number}</div>
        <div><strong>Student ID: </strong>${student_id}</div>
        <div><strong>Course: </strong>${course}</div>
        <div><strong>Section: </strong>${section}</div>
        <div>Please contact admin office immediately if you did not make the change.</div>
        <br />
        <br />
        <div>Sent by Web_DSA system</div>`
  };
  //undo-student
  const studentEmailUndo = {
    from: account,
    to: studentEmail,
    subject: `DSA decision on course: ${course} has been undo by admin`,
    html: `<p>Hi, ${name}<p>
        <div>Your DSA request has been <strong>Undo by admin</strong></div>
        <div><strong>Reference Number: </strong>${reference_number}</div>
        <div><strong>Student ID: </strong>${student_id}</div>
        <div><strong>Course: </strong>${course}</div>
        <div><strong>Section: </strong>${section}</div>
        <div>Professor are reconsidering about the decision made on your DSA request.</div>
        <div>You will receive the notification of final decision shortly.</div>
        <div>Please contact admin office immediately if above information is not correct.</div>
        <br />
        <br />
        <div>Sent by Web_DSA system</div>`
  };
  //undo-instructor
  var hashedEmail = crypt.encrypt(insturctorEmail);
  var insturctorListUrl =
    urlPrefix + "instructor/" + insturctorEmail + "&" + hashedEmail;
  const insturctorEmailUndo = {
    from: account,
    to: insturctorEmail,
    subject: `DSA decision for student ${name} on course: ${course} has been undo by admin`,
    html: `<p>Hi, <p>
        <div>DSA request by student ${name} on course: ${course} has been undo by admin</div>
        <div><strong>Reference Number: </strong>${reference_number}</div>
        <div><strong>Student ID: </strong>${student_id}</div>
        <div><strong>Course: </strong>${course}</div>
        <div><strong>Section: </strong>${section}</div>
        <div><a href = ${insturctorListUrl}>Click to get more information > </a></div>
        <br />
        <br />
        <div>Sent by Web_DSA system</div>`
  };
  //undo-supervisor
  var hashedEmail = crypt.encrypt(supervisorEmail);
  var supervisorListUrl =
    urlPrefix + "supervisor/" + supervisorEmail + "&" + hashedEmail;
  const supervisorEmailUndo = {
    from: account,
    to: supervisorEmail,
    subject: `DSA decision for student ${name} on course: ${course} has been undo`,
    html: `<p>Hi, <p>
        <div>DSA request by student ${name} on course: ${course} has been undo</div>
        <div><strong>Reference Number: </strong>${reference_number}</div>
        <div><strong>Student ID: </strong>${student_id}</div>
        <div><strong>Course: </strong>${course}</div>
        <div><strong>Section: </strong>${section}</div>
        <div><a href = ${supervisorListUrl}>Click to get more information > </a></div>
        <br />
        <br />
        <div>Sent by Web_DSA system</div>`
  };
  if (state === "Approved") {
    transporter.sendMail(studentEmailApproved);
    transporter.sendMail(insturctorEmailApproved);
  }
  if (state === "Denied") {
    transporter.sendMail(studentEmailDenied);
    transporter.sendMail(insturctorEmailDenied);
  }
  if (state === "Undo") {
    transporter.sendMail(studentEmailUndo);
    transporter.sendMail(insturctorEmailUndo);
    transporter.sendMail(supervisorEmailUndo);
  }
}

//scheduled email notified number of task need attention on
function scheduledEmail() {}

exports.studentEmail = studentEmail;
exports.insturctorEmail = insturctorEmail;
exports.supervisorEmail = supervisorEmail;
exports.taskStateUpdate = taskStateUpdate;
exports.scheduledEmail = scheduledEmail;
