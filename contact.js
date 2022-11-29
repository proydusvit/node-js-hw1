const fs = require("fs/promises");
const path = require('path');
const { v4: uuidv4 } = require("uuid");

const contactsPath =  path.join(__dirname, "./db/contacts.json");
const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  }
  
  const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);

    return result || null;
  }
  
  const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
  }
  
  const addContact = async({name, email, phone}) => {
    const contacts = await listContacts();
    const newContacts = {
        id: uuidv4(),
        name, 
        email,
        phone,
    }

    contacts.push(newContacts);
    await updateContacts(contacts);

    return newContacts;
  }


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}