import nodemailer from 'nodemailer';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const form = new IncomingForm();
  form.multiples = true; 

  try {
    const formData = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const data = formData.fields;
    const files = Object.values(formData.files).flat();



    // Configure Nodemailer for Microsoft 365
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'sales@flennor-parts.com', // Replace with your email
        pass: 'flennor$parts0123456789', // Replace with your email password or app password
      },
    });

    // Build the email options
    const mailOptions = {
      from: 'sales@flennor-parts.com', // Replace with your email
      to: 'sales@flennor-parts.com', // Replace with the recipient's email
      subject: data.subject[0] || 'New Submission Mail From Flennor-Parts.com', // Fallback if subject is not provided
      html: `
        <p><strong>New Submission Mail From: ${data.gender[0] || 'N/A'} ${data.firstName[0] || ''} ${data.familyName[0] || ''}</strong></p>
        <p><strong>Phone:</strong> ${data.dial_code[0] || 'N/A'} ${data.phone[0] || 'N/A'}</p>
        <p><strong>Contact Email:</strong> <a href="mailto:${data.email[0] || 'N/A'}">${data.email[0] || 'N/A'}</a></p>
        <p><strong>Company Name:</strong> ${data.companyName[0] || 'N/A'} <strong>Address:</strong> ${data.companyAddress[0] || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message[0] || 'N/A'}</p>
      `,
      attachments: files.map((file) => ({
        filename: file.originalFilename,
        path: file.filepath,
      })),
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Failed to send email' });
  }
}
