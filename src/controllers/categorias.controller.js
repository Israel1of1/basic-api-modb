const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

const new_category=[
    {
        Nombre:'Dulces', Descripcion: 'Caramelos, bombones, paletas'
    },

    {
        Nombre:'Mariscos', Descripcion: 'Pescados, camarones'
    },

    {
        Nombre:'Pollo', Descripcion: 'Filetes, asados'
    }

];

const new_bulk = async(req, res)=> {
    try{
        const db = await connectToDatabase();

        const categorias = await 
        db.collection('categorias').insertMany(new_category);
        res.json(categorias);
    }
    catch(error){
        console.error('Error fetching categorias:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getCategorias = async (req, res) => {
    try {
        //ESPERAMOS CONECTARNOS A MONGODB Y OBTENER LA BASE DE DATOS
        const db = await connectToDatabase();

        const categorias = await 

        db.collection('categorias').find().toArray();

        res.json(categorias);

    } catch (error) {
        console.error('Error fetching categorias:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getCategoriaById = async (req, res) => {
    try{

        const db = await connectToDatabase();
        const { id } = req.params;

        const categoria = await 
            db.collection('categorias').findOne({ _id: new ObjectId(id) });

        if (!categoria) return res.status(404).json({ error: 'Categoria not found' });
        res.json(categoria);

    } catch (error) {
        console.error('Error fetching categoria by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createCategoria = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newCategoria = req.body;

        const result = await 
        db.collection('categorias').insertOne(newCategoria);

        res.status(201).json({ message: 'Categoria created', id: result.insertedId });
    }catch (error) {
        console.error('Error creating categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createCategorias = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const newCategoria = req.body; 

        if (!Array.isArray(newCategorias) || newCategorias.length === 0) {
            return res.status(400).json({ error: 'Invalid input. Expected an array of categorias.' });
        }

        const result = await 
            db.collection('categorias').insertMany(newCategorias);
        res.status(201).json({ message: 'Categoria created', ids: result.insertedIds });

    }catch (error) {
        console.error('Error creating categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateCategoria = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const { id } = req.params;
        
        const result = await 
            db.collection('categorias').updateOne(
                { _id: new ObjectId(id) },
                { $set: req.body }
            );
        
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Categoria not found' });
        
        res.json({ message: 'Categoria updated' });

    }catch (error) {
        console.error('Error updating categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteCategoria = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const { id } = req.params;
        
        const result = await 
            db.collection('categorias').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) return res.status(404).json({ error: 'Categoria not found' });

        res.json({ message: 'Categoria deleted' });

    }catch (error) {
        console.error('Error deleting categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { 
    getCategorias, 
    getCategoriaById, 
    createCategoria, 
    createCategorias, 
    updateCategoria, 
    deleteCategoria,
    new_bulk
};