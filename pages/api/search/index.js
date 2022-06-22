import connectDB from '../../../helpers/db-middleware';
import Event from '../../../models/Event';

const handler = async (req, res) => {
  if (req.method.toLocaleLowerCase('tr-TR') === 'get') {
    const {
      query: { term, page }
    } = req;

    var re = new RegExp(`.*${term}.*`, 'i');

    const filter = { name: { $regex: re } };
    let resultCount = await Event.countDocuments(filter);

    let events = await Event.find(filter)
      .skip(page * 12)
      .limit(12);

    if (events.length > 0) {
      res.status(200).json({ events, resultCount });
    } else {
      res.status(200).json({ message: 'event_not_found' });
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
