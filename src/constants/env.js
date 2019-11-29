const process_env = process.env.NODE_ENV;
export default require('./' + process_env + '.env');
