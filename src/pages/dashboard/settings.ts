import { showSuccessPaymentNotification } from '$utils/notification';

import { AuthService, DashboardService } from '../../api';

// Elements
const btnVerifiedEmail = document.querySelector('#btn-verified-email') as Element;
const btnDeleteAccount = document.querySelector('#btn-delete-account') as Element;
const transactionsSection = document.querySelector('#transactions-section') as Element;
const transactionsTable = document.querySelector('#transaction-table') as Element;
const signOutBtn = document.querySelector('#sign-out') as Element;

// get query params
const urlParams = new URLSearchParams(window.location.search);
const payment_success = urlParams.get('payment_success');
const plan = payment_success?.split(' ')[0];

if (payment_success) {
    showSuccessPaymentNotification(plan);
}

const styles = `
    .hide {
        display: none;
    }
    
    .table, th, td {
      border: 0.1rem solid #505358;
      border-collapse: collapse;
    }
    
    .cell {
        display: flex;
        justify-content: right;
        align-items: center;
        padding: 0.5rem;
    }
    
`;

// Inits
const style = document.createElement('style');
style.innerHTML = styles;
document.head.appendChild(style);

AuthService.init();
DashboardService.subscriptionInfo().then((response) => {});
btnVerifiedEmail.classList.remove('hide');

// Functions

AuthService.getUserInfo().then((userInfo) => {
    if (userInfo.is_verified) {
        // btnVerifiedEmail.classList.add('hide');
        btnVerifiedEmail.innerHTML = 'Email has been verified';
        btnVerifiedEmail.classList.remove('settings-edit');
        (btnVerifiedEmail as any).disable = true;
    } else {
        btnVerifiedEmail.classList.remove('hide');
        (btnVerifiedEmail as any).onclick = async () => {
            btnVerifiedEmail.classList.add('hide');
            // send email
            await AuthService.sendVerifiedEmail();
            alert('Email sent. Check your inbox.');
        };
    }
});

(signOutBtn as any).onclick = () => {
    AuthService.removeAuth();
    localStorage.removeItem('_aion_in');
};

(btnDeleteAccount as any).onclick = async () => {
    if (confirm('Are you sure you want to delete your account?')) {
        await AuthService.init();
        const res = await DashboardService.delete();

        if (!res) {
            alert('Something went wrong. Please try again later.');
            return;
        }

        localStorage.removeItem('_aion_in');
        alert('Your account has been deleted.');
        window.location.href = `https://${window.location.host}/`;
    }
};

// Transactions table.
transactionsTable.innerHTML = `
        <table id="table" class="table" style="width: 100%">
        <thead>
            <tr>
                <th style="width: 5%">#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
            </tr>
        </thead>
        <tbody>
            <!-- Existing rows go here -->
        </tbody>
    </table>
`;

function addRow(transaction: {
    num: number;
    name: string;
    amount: string;
    status: 'paid' | 'draft' | 'void' | 'open' | 'uncollectible';
    invoice_link: string;
}) {
    const table = document.getElementById('table')?.getElementsByTagName('tbody')[0];
    const newRow = table?.insertRow(table.rows.length);

    const cell1 = newRow?.insertCell(0);
    const cell2 = newRow?.insertCell(1);
    const cell3 = newRow?.insertCell(2);
    const cell4 = newRow?.insertCell(3);
    const cell5 = newRow?.insertCell(4);

    cell1!.innerHTML = `<p class="cell"> ${transaction.num} </p>`;
    cell2!.innerHTML = `<p class="cell"> ${transaction.name} </p>`;
    cell3!.innerHTML = `<p class="cell"> ${transaction.amount} </p>`;
    cell4!.innerHTML = `<p class="cell" style="color: ${transaction.status === 'paid' ? '#00D924' : 'red'}" > ${
        transaction.status
    } </p>`;
    cell5!.innerHTML = `<a class="cell" href="${transaction.invoice_link}" target="_blank" style="text-decoration: underline"> Invoice </a>`;
}

DashboardService.getTransactions().then(({ invoices }) => {
    invoices.forEach((invoice, index) => {
        addRow({
            num: index + 1,
            name: invoice?.created_dt,
            amount: `$${invoice?.amount}`,
            status: invoice?.status,
            invoice_link: invoice?.link,
        });
        transactionsSection.classList.remove('hide');
    });
});
