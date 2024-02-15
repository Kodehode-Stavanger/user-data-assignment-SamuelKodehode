const submitButton = document.getElementById('submit-button') as HTMLButtonElement
const logoShowcase = document.getElementById('logo-showcase') as HTMLImageElement
const logoShowcaseSelect = document.getElementById('category') as HTMLSelectElement
const ideasContainer = document.getElementById('idea-container') as HTMLDivElement
let ideas: Idea[] = []

type Idea = {
	name: string
	description: string
	categoryImg: string
	checkBox: boolean
	rank: number
}

const storageSet = (): void => {
	localStorage.setItem('savedIdeas', JSON.stringify(ideas))
}

const storageGet = (): void => {
	const isStorage: string | null = localStorage.getItem('savedIdeas')
	if (isStorage) {
		ideas = JSON.parse(isStorage)
	}
}

const create = (): void => {
	const newIdea: Idea = {
		name: (document.getElementById('ideaName') as HTMLInputElement).value,
		description: (document.getElementById('ideaDescription') as HTMLTextAreaElement).value,
		categoryImg: `/assets/img/${logoShowcaseSelect.value}.svg`,
		checkBox: false,
		rank: 0
	}

	ideas.push(newIdea)
	storageSet()
}

const render = (): void => {
	storageGet()
	ideasContainer.innerHTML = ''

	ideas.forEach((object: Idea, index: number): void => {
		const ideaCard = document.createElement('div') as HTMLDivElement
		const categoryLogo = document.createElement('img') as HTMLImageElement
		const name = document.createElement('h2') as HTMLHeadingElement
		const description = document.createElement('h3') as HTMLHeadingElement
		const interactions = document.createElement('div') as HTMLDivElement
		const checkBox = document.createElement('input') as HTMLInputElement
		const deleteBtn = document.createElement('Button') as HTMLButtonElement

		const rank = document.createElement('div') as HTMLDivElement
		const rankUp = document.createElement('img') as HTMLImageElement
		const rankDown = document.createElement('img') as HTMLImageElement
		const rankNumber = document.createElement('h4') as HTMLHeadingElement
		const rankNumDiv = document.createElement('div') as HTMLDivElement

		rankNumber.textContent = String(object.rank)
		name.textContent = object.name
		description.textContent = object.description
		categoryLogo.src = object.categoryImg
		checkBox.type = 'checkbox'
		checkBox.checked = object.checkBox
		deleteBtn.textContent = 'Delete'
		rankUp.src = 'assets/img/mdi_arrow-up-bold.svg'
		rankDown.src = 'assets/img/mdi_arrow-down-bold.svg'

		rank.id = 'rank'
		interactions.id = 'interactions'
		ideaCard.id = 'idea-card'
		categoryLogo.id = 'c-logo'
		checkBox.id = 'check'
		rankNumDiv.id = 'rankNum'

		checkBox.addEventListener('change', () => {
			checkBox.checked ? (ideaCard.style.opacity = '0.5') : (ideaCard.style.opacity = '1')
		})

		deleteBtn.addEventListener('click', () => {
			ideas.splice(index, 1)
			storageSet()
			render()
		})

		rankUp.addEventListener('click', () => {
			object.rank >= 10 ? (object.rank = 10) : object.rank++
			storageSet()
			render()
		})

		rankDown.addEventListener('click', () => {
			object.rank <= 0 ? (object.rank = 0) : object.rank--
			storageSet()
			render()
		})

		rankNumDiv.append(rankNumber)
		rank.append(rankUp, rankDown)
		interactions.append(checkBox, rank, deleteBtn)
		ideaCard.append(rankNumDiv, categoryLogo, name, description, interactions)
		ideasContainer.append(ideaCard)
	})
}

logoShowcaseSelect.addEventListener('change', (): void => {
	logoShowcase.src = `/assets/img/${logoShowcaseSelect.value}.svg`
})

submitButton.addEventListener('click', (): void => {
	create()
	render()
})

render()
