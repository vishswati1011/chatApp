const nodemailer = require('nodemailer');

//from who send the mail
let mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    debug: true,
    auth: {
        user: "sv26703@gmail.com",
        pass: "Never@me123",          //your email password
    }
});
//to  who reveice the mail  
let mailDetails = {
    from: 'xyz@gmail.com',
    to: 'abc@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};

// mailTransporter.sendMail(mailDetails, function(err, data) {
//     if(err) {
//         console.log('Error Occurs');
//     } else {
//         console.log('Email sent successfully');
//     }
// });

const sendMail = async (email, otp, subject) => {
    const data = [{ name: "swati", days: 10 }, { name: "nisha", days: 20 }, { name: "sharad", days: 30 }]
    try {
        let html = `
            <p>Hi,</p><br>
            Mail is sent using node js nodemailler <br> 
            This is your otp:${otp} <br>  
            <div>
            <table style="border-collapse: collapse; width: 100%;  border:1px solid #dddddd; border-style: hidden; border-radius: 10px;box-shadow: 0 0 0 1px #666;">
                <tbody>
                <tr
                >
                    <th
                        style="
                            margin-left: '40px';
                            border:none; border-bottom:1px solid #dddddd; border-top:1px solid #dddddd; 
                            padding: '5px';
                            textAlign: 'left';"
                        >
                        Employee Name
                    </th>
                    <th
                    style="
                    margin-left: '40px';
                   border:none; border-bottom:1px solid #dddddd; border-top:1px solid #dddddd; 
                    padding: '5px';
                    textAlign: 'left';"
                    >
                        Total days
                    </th>
                </tr>`
        data.map((item, index) => {
            html =
                html +
                `<tr>
                     <td
                        style="
                        margin-left: '40px';
                       border:none; border-bottom:1px solid #dddddd; border-top:1px solid #dddddd; 
                        padding: '5px';
                        textAlign: 'left';"
                    >
                                    ${item.name}
                     </td>
                        <td
                            style="
                            margin-left: '40px';
                           border:none; border-bottom:1px solid #dddddd; border-top:1px solid #dddddd; 
                            padding: '5px';
                            textAlign: 'left';"
                        >
                              ${item.days}
                            </td>
                    </tr>`

        })
        html =
            html +
            ` </tbody>
            </table>
        </div>
`
            ;
        await mailTransporter.sendMail({
            from: 'sv26703@gmail.com',
            to: email,
            subject: subject,
            html: html
        }, function (err, data) {
            if (err) {
                console.log('Error Occurs');
                return 0;
            } else {
                console.log('Email sent successfully');
                return 1;
            }
        })
    } catch (err) {

    }

}
module.exports = sendMail;
