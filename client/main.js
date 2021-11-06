document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

// BOILERPLATE FROM INDEX.HTML

let newForm = document.getElementById('new-fortune');
let delSelect = document.getElementById('del-select');
let delForm = document.getElementById('del-form');
let upSelect = document.getElementById('up-select');
let upForm = document.getElementById('up-form');

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
        option.id = `d-${index}`;
        option.value = index;
        option.innerText = fortune.text;
        let clone = option.cloneNode(true);
        clone.id = `u-${index}`;
        delSelect.appendChild(option);
        upSelect.appendChild(clone);
    })
}

addOption = fortune => {
    let { index, text } = fortune;
    let option = document.createElement('option');
    option.id = `f-${index}`;
    option.value = index;
    option.innerText = text;
    delSelect.appendChild(option)
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

    newForm.reset();
}

deleteFortune = e => {
    e.preventDefault();
    let target = e.submitter.previousElementSibling.value;
    axios.delete(`http://localhost:4000/api/fortune/${target}`)
    .then(res => removeOption(res.data));
}

updateFortune = e => {
    e.preventDefault();
    let index = e.target.children[0].value;
    let text = e.target.children[1].value;
    let obj = {
        index: index,
        text: text
    }
    axios.put(`http://localhost:4000/api/fortune/${index}`, obj)
    .then(res => changeOptions(res.data));
}

removeOption = index => {
    document.getElementById(`d-${index}`).remove();
    document.getElementById(`u-${index}`).remove();
}

changeOptions = fortune => {
    let { index, text } = fortune;
    let delOption = document.getElementById(`d-${index}`);
    let upOption = document.getElementById(`u-${index}`);
    delOption.innerText = text;
    upOption.innerText = text;
}

renderFortune = (text, type) => {
    let target;

    let fortune = document.createElement('h3');

    if (type === "get") {
        target = document.getElementById('random-fortune-body');
        fortune.innerText = text;
    } else {
        target = document.getElementById('new-fortune-body');
        fortune.innerText = text.text
    }

    target.appendChild(fortune);
}

document.getElementById('fortune').addEventListener("click", fetchFortune);
document.addEventListener("DOMContentLoaded", generateFortunes);
newForm.addEventListener("submit", newFortune);
delForm.addEventListener("submit", deleteFortune);
upForm.addEventListener("submit", updateFortune);