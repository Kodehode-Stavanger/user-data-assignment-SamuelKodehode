"use strict";
const submitButton = document.getElementById('submit-button');
const sortButton = document.getElementById('sort-rank');
const checkedButton = document.getElementById('hide-checked');
const logoShowcaseSelect = document.getElementById('category');
const logoShowcase = document.getElementById('logo-showcase');
const ideasContainer = document.getElementById('idea-container');
let ideas = [];
let ranked = false;
let hideChecked = false;
const storageSet = () => {
    localStorage.setItem('savedIdeas', JSON.stringify(ideas));
};
const storageGet = () => {
    const isStorage = localStorage.getItem('savedIdeas');
    if (isStorage) {
        ideas = JSON.parse(isStorage);
    }
};
const create = () => {
    const newIdea = {
        name: document.getElementById('ideaName').value,
        description: document.getElementById('ideaDescription').value,
        categoryImg: `assets/img/${logoShowcaseSelect.value}.svg`,
        checkBox: false,
        rank: 0
    };
    ideas.push(newIdea);
    storageSet();
};
const render = () => {
    storageGet();
    ideasContainer.innerHTML = '';
    let sortedArray = [...ideas];
    if (hideChecked)
        sortedArray = sortedArray.filter((idea) => !idea.checkBox);
    if (ranked)
        sortedArray = sortedArray.sort((a, b) => b.rank - a.rank);
    sortedArray.forEach((idea, index) => {
        const ideaCardDiv = document.createElement('div');
        const interactionsDiv = document.createElement('div');
        const rankNumDiv = document.createElement('div');
        const rankDiv = document.createElement('div');
        const rankDown = document.createElement('img');
        const rankUp = document.createElement('img');
        const name = document.createElement('h2');
        const checkBox = document.createElement('input');
        const categoryLogo = document.createElement('img');
        const rankNumber = document.createElement('h4');
        const description = document.createElement('h3');
        const deleteBtn = document.createElement('Button');
        checkBox.type = 'checkbox';
        name.textContent = idea.name;
        deleteBtn.textContent = 'Delete';
        checkBox.checked = idea.checkBox;
        categoryLogo.src = idea.categoryImg;
        rankNumber.textContent = String(idea.rank);
        description.textContent = idea.description;
        rankUp.src = 'assets/img/mdi_arrow-up-bold.svg';
        rankDown.src = 'assets/img/mdi_arrow-down-bold.svg';
        interactionsDiv.id = 'interactions';
        ideaCardDiv.id = 'idea-card';
        categoryLogo.id = 'c-logo';
        rankNumDiv.id = 'rankNum';
        checkBox.id = 'check';
        rankDiv.id = 'rank';
        checkBox.addEventListener('change', () => {
            checkBox.checked ? (ideaCardDiv.style.opacity = '0.5') : (ideaCardDiv.style.opacity = '1');
            idea.checkBox = !idea.checkBox;
            storageSet();
        });
        checkBox.checked ? (ideaCardDiv.style.opacity = '0.5') : (ideaCardDiv.style.opacity = '1');
        deleteBtn.addEventListener('click', () => {
            ideas.splice(index, 1);
            storageSet();
            render();
        });
        rankUp.addEventListener('click', () => {
            idea.rank >= 10 ? (idea.rank = 10) : idea.rank++;
            storageSet();
            render();
        });
        rankDown.addEventListener('click', () => {
            idea.rank <= 0 ? (idea.rank = 0) : idea.rank--;
            storageSet();
            render();
        });
        rankNumDiv.append(rankNumber);
        rankDiv.append(rankUp, rankDown);
        interactionsDiv.append(rankNumDiv, rankDiv, deleteBtn);
        ideaCardDiv.append(checkBox, categoryLogo, name, description, interactionsDiv);
        ideasContainer.append(ideaCardDiv);
    });
};
sortButton.addEventListener('click', () => {
    ranked = !ranked;
    ranked
        ? (sortButton.style.backgroundColor = 'rgb(21,21,21)')
        : (sortButton.style.backgroundColor = 'rgb(126,126,126)');
    render();
});
checkedButton.addEventListener('click', () => {
    hideChecked = !hideChecked;
    hideChecked
        ? (checkedButton.style.backgroundColor = 'rgb(21,21,21)')
        : (checkedButton.style.backgroundColor = 'rgb(126,126,126)');
    render();
});
logoShowcaseSelect.addEventListener('change', () => {
    logoShowcase.src = `/assets/img/${logoShowcaseSelect.value}.svg`;
});
submitButton.addEventListener('click', () => {
    create();
    render();
});
render();
//# sourceMappingURL=script.js.map