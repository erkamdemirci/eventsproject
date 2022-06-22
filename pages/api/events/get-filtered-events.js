import connectDB from '../../../helpers/db-middleware';
import Event from '../../../models/Event';

const handler = async (req, res) => {
  if (req.method.toLocaleLowerCase('tr-TR') === 'post') {
    const { page = 0, filters } = req.body;

    // console.log(page, filters);

    try {
      let events;
      let resultCount;
      let _aggregate = [
        {
          $project: {
            name: 1,
            location: 1,
            category: 1,
            images: 1,
            starts: {
              $dateFromString: {
                dateString: '$starts'
              }
            },
            ends: 1,
            isPaid: 1,
            _id: 1
          }
        },
        { $sort: { starts: 1 } }
      ];

      if (filters.date) {
        _aggregate.unshift({ $match: { ends: { $gte: filters.date } } });
        _aggregate.unshift({ $match: { starts: { $lte: filters.date } } });
      }
      if (filters.category) _aggregate.unshift({ $match: { category: filters.category } });
      if (filters.city) _aggregate.unshift({ $match: { city: filters.city } });
      if (filters.location) _aggregate.unshift({ $match: { location: filters.location } });

      events = await Event.aggregate(_aggregate);
      resultCount = events.length;
      events = events.slice(12 * page, 12 * (page + 1));

      return res.status(200).json({ events, resultCount });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
