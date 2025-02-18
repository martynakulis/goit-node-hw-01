const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then((contacts) => console.table(contacts))
        .catch((error) => console.error(error));
      break;

    case "get":
      getContactById(id)
        .then((contact) => console.log(contact))
        .catch((error) => console.error(error));
      break;

    case "add":
      addContact(name, email, phone)
        .then(() => {
          console.log(`Contact added successfully`);
        })
        .catch((error) => console.error(error));
      break;

    case "remove":
      removeContact(id)
        .then(() => {
          console.log(`Contact removed successfully`);
        })
        .catch((error) => console.error(error));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
