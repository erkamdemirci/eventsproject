import connectDB from '../../../helpers/db-middleware';
import Event from '../../../models/Event';

const handler = async (req, res) => {
  if (req.method.toLocaleLowerCase('tr-TR') === 'post') {
    const { page, locationName } = req.body;
    let events;
    try {
      const filter = { location: locationName };

      events = await Event.find(filter)
        .select({
          name: 1,
          location: 1,
          images: 1,
          starts: 1,
          ends: 1,
          isPaid: 1,
          _id: 1
        })
        .skip(page * 8)
        .limit(8);

      let resultCount = await Event.countDocuments();
      return res.status(200).json({ events, resultCount });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
