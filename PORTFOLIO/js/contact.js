/* ================================
   CONTACT FORM
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contactMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const visitorName = document.getElementById('visitor_name').value;
            const visitorEmail = document.getElementById('visitor_email').value;
            const visitorSubject = document.getElementById('visitor_subject').value;
            const visitorMessage = document.getElementById('visitor_message').value;

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitButton.innerHTML;

            try {
                // Show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending...';

                // Create a mailto link as fallback
                const emailContent = `Name: ${visitorName}\nEmail: ${visitorEmail}\nSubject: ${visitorSubject}\n\nMessage:\n${visitorMessage}`;
                
                // Try to send via Formspree (you'll need to update the form ID)
                const formspreeId = 'xaqdqdkk'; // Update this with your Formspree ID from formspree.io
                
                const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: visitorName,
                        email: visitorEmail,
                        subject: visitorSubject,
                        message: visitorMessage
                    })
                });

                if (response.ok) {
                    // Success
                    showMessage('✅ Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Send failed');
                }
            } catch (error) {
                console.error('Error:', error);
                // Fallback to mailto approach
                const mailtoLink = `mailto:ashleysanares@gmail.com?subject=${encodeURIComponent(visitorSubject)}&body=${encodeURIComponent(emailContent)}`;
                
                showMessage('ðŸ’¡ Opening your email client to send the message manually...', 'info');
                
                // Wait a moment then open mailto
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 1500);
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalHTML;
            }
        });
    }

    function showMessage(text, type) {
        contactMessage.style.display = 'block';
        
        if (type === 'success') {
            contactMessage.style.background = 'rgba(76, 175, 80, 0.1)';
            contactMessage.style.borderLeft = '4px solid #4CAF50';
            contactMessage.style.color = '#4CAF50';
        } else if (type === 'info') {
            contactMessage.style.background = 'rgba(33, 150, 243, 0.1)';
            contactMessage.style.borderLeft = '4px solid #2196F3';
            contactMessage.style.color = '#2196F3';
        } else {
            contactMessage.style.background = 'rgba(244, 67, 54, 0.1)';
            contactMessage.style.borderLeft = '4px solid #F44336';
            contactMessage.style.color = '#F44336';
        }
        
        contactMessage.innerHTML = text;
        
        if (type === 'success') {
            setTimeout(() => {
                contactMessage.style.display = 'none';
            }, 5000);
        }
    }
});