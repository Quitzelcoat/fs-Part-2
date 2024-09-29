// personService.js

const baseUrl = "http://localhost:3001/persons";

// Fetch all persons
const getAll = () => {
  return fetch(baseUrl).then((response) => response.json());
};

// Add a new person
const create = (newPerson) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPerson),
  }).then((response) => response.json());
};

// Update a person's information
const update = (id, updatedPerson) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPerson),
  }).then((response) => response.json());
};

const remove = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export default { getAll, create, update, remove };
