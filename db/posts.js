const posts = [
{
  id: "testpost",
  date: new Date("2019-09-27"),
  title: "1 Typography",
  excerpt: require("../static/posts/testpost.md").default.slice(0, 100),
  lastUpdate: new Date("2019-09-27"),
  labels: ["fixtures", "markdown-spec"]
},
{
  id: "testpost",
  date: new Date("2019-09-27"),
  title: "2 Typography",
  lastUpdate: new Date("2019-09-27"),
  labels: ["fixtures", "markdown-spec"]
},

]

export default posts