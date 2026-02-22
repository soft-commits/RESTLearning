import { prop , getModelForClass } from "@typegoose/typegoose";

class product {


    @prop({ required: true , type: () => Number })
    private id: number;

    @prop({ required: true , trim: true, type: () => String })
    private name: string;

    @prop({ required: true , trim: true, type: () => String })
    private description: string;

    @prop({ required: true , type: () => Number, min: 1})
    private price: number;

    @prop({ required: true , type: () => Number, min: 1})
    private quantity: number;

    @prop({ required: true , trim: true, type: () => String })
    private status: string;

    constructor(
        id: number,
        name: string,
        description: string,
        price: number,
        quantity: number,
        status: string
    ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
    }

}

const ProductModel = getModelForClass(product);

export default ProductModel;