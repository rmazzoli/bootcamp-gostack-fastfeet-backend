import * as Yup from 'yup';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

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

    /**
     * Check recipient_id
     */
    console.log('----------------------------------------------------------');
    const isRecipient_id = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!isRecipient_id) {
      return res.status(401).json({ error: 'The recipient is not exits!' });
    }
    console.log('----------------------------------------------------------');
    /**
     * Check recipient_id
     */

    const isDeliveryman_id = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    if (!isDeliveryman_id) {
      return res.status(401).json({ error: 'The deliveryman is not exits!' });
    }

    console.log('----------------------------------------------------------');
    console.log(`${recipient_id} - ${deliveryman_id} - ${product}`);

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
     * Notify appointment provider
     */

    // const user = await User.findByPk(req.userId);
    // const formattedDate = format(
    //   hourStart,
    //   "'dia' dd 'de' MMMM', às' H:mm'h'",
    //   {
    //     locale: pt,
    //   }
    // );

    // await Notication.create({
    //   content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
    //   user: provider_id,
    // });

    return res.json(order);
  }
}

export default new OrderController();
