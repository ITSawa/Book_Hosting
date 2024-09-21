import { Repository } from 'typeorm';
import { Purchases } from '../dbmodels/Purchases';
import { StatusError } from '../../answers/errorStatus';
import { AppDataSource } from '../pg.connect.init';
import { reqBuilder } from './helpers/reqhelpers';
import { isNumber, isSqlInjection, isScriptInjection } from './helpers/validations';

class PurchasesService {
    private purchasesRepository: Repository<Purchases>;

    constructor() {
        this.purchasesRepository = AppDataSource.getRepository(Purchases);
    }

    async getPurchasesByUserId(userId: number): Promise<Purchases[]> {
        return reqBuilder(async () => {
            return await this.purchasesRepository.find({ where: { userId } }); 
        }, 'Purchases not found', 404);
    }

    async getPurchasesByBookId(bookId: number): Promise<Purchases[]> {
        return reqBuilder(async () => {
            return await this.purchasesRepository.find({ where: { bookId } }); 
        }, 'Purchases not found', 404);
    }

    async createPurchase(purchase: Purchases): Promise<Purchases> {
        return reqBuilder(async () => {
            return await this.purchasesRepository.save(purchase);
        }, 'Purchase not created', 500);
    }

    async deletePurchase(id: number): Promise<void> {
        return reqBuilder(async () => {
            const purchase = await this.purchasesRepository.findOneBy({ id });
            if (!purchase) {
                throw new StatusError('Purchase not found', 404);
            }
            await this.purchasesRepository.remove(purchase);
        }, 'Purchase not deleted', 500);
    }
}

export default new PurchasesService();