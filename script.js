const userName = prompt("Digite seu nome:");

let todoList = [];
const header = document.querySelector(".header");
header.innerHTML = `
 <h1>${userName}'s todo list: ${new Date().toLocaleDateString()}</h1>
`

function addFeature() {
    const featureName = document.querySelector('.input-feature').value;
    const featureDescription = document.querySelector('.input-description').value;

    try {
        if (todoList.length > 0) {
            for (let value of todoList) {
                    if (featureName === value.name) {
                        throw new Error("Essa tarefa já existe!")
                    }
                }
        }

        if(featureName.length < 4 || featureDescription.length < 20){
            throw new Error("O título deve conter no mínimo 4 caracteres e a descrição no mínimo 20 caracteres");
        }

        let onlyLetters = featureName.replace(/[0-9]/g,'');
        if(onlyLetters.length < 4){
            throw new Error("O título deve conter no mínimo 4 caracteres e não pode conter apenas números.")   
        }

        todoList.push({
            id: todoList.length > 0? todoList.length: 0,
            name: featureName,
            description: featureDescription,
        })

        const listUl = document.querySelector(".list");
        listUl.innerHTML = "";

        for (let feat of todoList) {
            listUl.innerHTML = listUl.innerHTML + `
         <li class="feat">
            <div class="content-feat">
              <div class="delete-edit">
                <button onclick="editionFeature(${feat.id})">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button onclick="deleteFeature(${feat.id})">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
              <p>${feat.name}</p>
              <button class="check-button" onclick="checkFeature(${feat.id})"><i class="fa-solid fa-check"></i></button>
            </div>
            <div class="description-feature">
              ${feat.description}
            </div>
          </li>
        `
        }

        const featureNameEmpty = document.querySelector('.input-feature');
        const featureDescriptionEmpty = document.querySelector('.input-description');
        featureNameEmpty.value = "";
        featureDescriptionEmpty.value = "";

    } catch (error) {
        alert(error);
    }
}

function deleteFeature(id){
  const response = confirm("você deseja excluir essa tarefa?");

  if(response === true){
    const array = todoList.filter(object => {
      return object.id !== id;
    });

    todoList = array;

    const listUl = document.querySelector(".list");
    listUl.innerHTML = "";

    for (let feat of todoList) {
      listUl.innerHTML = listUl.innerHTML + `
         <li class="feat">
            <div class="content-feat">
              <div class="delete-edit">
                <button onclick="editionFeature(${feat.id})">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button onclick="deleteFeature(${feat.id})">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
              <p>${feat.name}</p>
              <button class="check-button" onclick="checkFeature(${feat.id})"><i class="fa-solid fa-check"></i></button>
            </div>
            <div class="description-feature">
              ${feat.description}
            </div>
          </li>
        `
    }
  }
}

function editionFeature(id){
  let newName = prompt("Digite o novo título");
  let newDescription = prompt("Digite a  nova descrição");
  todoList[id].name = newName;
  todoList[id].description = newDescription;

  const listUl = document.querySelector(".list");
  listUl.innerHTML = "";

  for (let feat of todoList) {
    listUl.innerHTML = listUl.innerHTML + `
         <li class="feat">
            <div class="content-feat">
              <div class="delete-edit">
                <button onclick="editionFeature(${feat.id})">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button onclick="deleteFeature(${feat.id})">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
              <p>${feat.name}</p>
              <button class="check-button" onclick="checkFeature(${feat.id})"><i class="fa-solid fa-check"></i></button>
            </div>
            <div class="description-feature">
              ${feat.description}
            </div>
          </li>
        `
  }
}

function checkFeature(id){
  console.log("clicou")
}