document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

// BOILERPLATE FROM INDEX.HTML

let fortuneForm = document.getElementById('new-fortune');
let select = document.getElementById('del-select');
let delForm = document.getElementById('del-form');

fetchFortune = () => {
    axios.get("http://localhost:4000/api/fortune")
    .then(res => renderFortune(res.data, "get"))
}

generateFortunes = () => {
    axios.get("http://localhost:4000/api/fortune/gen")
    .then(res => populateOptions(res.data));
}

populateOptions = fortunes => {
    fortunes.forEach((fortune, index) => {
        let option = document.createElement('option');
        option.id = `f-${index}`;
        option.value = index;
        option.innerText = fortune.text;
        select.appendChild(option);
    })
}

addOption = fortune => {
    let { index, text } = fortune;
    let option = document.createElement('option');
    option.id = `f-${index}`;
    option.value = index;
    option.innerText = text;
    select.appendChild(option)
}


newFortune = e => {
    e.preventDefault();
    let value = e.target.children[1].value;
    let fortune = {
        text: value
    }
    axios.post('http://localhost:4000/api/fortune', fortune)
    .then(res => {
        renderFortune(res.data, "post");
        addOption(res.data);
    });

    fortuneForm.reset();
}

deleteFortune = e => {
    e.preventDefault();
    let target = e.submitter.previousElementSibling.value;
    axios.delete(`http://localhost:4000/api/fortune/${target}`)
    .then(res => removeOption(res.data));
}

removeOption = index => {
    document.getElementById(`f-${index}`).remove();
}

renderFortune = (data, type) => {
    let target;

    if (type === "get") {
        target = document.getElementById('random-fortune-body');
    } else {
        target = document.getElementById('new-fortune-body');
    }

    let fortune = document.createElement('h3');
    fortune.innerText = data.text;
    target.appendChild(fortune);
}

document.getElementById('fortune').addEventListener("click", fetchFortune);
document.addEventListener("DOMContentLoaded", generateFortunes);
fortuneForm.addEventListener("submit", newFortune);
delForm.addEventListener("submit", deleteFortune);