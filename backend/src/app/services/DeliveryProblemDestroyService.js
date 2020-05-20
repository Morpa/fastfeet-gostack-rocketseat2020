import Queue from '../../lib/Queue';
import CancelDelivery from '../jobs/CancelDelivery';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryProblemDestroyService {
  async run({ problem_id }) {
    const problem = await DeliveryProblem.findByPk(problem_id);

    if (!problem) {
      throw new Error('Problem does not found.');
    }

    const delivery = await Delivery.findByPk(problem.delivery_id);

    if (!delivery) {
      throw new Error('Delivery does not found.');
    }

    if (delivery.canceled_at) {
      throw new Error('Delivery has been canceled.');
    }

    await delivery.update({ canceled_at: new Date(), status: 'Cancelada' });

    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'zip_code',
            'complement',
            'state',
            'city',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    await Queue.add(CancelDelivery.key, { delivery });

    return delivery;
  }
}

export default new DeliveryProblemDestroyService();
