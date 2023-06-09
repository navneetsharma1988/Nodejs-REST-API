
module.exports = () => {
  const encodedPassword = process.env.DB_PASS;
  console.log('encoded password', encodedPassword);
  const buff = new Buffer(encodedPassword, 'base64');
  const decodedPassword = buff.toString('UTF-8');
  console.log('decoded password', decodedPassword);
};
