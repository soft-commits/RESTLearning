
import labels from "../labels.js";
import Product from "../models/product.model.js";



export const productExist = async (id: string) => {

    try {

        const idDatabase = await Product.findById(id);

        if(!idDatabase){
            throw (new Error(labels.MSG_PRODUCT_EXIST_1 + id + labels.MSG_PRODUCT_EXIST_2));
        }

    } catch (error) {
        
        console.error(error);
        throw (new Error(labels.MSG_500));
    }

}