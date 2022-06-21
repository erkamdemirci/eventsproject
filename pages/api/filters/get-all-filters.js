import connectDB from '../../../helpers/db-middleware';
import Event from '../../../models/Event';

const handler = async (req, res) => {
  if (req.method.toLocaleLowerCase('tr-TR') === 'get') {
    try {
      let data = await Event.aggregate([
        {
          $group: { _id: '', category: { $push: '$category' }, location: { $push: '$location' }, city: { $push: '$city' } }
        },
        {
          $project: { _id: 0, category: 1, location: 1, city: 1 }
        }
      ]);

      let categories = [...new Set(data[0].category)];
      let locations = [...new Set(data[0].location)];
      let cities = [...new Set(data[0].city)];

      return res.status(200).json({ categories, locations, cities });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
