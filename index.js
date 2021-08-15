const { Command } = require("commander");

const contactsOperations = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      (async () => {
        try {
          const contacts = await contactsOperations.listContacts();
          console.table(contacts);
        } catch (error) {
          console.log(error.message);
        }
      })();
      break;

    case "get":
      (async () => {
        try {
          const id = 5;
          const oneContact = await contactsOperations.getContactById(id);
          console.table(oneContact);
        } catch (error) {
          console.log(error.message);
        }
      })();
      break;

    case "add":
      (async () => {
        try {
          const data = {
            name: "Mango",
            email: "mango@gmail.com",
            phone: "322-22-22",
          };
          const newContact = await contactsOperations.addContact(data);
          console.table(newContact);
        } catch (error) {
          console.log(error.message);
        }
      })();
      break;

    case "remove":
      (async () => {
        try {
          const id = 3;
          const contact = await contactsOperations.removeContact(id);
          console.table(contact);
        } catch (error) {
          console.log(error.message);
        }
      })();
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
