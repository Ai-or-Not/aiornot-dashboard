import { BASE_URL } from '@/api';

const submitButton = document.querySelector('#contact-us-submit-button') as Element;
const name = document.querySelector('#name') as Element;
const email = document.querySelector('#E-Mail') as Element;
const note = document.querySelector('#Note') as Element;
const company = document.querySelector('#Company') as Element;

// Functions

if (submitButton) {
    submitButton.classList.remove('is-disabled');

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const response = {
            name: name.value,
            email: email.value,
            note: note.value,
            company: company.value,
        };

        for (const key in response) {
            if (key === 'company') continue;

            if (response[key] === '') {
                alert(`Please fill in all required fields ${key}`);
                return;
            }
        }
        console.log(response);

        fetch(`${BASE_URL}/aion/system/post_message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
        }).then((response) => {
            if (response.ok) {
                alert('Thank you for your application! We will contact you shortly.');
                window.location.href = 'https://aiornot.com/';
            } else {
                alert('Something went wrong. Please try again.');
            }
        });
        // send to Slack
    });
}
