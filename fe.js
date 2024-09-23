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

//Get the cats
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

//An async forEach function
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
//Get the cats and return the image url in a new array
const fetchCats = async (user) => {
  const catsImgArr = [];
  await asyncForEach(user.cats, async (catId) => {
    const catObject = await getDataFromApi(`/cats/${catId}`);
    await catsImgArr.push(catObject.imageUrl);
  });
  return await catsImgArr;
};
const readData2 = async () => {
  const catData = await fetchCats(await getUser("123"));
  console.log(await catData);
};
readData2();
