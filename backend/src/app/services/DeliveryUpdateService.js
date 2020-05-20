import { isAfter, parseISO, getHours } from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryUpdateService {
  async run({
    id,
    deliveryman_id,
    recipient_id,
    signature_id,
    start_date,
    end_date,
    canceled_at,
  }) {
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      throw new Error('Delivery does not found.');
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      throw new Error('Deliveryman does not found.');
    }

    if (recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);

      if (!recipient) {
        throw new Error('Recipient does not found.');
      }
    }

    if (signature_id) {
      const signature = await File.findByPk(signature_id);

      if (!signature) {
        throw new Error('Signature does not found.');
      }
    }

    if (canceled_at) {
      throw new Error('The cancellation date cannot be modified.');
    }

    const parsedStart = parseISO(start_date);

    const parsedEnd = parseISO(end_date);

    if (start_date) {
      const hour = getHours(parsedStart);

      if (hour < 8 || hour >= 18) {
        throw new Error(
          'Withdrawals of orders can only be made between 08:00 - 18:00.'
        );
      }
    }

    if (end_date && !start_date) {
      if (!delivery.start_date) {
        throw new Error('Delivery has not yet started.');
      }
    }

    if (start_date && end_date) {
      if (isAfter(parsedStart, parsedEnd)) {
        throw new Error('End date must be after start.');
      }
    }

    await delivery.update(
      deliveryman_id,
      recipient_id,
      signature_id,
      start_date,
      end_date,
      canceled_at
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
    return delivery;
  }
}

export default new DeliveryUpdateService();
