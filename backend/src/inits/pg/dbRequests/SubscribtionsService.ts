import { Repository } from 'typeorm';
import { Subscriptions } from '../dbmodels/Subscriptions';
import { StatusError } from '../../answers/errorStatus';
import { AppDataSource } from '../pg.connect.init';
import { reqBuilder } from './helpers/reqhelpers';


class SubscriptionsService {
    private subscriptionsRepository: Repository<Subscriptions>;

    constructor() {
        this.subscriptionsRepository = AppDataSource.getRepository(Subscriptions);
    }

    async getSubscriptionsByUserId(userId: number): Promise<Subscriptions[]> {
        return reqBuilder(async () => {
            return await this.subscriptionsRepository.find({ where: { userId } }); 
        }, 'Subscriptions not found', 404);
    }

    async getAllSubscriptionsByAuthorId(authorId: number): Promise<Subscriptions[]> {
        return reqBuilder(async () => {
            return await this.subscriptionsRepository.find({ where: { authorId } }); 
        }, 'Subscriptions not found', 404);
    }

    async createSubscription(subscription: Subscriptions): Promise<Subscriptions> {
        return reqBuilder(async () => {
            return await this.subscriptionsRepository.save(subscription);
        }, 'Subscription not created', 500);
    }

    async deleteSubscription(id: number): Promise<void> {
        return reqBuilder(async () => {
            const subscription = await this.subscriptionsRepository.findOneBy({ id });
            if (!subscription) {
                throw new StatusError('Subscription not found', 404);
            }
            await this.subscriptionsRepository.remove(subscription);
        }, 'Subscription not deleted', 500);
    }
}

export default new SubscriptionsService()