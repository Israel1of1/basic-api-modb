const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

const new_cajero=[
    {
        Nombres:'Juan Manuel', 
        Apellidos: 'Martínez González',
        Cédula:'042-280698-2000M',
        Teléfono: '98234076',
        Direccion: 'Diriamba'
    },

    {
        Nombres:'Francisco José', 
        Apellidos: 'García Fernandez',
        Cédula:'041-280695-1000M',
        Teléfono: '85224956',
        Direccion: 'Jinotepe'
    },

    {
        Nombres:'María Fernanda', 
        Apellidos: 'López',
        Cédula:'041-190501-2000M',
        Teléfono: '98234076',
        Direccion: 'Jinotepe'
    }

];

const new_bulk = async(req, res)=> {
    try{
        const db = await connectToDatabase();

        const cajeros = await 
        db.collection('cajeros').insertMany(new_cajero);
        res.json(cajeros);
    }
    catch(error){
        console.error('Error fetching cajeros:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getCajeros = async (req, res) => {
    try {
        const db = await connectToDatabase();

        const cajeros = await 

        db.collection('cajeros').find().toArray();

        res.json(cajeros);

    } catch (error) {
        console.error('Error fetching cajeros:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getCajeroById = async (req, res) => {
    try{

        const db = await connectToDatabase();
        const { id } = req.params;

        const cajero = await 
            db.collection('cajeros').findOne({ _id: new ObjectId(id) });

        if (!cajero) return res.status(404).json({ error: 'Cajero not found' });
        res.json(cajero);

    } catch (error) {
        console.error('Error fetching cajeros by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createCajero = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newCajero = req.body;

        const result = await 
        db.collection('cajeros').insertOne(newCajero);

        res.status(201).json({ message: 'Cajero created', id: result.insertedId });
    }catch (error) {
        console.error('Error creating cajero:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createCajeros = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const newCajero = req.body; 

        if (!Array.isArray(newCajero) || newCajero.length === 0) {
            return res.status(400).json({ error: 'Invalid input. Expected an array of cajeros.' });
        }

        const result = await 
            db.collection('cajeros').insertMany(newCajero);
        res.status(201).json({ message: 'Cajero created', ids: result.insertedIds });

    }catch (error) {
        console.error('Error creating cajero:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateCajero = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const { id } = req.params;
        
        const result = await 
            db.collection('cajeros').updateOne(
                { _id: new ObjectId(id) },
                { $set: req.body }
            );
        
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Cajero not found' });
        
        res.json({ message: 'Cajero updated' });

    }catch (error) {
        console.error('Error updating cajero:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteCajero = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const { id } = req.params;
        
        const result = await 
            db.collection('cajeros').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) return res.status(404).json({ error: 'Cajero not found' });

        res.json({ message: 'Cajero deleted' });

    }catch (error) {
        console.error('Error deleting cajero:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { 
    getCajeros, 
    getCajeroById, 
    createCajero, 
    createCajeros, 
    updateCajero, 
    deleteCajero,
    new_bulk
};