import { isBefore, isAfter, parseISO, setHours } from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryWithDrawController {
  async update(req, res) {
    const { id, deliverymanId } = req.params;

    const start_date = new Date();

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not found.' });
    }

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not found.' });
    }

    if (delivery.start_date) {
      return res.status(400).json({ error: 'Delivery has already started.' });
    }

    const parseDate = parseISO(start_date);

    if (
      isBefore(parseDate, setHours(new Date(), 8)) ||
      isAfter(parseDate, setHours(new Date(), 18))
    ) {
      return res.status(400).json({
        error: 'Withdrawals of orders can only be made between 08:00 - 18:00.',
      });
    }

    const { count } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: id,
        start_date: null,
        signature_id: null,
      },
    });

    if (count === 5) {
      return res.status(400).json({
        error: 'The deliveryman has already made five deliveries today.',
      });
    }

    await delivery.update({ start_date, status: 'Retirada' });

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

    return res.json(delivery);
  }
}

export default new DeliveryWithDrawController();
