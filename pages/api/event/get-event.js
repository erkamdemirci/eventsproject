import connectDB from '../../../helpers/db-middleware.js';
import Event from '../../../models/Event';

const handler = async (req, res) => {
  if (req.method.toLocaleLowerCase('tr-TR') === 'post') {
    const { eventId } = req.body;

    try {
      const filter = { _id: eventId };
      var event = await Event.findOne(filter);

      return res.status(200).json({ event });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
