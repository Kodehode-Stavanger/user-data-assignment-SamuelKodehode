const logoShowcaseSelect = document.getElementById('category') as HTMLSelectElement
const submitButton = document.getElementById('submit-button') as HTMLButtonElement
const checkedButton = document.getElementById('hide-checked') as HTMLButtonElement
const logoShowcase = document.getElementById('logo-showcase') as HTMLImageElement
const ideasContainer = document.getElementById('idea-container') as HTMLDivElement
const sortButton = document.getElementById('sort-rank') as HTMLButtonElement
let cursor = document.getElementById('cursor') as HTMLDivElement
let hideChecked: boolean = false
let ranked: boolean = false
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
		categoryImg: `assets/img/${logoShowcaseSelect.value}.svg`,
		checkBox: false,
		rank: 0
	}
	ideas.push(newIdea)

	storageSet()
	;(document.getElementById('ideaName') as HTMLInputElement).value = ''
	;(document.getElementById('ideaDescription') as HTMLTextAreaElement).value = ''
	render()
}

const render = (): void => {
	storageGet()

	while (ideasContainer.firstChild) {
		ideasContainer.firstChild.remove()
	}

	let sortedArray: Idea[] = [...ideas]

	if (hideChecked) sortedArray = sortedArray.filter((idea: Idea) => !idea.checkBox)
	if (ranked) sortedArray = sortedArray.sort((a: Idea, b: Idea) => b.rank - a.rank)

	sortedArray.forEach((idea: Idea, index: number): void => {
		const interactionsDiv = document.createElement('div') as HTMLDivElement
		const ideaCardDiv = document.createElement('div') as HTMLDivElement
		const rankNumDiv = document.createElement('div') as HTMLDivElement
		const rankDiv = document.createElement('div') as HTMLDivElement
		const rankUp = document.createElement('img') as HTMLImageElement
		const name = document.createElement('h2') as HTMLHeadingElement
		const rankDown = document.createElement('img') as HTMLImageElement
		const checkBox = document.createElement('input') as HTMLInputElement
		const categoryLogo = document.createElement('img') as HTMLImageElement
		const rankNumber = document.createElement('h4') as HTMLHeadingElement
		const description = document.createElement('h3') as HTMLHeadingElement
		const deleteBtn = document.createElement('Button') as HTMLButtonElement

		checkBox.type = 'checkbox'
		name.textContent = idea.name
		deleteBtn.textContent = 'Delete'
		checkBox.checked = idea.checkBox
		categoryLogo.src = idea.categoryImg
		rankNumber.textContent = String(idea.rank)
		description.textContent = idea.description
		rankUp.src = 'assets/img/mdi_arrow-up-bold.svg'
		rankDown.src = 'assets/img/mdi_arrow-down-bold.svg'
		interactionsDiv.id = 'interactions'

		ideaCardDiv.id = 'idea-card'
		categoryLogo.id = 'c-logo'
		rankNumDiv.id = 'rankNum'
		checkBox.id = 'check'
		rankDiv.id = 'rank'

		checkBox.addEventListener('change', (): void => {
			checkBox.checked ? (ideaCardDiv.style.opacity = '0.5') : (ideaCardDiv.style.opacity = '1')
			idea.checkBox = !idea.checkBox
			storageSet()
		})

		checkBox.checked ? (ideaCardDiv.style.opacity = '0.5') : (ideaCardDiv.style.opacity = '1')
		deleteBtn.addEventListener('click', (): void => {
			ideas.splice(index, 1)
			storageSet()
			render()
		})

		rankUp.addEventListener('click', (): void => {
			idea.rank >= 10 ? (idea.rank = 10) : idea.rank++
			storageSet()
			render()
		})

		rankDown.addEventListener('click', (): void => {
			idea.rank <= 0 ? (idea.rank = 0) : idea.rank--
			storageSet()
			render()
		})

		rankNumDiv.append(rankNumber)

		rankDiv.append(rankUp, rankDown)
		interactionsDiv.append(rankNumDiv, rankDiv, deleteBtn)
		ideaCardDiv.append(checkBox, categoryLogo, name, description, interactionsDiv)
		ideasContainer.append(ideaCardDiv)
	})
}

sortButton.addEventListener('click', (): void => {
	ranked = !ranked
	ranked
		? (sortButton.style.backgroundColor = 'rgb(21,21,21)')
		: (sortButton.style.backgroundColor = 'rgb(126,126,126)')
	render()
})

checkedButton.addEventListener('click', (): void => {
	hideChecked = !hideChecked
	hideChecked
		? (checkedButton.style.backgroundColor = 'rgb(21,21,21)')
		: (checkedButton.style.backgroundColor = 'rgb(126,126,126)')
	render()
})

logoShowcaseSelect.addEventListener('change', (): void => {
	logoShowcase.src = `/assets/img/${logoShowcaseSelect.value}.svg`
})

submitButton.addEventListener('click', (): void => {
	create()
	render()
})

document.body.addEventListener('mousemove', (e: MouseEvent): void => {
	;(cursor.style.left = e.clientX + 'px'), (cursor.style.top = e.clientY + 'px')
})

document.body.addEventListener('mousedown', () => {
	cursor.style.scale = '0.9'
})

document.body.addEventListener('mouseup', () => {
	cursor.style.scale = '1'
})

storageGet()
render()
