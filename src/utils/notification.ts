const toastCss = `
#toast {
  visibility: hidden; /* Hidden by default. Visible on click */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10rem;
  right: 10rem;
  min-height: 100px;
  background-color: #1E2026;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  position: fixed;
  top: 30px;
  padding: 10px;
  z-index: 9999
}

#toast .close-button {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
}

#toast.show {
  visibility: visible; /* Show the snackbar */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
`;

const style = document.createElement('style');
style.innerHTML = toastCss;
document.head.appendChild(style);

const toast = document.getElementById('toast') as Element;

function showToastNotification(text: string) {
    toast.classList.remove('hide');

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = 'x';
    closeBtn.className = 'close-button';

    closeBtn.addEventListener('click', () => {
        toast.classList.add('hide');
    });

    toast.innerHTML = text;
    toast.appendChild(closeBtn);

    toast.classList.add('show');
    // setTimeout(function () {
    //     toast.classList.add('hide');
    // }, 5000);
}

// Export functions.
export const showSuccessPaymentNotification = (plan: 'Pro' | 'Base') => {
    showToastNotification(
        `<p style="font-size: 1.5rem; padding: 2rem;">Amazing! You’ve just upgraded your account, welcome to the exclusive ranks of AI or Not <span style="color: #aefc06; font-weight: bold ">${plan}</span> users. Thank you for being a supporter of AI or Not and a purveyor of the truth!</p>`
    );
};

// showSuccessPaymentNotification('Pro');
