import mongoose from 'mongoose';

const connect = async (dbConnectionString) => {
  try {
    await mongoose.connect(dbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const conn = mongoose.connection;
    console.log(`Connected to the "${conn.name}" database`);
    return conn;
  } catch (error) {
    console.log('Error on db connection - Code:', error.code);
    // console.log(error);
  }
};

export default connect;
