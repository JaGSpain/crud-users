import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const URL_BASE = 'https://jsonplaceholder.typicode.com';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/users.json');

async function getAllUsers(req, res) {
    try {

        //peticion a servidor remoto
        const response = await fetch(`${URL_BASE}/users`);
        // console.log("**********************");
        // console.log("🔍 RESPONSE:")
        // console.log(response);

        if (!response.ok) throw new Error('Error al obtener usuarios remotos');
        const users = await response.json();

        // console.log("📦 Users parsed:", users);

        //envio de la info al cliente que solicito la informacion
        res.json(users);

    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        res.status(500).json({ error: 'No se encontro ruta especifica' });
    }
}


async function downloadUsersToLocal(req, res) {
    try {
        const response = await fetch(`${URL_BASE}/users`);

        if (!response.ok) throw new Error('Error al obtener los usuarios remotos');

        const users = await response.json();

        // const filePath = path.join(__dirname, '../data/users.json');

        console.log('FILEPATH:' + filePath);

        await fs.writeFile(filePath, JSON.stringify(users, null, 2));

        res.json({ message: 'Usuarios guardados correcatmente en /data/users.json' })

        openFile(filePath);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Hubo un error al guardar los usuarios' });

    }
}

async function getAllUsers_local(req, res) {
    //Leer documento 
    try {
        const data = await fs.readFile(filePath, 'utf-8');

        const users = JSON.parse(data);

        res.json(users);

    } catch (error) {
        res.status(500).json({ error: "No se pudo leer el archivo local" });
    }

}

async function createUser_local(req, res) {
    try {

        const data = await fs.readFile(filePath, 'utf-8');

        const users = JSON.parse(data);

        const newUser = req.body;

        users.push(newUser);

        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');

        res.status(201).json({ message: 'Usuario guardado con exito' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar el usuario' });

    }
}

async function deleteUserById_local(req, res) {
    try {

        const { id } = req.params;

        const data = await fs.readFile(filePath, 'utf-8'); //texto

        const users = JSON.parse(data); //obj[]

        const filteredUsers = users.filter(user => user.id != id);

        if (filteredUsers.lenght === users.length) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await fs.writeFile(filePath, JSON.stringify(filteredUsers, null, 2), 'utf-8');

        res.json({ message: 'usuario eliminado correctamente' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}

async function patchUserById_local(req, res) 
{
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data); //obj[]

        let userIndex = users.findIndex(user => user.id == id);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        users[userIndex] = { ...users[userIndex], ...updatedData };

        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
        res.json({ message: 'Usuario actualizado correctamente', user: users[userIndex] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }

}

export default {
    getAllUsers,
    downloadUsersToLocal,
    getAllUsers_local,
    createUser_local,
    patchUserById_local,
    deleteUserById_local
};