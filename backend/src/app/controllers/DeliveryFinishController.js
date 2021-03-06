import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliveryFinishController {
  async update(req, res) {
    const { deliverymanId, deliveryId } = req.params;

    const { signature_id } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        start_date: { [Op.not]: null },
        signature_id: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const signatureImage = await File.findByPk(signature_id);

    if (!signatureImage) {
      return res.status(400).json({ error: 'Signature image does not exists' });
    }

    await delivery.update({
      end_date: new Date(),
      signature_id,
      status: 'Entregue',
    });

    return res.json({});
  }
}

export default new DeliveryFinishController();
