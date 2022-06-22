import connectDB from '../../../helpers/db-middleware';
import Event from '../../../models/Event';

const handler = async (req, res) => {
  if (req.method.toLocaleLowerCase('tr-TR') === 'post') {
    const { page, eventStatus, locationName } = req.body;

    // console.log(page, eventStatus, locationName);

    try {
      let events;
      let resultCount;
      let _aggregate = [
        {
          $project: {
            name: 1,
            category: 1,
            location: 1,
            images: 1,
            starts: {
              $dateFromString: {
                dateString: '$starts'
              }
            },
            ends: {
              $dateFromString: {
                dateString: '$ends'
              }
            },
            isPaid: 1,
            _id: 1
          }
        },
        { $match: {} },
        { $sort: { starts: 1 } }
      ];

      if (eventStatus) {
        let found = _aggregate.some((obj) => {
          if ('$match' in obj) {
            if (eventStatus === 'old') {
              obj['$match'] = { ends: { $lt: new Date() } };
            } else if (eventStatus === 'live') {
              obj['$match'] = { ends: { $gte: new Date() } };
            }
          }
        });
      }

      // must be set after eventStatus!!
      if (locationName) _aggregate.unshift({ $match: { location: locationName } });

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
