import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';
import DeliveryStoreService from '../services/DeliveryStoreService';
import DeliveryUpdateService from '../services/DeliveryUpdateService';

class DeliveryController {
  async index(req, res) {
    const { page = 1, q } = req.query;

    let search = '';

    if (q) {
      const temp = { product: { [Op.like]: `%${q}%` } };
      search = temp;
    }

    const deliveries = await Delivery.findAll({
      where: search,
      attributes: [
        'id',
        'product',
        'start_date',
        'canceled_at',
        'end_date',
        'status',
      ],
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
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const { deliveryman_id, recipient_id } = req.body;

    const delivery = await DeliveryStoreService.run({
      deliveryman_id,
      recipient_id,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;

    const {
      deliveryman_id,
      recipient_id,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    } = req.body;

    const delivery = await DeliveryUpdateService.run({
      id,
      deliveryman_id,
      recipient_id,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    });

    return res.json(delivery);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not found' });
    }

    await delivery.destroy();

    return res.status(200).json({ msg: 'Delivery deleted.' });
  }
}

export default new DeliveryController();
