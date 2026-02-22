//CRUD:
//CREATE, READ, UPDATE, DELETE


import type { Request, Response } from "express";
import product from "../models/product.model.js";
import labels from "../labels.js";

export const getProducts = async (req : Request, res: Response) => {

    try {
        
        const productList = await product.find();

        if(productList.length === 0){
            res.status(204).json(
                {message: labels.NO_CONTENT_FOUND,
                    productList
                });
        }
        else {
            res.status(200).json(
                {message: labels.CONTENT_FOUND,
                    productList});
        }


    } catch (error) {

        console.error(error);
        res.status(500).json(
            {message: labels.MSG_500,
                error});
        
    }

}   

export const getProductsbyPrice = async (req : Request, res: Response) => {

try {

    const {min, max}  = req.body;
    
    const productList = await product.find({price: {$gte: min, $lte: max}});

    if(productList.length === 0){
        res.status(204).json({message: labels.NO_CONTENT_FOUND, productList});
    }
    else{
        res.status(200).json({message: labels.CONTENT_FOUND, productList});
    }
    
} catch (error) {
    
    console.error(error);
    res.status(500).json({message: labels.MSG_500, error});

}
}


export const createProduct = async (req : Request, res: Response) => {

    try {

        const {id,name,description , price , quantity , status} = req.body;

        const newProduct = new product({
            id: id,
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            status: status
        });

        await newProduct.save();

        res.status(201).json({
            message: labels.CONTENT_FOUND,
            newProduct
        });
    
    } catch (error) {

        console.error(error);
        res.status(500).json({message: labels.MSG_500, error});
        
    }
}

export const updateProduct = async (req : Request, res: Response) => {

    try {
        
        const id = req.params.id;

        const {_id, ...rest} = req.body; // ...rest indica que sacara todo el boddy excepto el _id, ya que no se puede modificar el id de un producto

        const updatedProduct = await product.findByIdAndUpdate(id, rest, {new: true});

        if(!updatedProduct){
            res.status(404).json({message: labels.NO_CONTENT_FOUND});
        }
        else{
            res.status(200).json({message: labels.CONTENT_UPDATED,
                updatedProduct
            });
        }

    } catch (error) {

        console.error(error);
        res.status(500).json({message: labels.MSG_500, error});
        
    }

}

export const deleteProduct = async (req : Request, res: Response) => {

    try {
        
        const id = req.params.id;

        await product.findByIdAndDelete(id);

        if(!id){
            res.status(404).json({message: labels.NO_CONTENT_FOUND});
        }
        else{
            res.status(200).json({
                message: labels.CONTENT_DELETED,
                id});
        }


    } catch (error) {
        
        console.error(error);
        res.status(500).json({message: labels.MSG_500, error});

    }

}