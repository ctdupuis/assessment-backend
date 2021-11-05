document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

// BOILERPLATE FROM INDEX.HTML

let fortuneForm = document.getElementById('new-fortune');

fetchFortune = () => {
    axios.get("http://localhost:4000/api/fortune")
    .then(res => renderFortune(res.data, "get"))
}

generateFortunes = () => {
    axios.get("http://localhost:4000/api/fortune/gen")
    .then(res => console.log(res.data));
}

newFortune = e => {
    e.preventDefault();
    let value = e.target.children[1].value
    let fortune = {
        text: value
    }
    axios.post('http://localhost:4000/api/fortune', fortune)
    .then(res => renderFortune(res.data, "post"));

    fortuneForm.reset();
}

renderFortune = (data, type) => {
    let target;

    if (type === "get") {
        target = document.getElementById('random-fortune-body');
    } else {
        target = document.getElementById('new-fortune-body');
    }

    let fortune = document.createElement('h3');
    fortune.innerText = data;
    target.appendChild(fortune);
}

document.getElementById('fortune').addEventListener("click", fetchFortune);
document.addEventListener("DOMContentLoaded", generateFortunes);
fortuneForm.addEventListener('submit', newFortune);