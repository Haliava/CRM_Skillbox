import {
    createTable,
    createModalNewClient,
    setModalNameFields,
    clientForDeletion,
    createLoadingForClientsTable,
    createLoadingForSaveButtons,
    createAutocompleteListElement
} from "./view.js";

let selectedAutocompleteOptionNumber = -1;
let autocompleteMAX = 10;
let mainContainer = document.getElementById("main-container");
let loadingTable = createLoadingForClientsTable();
mainContainer.append(loadingTable);

export let customerData = await (await fetch("http://localhost:3000/api/clients")).json();

loadingTable.remove();

let idToCustomerDict = {};
for (const customer of customerData)
    idToCustomerDict[customer.id] = [customer.id, customer.contacts, customer.lastName, customer.name, customer.surname];

/*
arrow-sort-by-id
arrow-sort-by-name
arrow-sort-by-creation
arrow-sort-by-modification
 */
let idSort = (a, b) => {
    return (a.id < b.id) - (a.id > b.id);
}

let nameSort = (a, b) => {
    a = a.surname + a.name + a.lastName;
    b = b.surname + b.name + b.lastName;
    return (a < b) - (a > b);
}

let createdAtSort = (a, b) => {
    a = new Date(a.createdAt);
    b = new Date(b.createdAt);
    return (a < b) - (a > b);
}

let modifiedAtSort = (a, b) => {
    a = new Date(a.updatedAt);
    b = new Date(b.updatedAt);
    return (a < b) - (a > b);
}

let sorts = {
    "arrow-sort-by-id": idSort,
    "arrow-sort-by-name": nameSort,
    "arrow-sort-by-creation": createdAtSort,
    "arrow-sort-by-modification": modifiedAtSort
}

export let DELETE_LISTENER = (id) => {
    fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "DELETE",
    });
}

export let PATCH_LISTENER = (id) => {
    let surname = document.getElementById("modal-surname").value;
    let name = document.getElementById("modal-name").value;
    let lastName = document.getElementById("modal-lastName").value;
    let contactList = document.getElementById("modal-contact-grid-container").children;
    let contacts = [];

    let currentType = null;
    for (const child of contactList) {
        if (child.tagName.toLowerCase() === "div") {
            currentType = child.children[0].children[0].textContent; // костыльно, но работает
        } else if (child.tagName.toLowerCase() === "input" && currentType) {
            contacts.push({'type': currentType, 'value': child.value});
            currentType = null;
        }
    }

    fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            surname,
            name,
            lastName,
            contacts
        })
    })
        .then(() => {
            location.reload();
        })
        .catch(
        (reason) => {
            alert(`FAILED TO PATCH: ${reason}`);
        }
    );

};

function getDateAndTimeFromApi(elem) {
    return [
        elem[0].split("-").reverse().join("."),  // Date
        elem[1].split(":").slice(0, 2).join(":") // Time
    ];
}

async function generatePage() {
    setEventListeners();
    let formInputFields;

    createTable(customerData);
    createModalNewClient();

    let addClientFromModal = document.getElementById("modal-form-submit");
    addClientFromModal.addEventListener("click", (e) => {
        e.preventDefault();
        createLoadingForSaveButtons(addClientFromModal);

        formInputFields = saveDataFromModal();

        let data = {};
        Object.entries(formInputFields).forEach((elem) => {
            let [k, v] = elem;
            if (v !== null) data[k] = v;
            else data[k] = null;
        });

        if (!addNewClient(data)) alert('FAILED TO ADD NEW CLIENT');
        else location.reload();
    });

    openModalFromHash();
}

function saveDataFromModal() {
    let arrTo = {};

    arrTo.surname = document.getElementById("modal-surname").value;
    arrTo.name = document.getElementById("modal-name").value;
    arrTo.lastName = document.getElementById("modal-lastName").value;
    arrTo.contacts = [];

    let types = document.getElementsByClassName("current-contact-span");
    let data = document.getElementsByClassName("modal__contact-redact-input__data");

    for (let i = 0; i < types.length; i++) {
        arrTo.contacts.push(
            {"type": types[i].textContent, "value": data[i].value}
        );
    }

    return arrTo;
}

function displaySearchResult(input) {
    if (input.length <= 0) {
        createTable(customerData);
        return;
    }

    let foundCustomers = customerData.filter(customer =>
        (customer.surname + customer.name + customer.lastName).toLowerCase().includes(input.replaceAll(" ", "").toLowerCase())
    );

    document.querySelectorAll(".table__item").forEach(elem => elem.remove());
    createTable(foundCustomers);
}

function setEventListeners() {
    let tmpLi;
    let foundCustomers;

    let autoList = document.getElementById("autocomplete-list");
    autoList.style.listStyle = "none";
    autoList.style.width = "100%";
    autoList.style.padding = "0";

    let input = document.getElementById("header-input");

    let timer;
    let throttleTimerHandler = () => {
        displaySearchResult(document.getElementById("header-input").value);
    };

    document.getElementById("header-input").addEventListener("input", () => {
        if (!timer)
            timer = setTimeout(throttleTimerHandler, 300);

        clearTimeout(timer);
        timer = setTimeout(throttleTimerHandler, 300);

        autoList.innerHTML = "";
        if (input.value.length <= 0) {
            selectedAutocompleteOptionNumber = -1;
            return;
        }

        foundCustomers = getFoundCustomers(input.value);
        for (let i = 0; i < Math.min(autocompleteMAX, foundCustomers.length); i++) {
            tmpLi = createAutocompleteListElement(foundCustomers[i]);
            tmpLi.id = "auto-li-" + i;
            tmpLi.addEventListener("click", (e) => {
                // input.value = [foundCustomers[i].surname, foundCustomers[i].name,foundCustomers[i].lastName].join(" ");
                input.value = foundCustomers[i];
                throttleTimerHandler();
            });

            autoList.append(tmpLi);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (document.activeElement.tagName !== "LI" && document.activeElement.tagName !== "INPUT") return;

        let setInputValue = () => {
            let li = document.getElementById("auto-li-" + selectedAutocompleteOptionNumber);
            input.value = li.textContent;
            li.focus();
        };

        switch (e.key) {
            case "ArrowDown":
                ++selectedAutocompleteOptionNumber;
                setInputValue();
                break;

            case "ArrowUp":
                --selectedAutocompleteOptionNumber;
                setInputValue();
                break;

            case "Backspace":
            case " ":
                selectedAutocompleteOptionNumber = -1;
                input.focus();
                break;

            case "Enter":
                displaySearchResult(input.value);
                break;
        }
    })

    document.addEventListener("cancel", () => displaySearchResult(""));

    document.getElementById("header-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    document.getElementById("add-client-button").addEventListener("click", () => {
        document.getElementById("modal-label").textContent = "Новый клиент";
        document.getElementById("modal-contact-list").classList.add("small-padding");
        document.getElementById("modal-contact-grid-container").innerHTML = "";
        setModalNameFields("", "", "");

        document.getElementById("add-contact-button-modal").classList.add("small-padding");
    });

    document.getElementById("modal-delete-button").addEventListener("click", (e) => {
        DELETE_LISTENER(clientForDeletion);
        location.reload();
    });

    for (const filterElem of Object.keys(sorts)) {
        let pElem = document.getElementById(filterElem);
        let arrow = pElem.children[pElem.children.length - 1].children[0];

        pElem.addEventListener("click", (e) => {
            for (const elem of document.getElementsByClassName("rotating-arrow")) {
                if (elem === arrow) continue;
                elem.style.transform = "";
            }
            arrow.style.transform = arrow.style.transform ? "" : "rotate(180deg)";

            sortCustomers(filterElem, !!arrow.style.transform); // если есть transform - по возрастанию, если нет - по убыванию
        });
    }
}

function getFoundCustomers(input) {
    let res = [];
    let wordCount = input.split(" ").length > 3 ? 3 : input.split(" ").length;
    let getName = (wordCount, customer) => {
        let nameArr = [customer.surname, customer.name, customer.lastName].slice(0, wordCount);
        return nameArr.join(" ").toLowerCase();
    }

    for (const customer of customerData)
        if (getName(wordCount, customer).includes(input.toLowerCase()))
            res.push(getName(wordCount, customer));

    if (res.length <= 0)
        for (const customer of customerData)
            if (getName(3, customer).includes(input.replaceAll(" ", "").toLowerCase()))
                res.push(getName(3, customer));

    return res;
}

function sortCustomers(filterName, isReversed = false) {
    let dataCopy = [...customerData];

    dataCopy.sort(sorts[filterName]);
    if (isReversed) dataCopy = dataCopy.reverse();

    for (let elem of document.querySelectorAll(".table__item"))
        elem.remove();

    createTable(dataCopy);
}

async function addNewClient({name, surname, lastName, contacts}) {
    // todo validate all fields

    let resp = await fetch("http://localhost:3000/api/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            surname,
            lastName,
            contacts,
        }),
    });

    return resp.status;
}

function openModalFromHash() {
    if (document.getElementById("staticBackdrop").classList.contains("show"))
        return;

    document.getElementById("change_button-" + location.hash.split("=")[1]).click();
}

export {generatePage, getDateAndTimeFromApi}