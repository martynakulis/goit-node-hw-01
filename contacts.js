const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

function listContacts() {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getContactById(contactId) {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((cont) => cont.id === contactId);
      if (!contact) {
        console.log(`Can't find a contact with id - ${contactId}`);
      }
      return contact;
    })
    .catch((error) => {
      console.log(error);
    });
}

function removeContact(contactId) {
  return fs.readFile(contactsPath, "utf-8").then((data) => {
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((cont) => {
      cont.id !== contactId;
    });
    return fs.writeFile(contactsPath, JSON.stringify(newContacts));
  });
}

function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone };
  return fs.readFile(contactsPath, "utf-8").then((data) => {
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    return fs.writeFile(contactsPath, JSON.stringify(contacts));
  });
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
