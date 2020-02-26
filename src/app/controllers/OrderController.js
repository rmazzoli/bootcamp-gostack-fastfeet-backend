import * as Yup from 'yup';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Mail from '../../lib/Mail';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;
    console.log('-----------------------------------------------');
    /**
     * Check recipient_id
     */
    const isRecipient_id = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!isRecipient_id) {
      return res.status(401).json({ error: 'The recipient is not exits!' });
    }
    /**
     * Check recipient_id
     */
    console.log('-----------------------------------------------');
    const isDeliveryman_id = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    if (!isDeliveryman_id) {
      return res.status(401).json({ error: 'The deliveryman is not exits!' });
    }
    console.log('-----------------------------------------------');
    const order = await Order.create({
      recipient_id,
      deliveryman_id,
      signature_id: null,
      product,
      canceled_at: null,
      start_date: null,
      end_date: null,
    });

    /**
     * Notify new order
     */

    console.log('-----------------------------------------------');

    await Mail.sendMail({
      from: 'Equipe FastFeet <noreply@fastfeet.com>',
      to: `${isDeliveryman_id.name} <${isDeliveryman_id.email}>`,
      subject: 'Agendamento cancelado',
      template: 'newOrder',
      context: {
        recipient: isRecipient_id.name,
        product,
      },
    });

    return res.json(order);
  }
}

export default new OrderController();
