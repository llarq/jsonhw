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
  value = inputEl.value.trim();
  if (value.trim() === "") {
    return
  };
  bookmarks.push(value);
  saveBookmarks();
  renderBookmarks();
  inputEl.value = "";
};

function renderBookmarks() {
  listEl.innerHTML = bookmarks
		.map(
			(value, index) => `
        <li>
          <a href="${value}" target="_blank" rel="noopener noreferrer">${value}</a>
          <button data-action="edit" data-index="${index}">Edit</button>
          <button data-action="delete" data-index="${index}">Delete</button>
        </li>
      `
		)
		.join('')
}

addBtn.addEventListener("click", () => {
	const value = inputEl.value.trim();
	if (!value) { return }
	
	bookmarks.push(value);
	saveBookmarks();
	renderBookmarks();
	inputEl.value = "";
})

listEl.addEventListener("click", (e) => {
	const btn = e.target
	const index = btn.dataset.index

	if (btn.dataset.action === 'delete') {
		bookmarks.splice(index, 1)
		saveBookmarks()
		renderBookmarks()
	}

	if ((btn.dataset.action === 'edit')) {
		const newValue = prompt('Change url:', bookmarks[index])
		if (newValue && newValue.trim()) {
			bookmarks[index] = newValue.trim()
			saveBookmarks()
			renderBookmarks()
		}
	}
})
renderBookmarks()