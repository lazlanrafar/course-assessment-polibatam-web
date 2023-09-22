module.exports = {
  staticUrlImage: function (fileName) {
    const apiUrl = process.env.VUE_APP_API_URL;
    let url = apiUrl.split("/").slice(0, 3).join("/");

    return `${url}/photos/${fileName}`;
  },
};
