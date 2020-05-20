import Queue from '../../lib/Queue';
import DeliveryEmail from '../jobs/DeliveryMail';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryStoreService {
  async run({ deliveryman_id, recipient_id }) {
    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      throw new Error('Recipient does not found.');
    }

    const deliveryManExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryManExists) {
      throw new Error('Deliveryman does not found.');
    }

    const delivery = await Delivery.create(
      { deliveryman_id, recipient_id },
      { status: 'Pendente' }
    );

    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    await Queue.add(DeliveryEmail.key, { delivery });

    return delivery;
  }
}

export default new DeliveryStoreService();
