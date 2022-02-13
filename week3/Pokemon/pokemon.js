let flexHeader = document.createElement("div")
document.body.appendChild(flexHeader);

let header = document.createElement("h1");
header.textContent = "Pokemon Characters List!";
flexHeader.appendChild(header);

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://pokeapi.co/api/v2/pokemon", true);
xhr.send();

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let pokemonData = JSON.parse(xhr.responseText)
        displayData(pokemonData.results);
    } else if (xhr.readyState == 4 && xhr.status !== 200) {
        let failedToGet = document.createElement("h2");
        failedToGet.textContent = "Oops! API load failed.";
        document.body.appendChild(failedToGet);
    }
}

function displayData(data) {
    data.forEach(function(_element, index) {
        let newEntry = document.createElement("h2");
        newEntry.textContent = data[index].name;
        document.body.appendChild(newEntry);

        let newList = document.createElement("ol");
        document.body.appendChild(newList);

        const xml = new XMLHttpRequest();
        xml.open("GET", `https://pokeapi.co/api/v2/pokemon/${index+1}`, true);
        xml.send();

        xml.onreadystatechange = function() {
            if (xml.readyState == 4 && xml.status == 200) {
                let apiData = JSON.parse(xml.responseText);
                displayDetails(apiData.types);
            } else if (xml.readyState == 4 && xml.status !== 200) {
                let failedToGet = document.createElement("li");
                failedToGet.textContent = "Oops! API load failed.";
                newList.appendChild(failedToGet);
            }
        }

        function displayDetails(data) {
            data.forEach(function(_element, index) {
                let newListEntry = document.createElement("li");
                newListEntry.textContent = data[index].type.name;
                newList.appendChild(newListEntry);
            })
        }
    });


};