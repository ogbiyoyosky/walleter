import * as dotevn from 'dotenv';

dotevn.config();

export default () => ({
  APP: {
    NAME: process.env.APP_NAME,
    HOST: process.env.APP_HOST,
    PORT: Number(process.env.APP_PORT) || 8080,
  },
  jwt: {
    JWT_AUTH_SECRET: process.env.JWT_AUTH_SECRET,
    EXPIRES_IN: '1d'
  },
  database: {
    TYPE: process.env.DATABASE_TYPE,
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    NAME: process.env.DATABASE_NAME,
    USERNAME: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    ENTITIES: ['dist/**/*.entity.js'],
  },
  paymentGatewayConfigs: {
    paystack: {
      secretKey: process.env.PAYSTACK_SECRET,
      endpoints: {
        bankList: 'https://api.paystack.co/bank',
        initiatePayment: 'https://api.paystack.co/transaction/initialize',
        accountNumberVerification: 'https://api.paystack.co/bank/resolve',
        initiateSingleBankTransfer: 'https://api.paystack.co/transfer',
        createTransferRecipient: 'https://api.paystack.co/transferrecipient',
        paymentVerification: 'https://api.paystack.co/transaction/verify',
      },
    },
  }
});
