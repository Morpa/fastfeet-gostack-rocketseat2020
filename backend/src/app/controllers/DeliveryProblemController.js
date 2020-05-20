import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';
import File from '../models/File';
import Recipient from '../models/Recipient';
import DeliveryProblemDestroyService from '../services/DeliveryProblemDestroyService';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'description', 'delivery_id'],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(problems);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryProblems = await DeliveryProblem.findAll({
      where: {
        delivery_id: id,
      },
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const { id } = req.params;

    const { description } = req.body;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not found.' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery is canceled.' });
    }

    const problem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    await problem.reload({
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product', 'start_date', 'end_date', 'canceled_at'],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
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
              model: File,
              as: 'signature',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.status(201).json(problem);
  }

  async destroy(req, res) {
    const { problem_id } = req.params;

    const delivery = await DeliveryProblemDestroyService.run({ problem_id });

    return res.status(200).json(delivery);
  }
}

export default new DeliveryProblemController();
