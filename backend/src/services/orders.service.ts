import { IProduct } from "../interfaces";
import OrderODM from "../models/orders.model";
import { productSchema } from "../schemas/schemas";

class OrdersService {

    public async create(order: any) {
       const productODM = new OrderODM();
       const productCreated = await productODM.create(order);
        
       return productCreated
    }

}
export default OrdersService;