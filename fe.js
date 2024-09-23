const fetch = require("node-fetch");
const baseUrl = "http://localhost:8080";

//Base url function
const getDataFromApi = async (url) => {
  const data = await fetch(`${baseUrl}${url}`);
  return data.json();
};
//Get the user
const getUser = async (userID) => {
  return await getDataFromApi(`/users/${userID}`);
};

const getCats = async (user) => {
  let promises = user.cats.map(async (catID) => {
    let cat = await fetch(`${baseUrl}/cats/${catID}`);
    return await cat.json();
  });
  return Promise.all(promises);
};

const readData = async () => {
  const userData = await getCats(await getUser("123"));
  console.log(userData);
};
readData();
