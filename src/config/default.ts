require('dotenv').config();

module.exports = {
  live: {
    paystack: {
      secretKey: process.env.PAYSTACK_TEST_SECRET,
      endpoints: {
        bankList: 'https://api.paystack.co/bank',
        initiatePayment: 'https://api.paystack.co/transaction/initialize',
        accountNumberVerification: 'https://api.paystack.co/bank/resolve',
        initiateSingleBankTransfer: 'https://api.paystack.co/transfer',
        createTransferRecipient: 'https://api.paystack.co/transferrecipient',
      },
    },
  },
  test: {
    paystack: {
      secretKey: process.env.PAYSTACK_TEST_SECRET,
      endpoints: {
        bankList: 'https://api.paystack.co/bank',
        initiatePayment: 'https://api.paystack.co/transaction/initialize',
        accountNumberVerification: 'https://api.paystack.co/bank/resolve',
        initiateSingleBankTransfer: 'https://api.paystack.co/transfer',
        createTransferRecipient: 'https://api.paystack.co/transferrecipient',
      },
    },
  },
};
