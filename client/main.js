document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

// BOILERPLATE FROM INDEX.HTML

fetchFortune = () => {
    axios.get("http://localhost:4000/api/fortune")
    .then(res => renderFortune(res.data))
}

generateFortunes = () => {
    axios.get("http://localhost:4000/api/fortune/gen")
    .then(res => console.log(res.data));
}

renderFortune = data => {
    let fortune = document.createElement('h3');
    let targetDiv = document.getElementById('fortune-body');
    fortune.innerText = data;
    targetDiv.appendChild(fortune);
}

document.getElementById('fortune').addEventListener("click", fetchFortune);
document.addEventListener("DOMContentLoaded", generateFortunes);