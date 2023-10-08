const { MongoClient } = require('mongodb');

const mongoDBUri = "mongodb://127.0.0.1:27017/listDataBase";
const client = new MongoClient(mongoDBUri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connection to MongoDB Successfully");
    return client; 
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error; 
  }
}

const verifier = async (user, password) => {
  var messageStatus = {status:''};
  try {
    const dataBaseClient = await connectToMongo();
    const userCollection = dataBaseClient.db().collection("users");

    const filter = {
      $and: [
        { user: user },
        { password: password }
      ]
    };

    const userFound = await userCollection.findOne(filter);
    if(!!userFound === true){
      return messageStatus;
    }else{
      messageStatus.status  = 'Usuario y/o contraseña incorrectas';
      return messageStatus;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports.verifier = verifier;
