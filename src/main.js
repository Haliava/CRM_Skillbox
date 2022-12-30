import {createTable, createModalNewClient, setModalNameFields, clientForDeletion} from "./view.js";

export let customerData = await (await fetch("http://localhost:3000/api/clients")).json();
export let clientIdMap = new Map();
customerData.map((val, index) =>
    clientIdMap[index] = customerData[index].id);

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
    let contactData = [];

    let currentType = null;
    for (const child of contactList) {
        if (child.tagName.toLowerCase() === "div") {
            currentType = child.children[0].children[0].textContent; // костыльно, но работает
        } else if (child.tagName.toLowerCase() === "input" && currentType) {
            contactData.push({'"type"': currentType, '"value"': child.value});
            currentType = null;
        }
    }
    console.log(contactData);

    fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            surname,
            name,
            lastName,
            contactData
        })
    })
        .then((msg) => {
            console.log(msg, id);
        })
        .catch(
        (reason) => {
            alert(`FAILED TO PATCH: ${reason}`);
        }
    );

};

async function generatePage() {
    setEventListeners();
    let formInputFields;

    createTable(customerData);
    createModalNewClient();

    let addClientFromModal = document.getElementById("modal-form-submit");
    addClientFromModal.addEventListener("click", (e) => {
        e.preventDefault();

        formInputFields = saveDataFromModal();

        let data = {};
        Object.entries(formInputFields).forEach((elem) => {
            let [k, v] = elem;
            if (v !== null) data[k] = v;
            else data[k] = null;
        });
        console.log(data);
        if (!addNewClient(data)) alert('FAILED TO ADD NEW CLIENT');
        else location.reload();
    });
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

function setEventListeners() {
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
}

async function addNewClient({name, surname, lastName, contacts}) {
    // todo validate all fields
    console.log(JSON.stringify({
        name,
        surname,
        lastName,
        contacts,
    }));

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


export {generatePage}