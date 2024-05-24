
class Blog {
    #title;
    #content;
    #author;
    #creationDate;

    constructor(title, content, author, creationDate) {
        this.#title = title;
        this.#content = content;
        this.#author = author;
        this.#creationDate = creationDate;
    }

    get title() {
        return this.#title;
    }

    get content() {
        return this.#content;
    }

    get author() {
        return this.#author;
    }

    get creationDate() {
        return this.#creationDate;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    let blogData = [];

    function updateTable(data) {
        const blogList = document.getElementById("blog-list");
        blogList.innerHTML = "";

        data.forEach((blog, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${blog.title}</td>
            <td>
                <span class="content">${blog.content}</span>
                <input type="text" class="edit-content" style="display: none;">
            </td>
            <td>
                <span class="author">${blog.author}</span>
                <input type="text" class="edit-author" style="display: none;">
            </td>
            <td>${blog.creationDate}</td>
            <td>
                <button class="edit-button" style="display: block;">Edit</button>
                <button class="save-button" style="display: none;">Save</button>
            </td>
        `;
            blogList.appendChild(row);

            const editButton = row.querySelector(".edit-button");
            const editContent = row.querySelector(".edit-content");
            const editAuthor = row.querySelector(".edit-author");
            const contentSpan = row.querySelector(".content");
            const authorSpan = row.querySelector(".author");
            const saveButton = row.querySelector(".save-button");

            editButton.addEventListener("click", () => {
                // Toggle the display of input fields and spans
                editContent.style.display = "block";
                editContent.value = contentSpan.textContent;
                contentSpan.style.display = "none";

                editAuthor.style.display = "block";
                editAuthor.value = authorSpan.textContent;
                authorSpan.style.display = "none";

                saveButton.style.display = "block";
                editButton.style.display = "none";
            });

            saveButton.addEventListener("click", () => {
                // Save the edited content and author
                contentSpan.textContent = editContent.value;
                authorSpan.textContent = editAuthor.value;

                // Toggle the display back to the edit button
                editContent.style.display = "none";
                contentSpan.style.display = "block";
                editAuthor.style.display = "none";
                authorSpan.style.display = "block";
                saveButton.style.display = "none";
                editButton.style.display = "block";
            });
        });
    }


    const addBlog = (blog, parent) => {
        const row = document.createElement('tr');
        const title = document.createElement('td');
        const content = document.createElement('td');
        const author = document.createElement('td');
        const creationDate = document.createElement('td');
        const editCell = document.createElement('td');

        row.appendChild(title);
        row.appendChild(content);
        row.appendChild(author);
        row.appendChild(creationDate);
        row.appendChild(editCell);

        parent.appendChild(row);

        title.textContent = blog.title;
        content.textContent = blog.content;
        author.textContent = blog.author;
        creationDate.textContent = blog.creationDate;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const editContent = document.createElement('input');
            editContent.type = 'text';
            editContent.value = content.textContent;
            const editAuthor = document.createElement('input');
            editAuthor.type = 'text';
            editAuthor.value = author.textContent;

            content.innerHTML = '';
            author.innerHTML = '';
            content.appendChild(editContent);
            author.appendChild(editAuthor);

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', () => {
                const newContent = editContent.value;
                const newAuthor = editAuthor.value;
                content.innerHTML = newContent;
                author.innerHTML = newAuthor;
                editCell.removeChild(saveButton); // Remove the save button from its parent (editCell)
            });

            editCell.appendChild(saveButton);
        });

        editCell.appendChild(editButton);
    };


    const tBody = document.getElementById('blog-list');

    const fetchBlogs = () => {
        const blogURI = "json/blogs.json";
        const xhr = new XMLHttpRequest();
        xhr.open('GET',blogURI);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                blogData = JSON.parse(xhr.responseText);
                updateTable(blogData);
            }
        };

        // Send the XMLHttpRequest
        xhr.send();
    }

    const updateButton = document.getElementById("update-button");
    updateButton.addEventListener('click', () => {
        const title = prompt("Enter the title:");
        const content = prompt("Enter the content:");
        const author = prompt("Enter the author:");
        const creationDate = formattedDate;

        if (title && content && author && creationDate) {
            const blog = new Blog(title, content, author, creationDate);
            addBlog(blog, tBody);
        }
    });


    function formatDate(date) {
        const now = new Date();

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();



        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    const today = new Date();
    const formattedDate = formatDate(today);

    fetchBlogs();
});