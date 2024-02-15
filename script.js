"use strict";
const submitButton = document.getElementById('submit-button');
const logoShowcase = document.getElementById('logo-showcase');
const logoShowcaseSelect = document.getElementById('category');
const ideasContainer = document.getElementById('idea-container');
let ideas = [];
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
        categoryImg: `/assets/img/${logoShowcaseSelect.value}.svg`,
        checkBox: false,
        rank: 0
    };
    ideas.push(newIdea);
    storageSet();
};
const render = () => {
    storageGet();
    ideasContainer.innerHTML = '';
    ideas.forEach((object, index) => {
        const ideaCard = document.createElement('div');
        const categoryLogo = document.createElement('img');
        const name = document.createElement('h2');
        const description = document.createElement('h3');
        const interactions = document.createElement('div');
        const checkBox = document.createElement('input');
        const deleteBtn = document.createElement('Button');
        const rank = document.createElement('div');
        const rankUp = document.createElement('img');
        const rankDown = document.createElement('img');
        const rankNumber = document.createElement('h4');
        const rankNumDiv = document.createElement('div');
        rankNumber.textContent = String(object.rank);
        name.textContent = object.name;
        description.textContent = object.description;
        categoryLogo.src = object.categoryImg;
        checkBox.type = 'checkbox';
        checkBox.checked = object.checkBox;
        deleteBtn.textContent = 'Delete';
        rankUp.src = 'assets/img/mdi_arrow-up-bold.svg';
        rankDown.src = 'assets/img/mdi_arrow-down-bold.svg';
        rank.id = 'rank';
        interactions.id = 'interactions';
        ideaCard.id = 'idea-card';
        categoryLogo.id = 'c-logo';
        checkBox.id = 'check';
        rankNumDiv.id = 'rankNum';
        checkBox.addEventListener('change', () => {
            checkBox.checked ? (ideaCard.style.opacity = '0.5') : (ideaCard.style.opacity = '1');
        });
        deleteBtn.addEventListener('click', () => {
            ideas.splice(index, 1);
            storageSet();
            render();
        });
        rankUp.addEventListener('click', () => {
            object.rank >= 10 ? (object.rank = 10) : object.rank++;
            storageSet();
            render();
        });
        rankDown.addEventListener('click', () => {
            object.rank <= 0 ? (object.rank = 0) : object.rank--;
            storageSet();
            render();
        });
        rankNumDiv.append(rankNumber);
        rank.append(rankUp, rankDown);
        interactions.append(checkBox, rank, deleteBtn);
        ideaCard.append(rankNumDiv, categoryLogo, name, description, interactions);
        ideasContainer.append(ideaCard);
    });
};
logoShowcaseSelect.addEventListener('change', () => {
    logoShowcase.src = `/assets/img/${logoShowcaseSelect.value}.svg`;
});
submitButton.addEventListener('click', () => {
    create();
    render();
});
render();
//# sourceMappingURL=script.js.map