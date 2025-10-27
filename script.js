// 1.Створіть "закладки" — список посилань на важливі сторінки. Додавайте, видаляйте та редагуйте посилання в списку, зберігайте його в localStorage, щоб він залишався між сесіями.

const inputEl = document.getElementById('bookmarkInput')
const addBtn = document.getElementById('addBookmarkBtn')
const listEl = document.getElementById('bookmarkList')

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []

function saveBookmarks() {
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

addBtn.addEventListener("click", onAddBookmarks)

function onAddBookmarks() {
  value = input.value.trim();
  if (value.tim() === "") {
    return
  };
  bookmarks.push(value);
  saveBookmarks();
  renderBookmarks();
  input.value = "";
};

function renderBookmarks() {
	listEl.innerHTML = ''

	bookmarks.forEach((value, index) => {
		const li = document.createElement('li')
		const a = document.createElement('a')
		const editBtn = document.createElement('button')
		const delBtn = document.createElement('button')

		a.href = value
		a.textContent = value
		a.target = '_blank'
		a.rel = 'noopener noreferrer'

		editBtn.textContent = 'Edit'
		delBtn.textContent = 'Delete'

		editBtn.dataset.index = index
		delBtn.dataset.index = index


		delBtn.addEventListener('click', () => {
			bookmarks.splice(index, 1)
			saveBookmarks()
			renderBookmarks()
		})


		editBtn.addEventListener('click', () => {
			const newUrl = prompt('Введіть новий URL:', value)
			if (newUrl && newUrl.trim() !== '') {
				bookmarks[index] = newUrl.trim()
				saveBookmarks()
				renderBookmarks()
			}
		})

		li.appendChild(a)
		li.appendChild(editBtn)
		li.appendChild(delBtn)
		listEl.appendChild(li)
	})
}


addBtn.addEventListener('click', () => {
	const value = inputEl.value.trim()
	if (value === '') return

	bookmarks.push(value)
	saveBookmarks()
	renderBookmarks()
	inputEl.value = ''
})


renderBookmarks()