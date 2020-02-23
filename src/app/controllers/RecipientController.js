import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const recipient = await Recipient.findAll({
      where: { canceled_at: null },
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'estate',
        'city',
        'postal_code',
      ],
    });

    return res.json(recipient);
  }

  async findOne(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      estate: Yup.string().required(),
      city: Yup.string().required(),
      postal_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      street,
      number,
      complement,
      estate,
      city,
      postal_code,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      street,
      number,
      complement,
      estate,
      city,
      postal_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      estate: Yup.string().required(),
      city: Yup.string().required(),
      postal_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found' });
    }

    const {
      name,
      street,
      number,
      complement,
      estate,
      city,
      postal_code,
    } = await recipient.update(req.body);

    return res.json({
      name,
      street,
      number,
      complement,
      estate,
      city,
      postal_code,
    });
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    recipient.canceled_at = new Date();

    await recipient.save();

    return res.json(recipient);
  }
}

export default new RecipientController();
