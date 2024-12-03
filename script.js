import config from './config.js';

document.addEventListener("DOMContentLoaded", () => {

    const downloadButton = document.getElementById("download-cv-btn");
    
    downloadButton.addEventListener("click", (e) => {
        e.preventDefault();  // Prevent default anchor click behavior
        const filePath = downloadButton.getAttribute("href");  // Get the href attribute value
        window.location.href = filePath;  // Trigger file download by setting location
    });
});
    const sendMsgBtn = document.getElementById('send_message');

    // Initialize EmailJS with public key from config file
    emailjs.init(config.emailJSKey);  

    sendMsgBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const msg = document.getElementById('message').value.trim();

        if (name === '' || email === '' || msg === '') {
            alert('Please fill all fields');
            document.getElementById('name').value = ''
            document.getElementById('email').value = ''
            document.getElementById('message').value = ''
            // Show the dialog if any field is empty
        } else {
            // Send the email via EmailJS
            const messageData = {
                from_name: name,
                from_email: email,
                message: `Message: ${msg}\nSender's Email: ${email}`,
                to_email: config.recipientEmail,  // Use email from config file
            };

            // Send email using EmailJS
            emailjs.send(config.serviceID, config.templateID, messageData)
                .then((response) => {
                    console.log("Email sent successfully:", response);
                    alert("Your message has been sent successfully!");
                }, (error) => {
                    console.error("Error sending email:", error);
                    alert("There was an error sending your message. Please try again.");
                });
        }
    });
