declare class product {
    private id;
    private name;
    private description;
    private price;
    private quantity;
    private status;
    constructor(id: number, name: string, description: string, price: number, quantity: number, status: string);
}
declare const ProductModel: import("@typegoose/typegoose").ReturnModelType<typeof product, import("@typegoose/typegoose/lib/types.js").BeAnObject>;
export default ProductModel;
//# sourceMappingURL=product.model.d.ts.map