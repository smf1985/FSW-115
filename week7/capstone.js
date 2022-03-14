const uList = document.createElement('ul');
getData();


async function getData() {
    const listRes = await axios.get('http://api.bryanuniversity.edu/Stephanie_Freeman/list');
    const dogRes = await axios.get('https://dog.ceo/api/breeds/image/random');
    const pendingDataPromises = [listRes, dogRes.data.message];
    Promise.all(pendingDataPromises) 
        .then(data => createList(data))
        .catch(err => console.log(err))
}

function displayImage(data) {
    let image = document.createElement('img');
    image.setAttribute('src', data);
    document.body.appendChild(image);
}

function createList(data) {
    
    let lists = data[0].data;
    for (let i = 0; i < lists.length; i++) {
        
            let li = document.createElement('li');
            li.setAttribute('id', lists[i]._id);
            li.innerHTML += `
                ${lists[i].description}
                <button onClick="updateLi()">&#10003</button>
                <button onclick="deleteLi()">&#10006</button>
            `
            uList.appendChild(li);
        
    }
    document.body.appendChild(uList);
    displayImage(data[1]);
}

async function deleteLi() {
    let listID = this.event.target.parentNode.id;
    let response = await axios.delete(`http://api.bryanuniversity.edu/Stephanie_Freeman/list/${listID}`);
    location.reload();
}

function updateLi() {
    let item = this.event.target.parentNode;
    item.style.textDecoration = 'line-through';
    const updates = {
        isComplete: true
    }

    axios.put(`http://api.bryanuniversity.edu/Stephanie_Freeman/list/${item.id}`, updates)
        .then (res => console.log(res))
        .catch(err => console.log(err))
    
}

document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    const newTodo = {
        title: document.querySelector('#list-item').value,
        description: document.querySelector('#list-description').value,
        completed: false
    }
    axios.post('http://api.bryanuniversity.edu/Stephanie_Freeman/list', newTodo)
        .then(data => appendToList(data))
        .catch(err => console.log(err))
        
});

function appendToList(data) {
    let li = document.createElement('li');
    li.textContent = data.data.description;
    document.querySelector('ul').appendChild(li);
    location.reload();
}




