
function buildList(reposUrl){
 fetch(reposUrl,{
  method:'get',
  headers:
  {
    // 'Authorization': 'Bearer <api key here>'
  }
})
 .then(res => res.json())
 .then(repos =>{
   console.log(repos);
    let ul = document.getElementById('repos')
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    let liHead = document.createElement("li");
    liHead.classList.add("collection-header");
    let h4 = document.createElement("h4");
    h4.textContent = "Repositories";
    liHead.appendChild(h4);
    ul.appendChild(liHead);

    for(let i = 0; i<repos.length ; i++){
      let li = document.createElement("li");
      li.classList.add("collection-item") 
      let div = document.createElement("div");
      let a = document.createElement("a");
      a.href = repos[i].html_url
      a.textContent = repos[i].name
      div.appendChild(a)
      li.appendChild(div)
      ul.appendChild(li)
  }
 })
 .catch(err =>{
   console.log(err);
  }
)              
}
document.getElementById("search-form").addEventListener("submit", (e) =>{
  e.preventDefault();
  searchValue = document.getElementById('search').value;
  if(searchValue){
    console.log(searchValue);
    const url  = `https://api.github.com/search/users?q=${searchValue} `
    fetch(url, {
      method:'get',
      headers:
      {
        // 'Authorization': 'Bearer <api key here>'
      }
    }) 
    .then((resp) => resp.json()) 
    .then( (userInfo) => {
      console.log(userInfo);
      document.getElementById('username').textContent = userInfo.items[0].login;
      document.getElementById('avatar').src = userInfo.items[0].avatar_url;
      let repos = userInfo.items[0].repos_url;
      buildList(repos)
    })
    .catch((err) => {
      console.log(err);
    });
  }
});