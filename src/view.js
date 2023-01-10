import {
    createPencilSVG,
    createContactIconSVG,
    createCrossSVG,
    createArrowSVG,
    createCreatePopupRectWithText
} from "./view-svg.js";
import {PATCH_LISTENER, getDateAndTimeFromApi} from "./main.js"

export let inputFieldCount = 0;
export let clientForDeletion = null;

const CONTACT_TYPES = ["Телефон", "Доп. Телефон", "Email", "Vk", "Facebook", "Другое"];

function createTable(customers) {
    let mainContainer = document.getElementById("main-container");
    customers.forEach(elem => {
        createCustomerEntry(elem).forEach(elem => {
            mainContainer.append(elem);
        })
    });
}

function createCustomerEntry({contacts, createdAt, id, lastName, name, surname, updatedAt}) {
    createdAt = getDateAndTimeFromApi(createdAt.split("T"));
    updatedAt = getDateAndTimeFromApi(updatedAt.split("T"));

    let divId = document.createElement("div");
    divId.classList.add("id");

    divId.textContent = id;
    let divName = document.createElement("div");
    divName.classList.add("name");

    divName.textContent = `${surname} ${name} ${lastName}`;
    let divCreationDate = document.createElement("div");
    divCreationDate.classList.add("created-at");

    divCreationDate.textContent = `${createdAt[0]} ${createdAt[1]}`;
    let divModificationDate = document.createElement("div");
    divModificationDate.classList.add("modified-at");

    divModificationDate.textContent = `${updatedAt[0]} ${updatedAt[1]}`
    for (const divElem of [divId, divName, divCreationDate, divModificationDate])
        divElem.classList.add("table__item");

    let contactListDiv = document.createElement("div");

    contactListDiv.classList.add("table__item", "contact-list");
    if (contacts.length > 5) contactListDiv.classList.add("less-padding");
    for (const contact of contacts)
        contactListDiv.append(createContactEntry(contact));

    let actionsListDiv = document.createElement("div");

    actionsListDiv.classList.add("table__item", "actions-list");
    let changeButton = document.createElement("button");
    changeButton.id = "change_button-" + id;
    changeButton.classList.add("item__actions-list__button");
    changeButton.setAttribute("data-bs-toggle", "modal");
    changeButton.setAttribute("data-bs-target", "#staticBackdrop");
    changeButton.type = "button";

    changeButton.append(createPencilSVG());
    let changeButtonText = document.createElement("span");
    changeButtonText.textContent = "Изменить";
    changeButton.append(changeButtonText);

    changeButton.addEventListener("click", () => {
        inputFieldCount = contacts.length;
        location.hash = "#client=" + id;
        createModificationModal({id, contacts, lastName, name, surname});
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("item__actions-list__button");
    deleteButton.setAttribute("data-bs-toggle", "modal");
    deleteButton.setAttribute("data-bs-target", "#modalDelete");
    deleteButton.type = "button";

    deleteButton.addEventListener("click", () => {
        clientForDeletion = id;
    });

    deleteButton.append(createCrossSVG());
    let deleteButtonText = document.createElement("span");

    deleteButtonText.textContent = "Удалить";

    deleteButton.append(deleteButtonText);
    actionsListDiv.append(changeButton);

    actionsListDiv.append(deleteButton);
    return [divId, divName, divCreationDate, divModificationDate, contactListDiv, actionsListDiv];
}

function createModificationModal({id, contacts, lastName, name, surname}) {
    let label = document.getElementById("modal-label");
    label.textContent = "Изменить данные";

    let idLabel = document.createElement("span");
    idLabel.classList.add("small-text-label");

    label.append(idLabel);

    setModalNameFields(surname, name, lastName);

    let container = document.getElementById("modal-contact-grid-container");
    container.innerHTML = "";
    if (contacts.length) {
        document.getElementById("add-contact-button-modal").classList.remove("small-padding");
        document.getElementById("modal-contact-list").classList.remove("small-padding");
    }
    contacts.forEach(elem =>
        createModalContactBar(elem.type, elem.value).forEach(gridElem => container.append(gridElem)));

    // replacing button listeners
    let button = document.getElementById("modal-form-submit");
    let newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    newButton.addEventListener("click", (e) => {
        e.preventDefault();
        location.hash = "#";

        createLoadingForSaveButtons(newButton);
        PATCH_LISTENER(id);
    });

    return button;
}

function setModalNameFields(surname, name, lastName) {
    document.getElementById("modal-surname").value = surname;
    document.getElementById("modal-name").value = name;
    document.getElementById("modal-lastName").value = lastName;
}

function createModalContactBar(selectedContact = "Vk", defaultValue = null) {
    let dropdownDiv = document.createElement("div");
    dropdownDiv.classList.add("dropdown");

    let buttonContactType = document.createElement("button");
    buttonContactType.classList.add("modal__contact-item", "modal__contact-redact-dropdown");
    buttonContactType.setAttribute("data-bs-toggle", "dropdown");
    buttonContactType.setAttribute("aria-expanded", "false");

    let selectedTypeDiv = document.createElement("span");
    selectedTypeDiv.classList.add("current-contact-span");
    selectedTypeDiv.textContent = CONTACT_TYPES.includes(selectedContact) ? selectedContact : "Другое";
    selectedTypeDiv.id = `selected-type-number-${inputFieldCount}`;

    let arrowSVG = createArrowSVG();

    [selectedTypeDiv, arrowSVG].forEach(elem => buttonContactType.append(elem));

    let contactMenu = document.createElement("ul");
    contactMenu.classList.add("dropdown-menu", "dropdown-menu-end");
    //contactMenu.setAttribute("aria-labelledby", id);

    let listElement;
    for (const contact of CONTACT_TYPES) {
        if (contact === selectedContact) continue;
        listElement = document.createElement("li");
        listElement.className = "dropdown-item";
        listElement.textContent = contact;
        listElement.addEventListener("click", (e) => {
            selectedTypeDiv.textContent = contact;
        });

        contactMenu.append(listElement);
    }

    [buttonContactType, contactMenu].forEach(elem => dropdownDiv.append(elem));

    let contactInput = document.createElement("input");
    contactInput.classList.add("modal__contact-item", "modal__contact-redact-input__data");
    contactInput.type = "text";
    contactInput.placeholder = "Введите данные контакта";
    contactInput.value = defaultValue || "";

    let buttonClear = document.createElement("button");
    buttonClear.type = "button";
    buttonClear.classList.add("modal__contact-item", "modal__contact-redact-input_clear");
    buttonClear.append(createCrossSVG("#B0B0B0"));
    buttonClear.addEventListener("click", () => {
        console.log(inputFieldCount);
        document.getElementById("add-contact-button-modal").disabled = false;
        if (inputFieldCount <= 1) {
            document.getElementById("add-contact-button-modal").classList.add("small-padding");
            document.getElementById("modal-contact-list").classList.add("small-padding");
        }
        --inputFieldCount;

        dropdownDiv.remove();
        contactInput.remove();
        buttonClear.remove();
    });

    return [dropdownDiv, contactInput, buttonClear];
}

function createModalNewClient() {
    let mainContainer = document.getElementById("modal-contact-list");
    mainContainer.classList.add("small-padding");

    let divContainer = document.createElement("div");
    divContainer.id = "modal-contact-grid-container";
    divContainer.classList.add("modal__contact-redact-input");

    //createModalContactBar(id, selectedContact).forEach(elem => divContainer.append(elem));

    let addContactButton = document.createElement("button");
    addContactButton.id = "add-contact-button-modal";
    addContactButton.classList.add("modal__contact-new-contact-button");
    addContactButton.classList.add("small-padding");
    addContactButton.addEventListener("click", (e) => {
        console.log(inputFieldCount);
        if (++inputFieldCount > 10) {
            addContactButton.disabled = true;
            --inputFieldCount;
            return;
        }

        e.preventDefault();

        mainContainer.classList.remove("small-padding");
        addContactButton.classList.remove("small-padding");
        createModalContactBar().forEach(elem => divContainer.append(elem));
    });

    let plusSVG = createCrossSVG("#9873FF");
    plusSVG.style.transform = "rotate(45deg)";
    addContactButton.append(plusSVG);

    let buttonText = document.createElement("span");
    buttonText.textContent = "Добавить контакт";

    [plusSVG, buttonText].forEach(elem => addContactButton.append(elem));
    [divContainer, addContactButton].forEach(elem => mainContainer.append(elem));
}

function createContactEntry(contactData) {
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("popup");

    containerDiv.append(createContactIconSVG(contactData.type));

    let contactDataDiv = document.createElement("div");
    contactDataDiv.classList.add("contact-data");
    contactDataDiv.style.display = "none";
    contactDataDiv.append(createCreatePopupRectWithText(contactData));

    containerDiv.append(contactDataDiv);
    return containerDiv;
}

function createSpinner() {
    let spinner = document.createElement("div");
    spinner.classList.add("spinner-border");
    spinner.setAttribute("role", "status");
    spinner.style.color = "#9873FF";

    return spinner;
}

function createLoadingForClientsTable() {
    let div = document.createElement("div");
    div.style.gridColumn = "span 6";
    div.style.gridRow = "span 5";
    div.style.display = "grid";
    div.style.alignItems = "center";
    div.style.justifyItems = "center";
    div.style.backgroundColor = "#FFFFFF";

    div.append(createSpinner());

    return div;
}

function createLoadingForSaveButtons(button) {
    button.style.backgroundColor = "#8052FF";
    button.textContent = "";

    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.gap = "5px";

    let p = document.createElement("p");
    p.textContent = "Сохранить";

    let spinner = createSpinner();
    spinner.style = "width: 1rem; height: 1rem; color: #B89EFF;";

    div.append(spinner);
    div.append(p);

    button.appendChild(div);
    button.style.height = "39px";
}

function removeLoadingForSaveButtons(button) {
    button.style.backgroundColor = "#9873FF";
    console.log(button);
    button.children[0].children[0].remove();
}

function createAutocompleteListElement(customer) {
    let li = document.createElement("li");
    li.setAttribute("tabindex", "-1");
    li.classList.add("autocomplete-li");
    // li.textContent = customer.surname + " " + customer.name + " " + customer.lastName;
    li.textContent = customer;

    return li;
}

function createErrorMessage(message) {
    let p = document.createElement("p");
    p.classList.add("error-text");
    p.textContent = message;

    return p;
}

function displayErrorList(content) {
    let errorDiv = document.getElementById("modal-errors");
    errorDiv.innerHTML = "";

    errorDiv.style.display = "block";

    content.errors.forEach(error => {
        errorDiv.append(createErrorMessage(error.message));
    });

    if (!content.errors) {
        errorDiv.append(createErrorMessage("Что-то пошло не так"));
    }
}

export {
    createTable,
    createModalNewClient,
    createContactEntry,
    setModalNameFields,
    createModificationModal,
    createLoadingForClientsTable,
    createLoadingForSaveButtons,
    removeLoadingForSaveButtons,
    createAutocompleteListElement,
    createErrorMessage,
    displayErrorList
}