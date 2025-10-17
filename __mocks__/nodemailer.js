const sendMailMock = jest.fn(() => Promise.resolve(true));
module.exports = {
    createTransport: () => ({ sendMail: sendMailMock }),
    __sendMailMock: sendMailMock
};