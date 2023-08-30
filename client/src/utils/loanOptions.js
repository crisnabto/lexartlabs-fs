export const loanOptions = (option) => {
    let newMessage;
    let botMessage;
    let link;
    let loanOption;

    if (option === 0) {
        loanOption = ({ url: 'https://www.investopedia.com/articles/personal-finance/010516/how-apply-personal-loan.asp', text: 'Loan Application Guide' });
        newMessage = { text: 'Apply for a loan', fromUser: true, type: 'text' };
        botMessage = 'Interested in applying for a loan? We\'ve got you covered! We offer loans for various needs. To get started, you need to provide us with some basic information about yourself. For more detailed instructions on how to apply, check out our ';
        link = 'Loan Application Guide';
    } else if (option === 1) {
        loanOption = ({ url: 'https://www.investopedia.com/loan-terms-5075341', text: 'Loan Conditions Page' });
        newMessage = { text: 'Loan conditions', fromUser: true, type: 'text' };
        botMessage = 'Our loan conditions are designed to provide you with flexibility and convenience. We offer competitive interest rates and various repayment options. For more detailed information on our loan conditions, please read our ';
        link = 'Loan Conditions Page';
    } else {
        loanOption = ({ url: 'https://www.investopedia.com/personal-loan-calculator-5082130', text: 'Help' });
        newMessage = { text: 'Help', fromUser: true, type: 'text' };
        botMessage = 'Need help with calculating your loan options? Our loan calculator can help you estimate your monthly payments and total interest. For more information, please visit our ';
        link = 'Loan Calculator Page';
    }

    return { loanOption, newMessage, botMessage, link }
}