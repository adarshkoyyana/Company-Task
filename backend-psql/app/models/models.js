
const { Op } = require('sequelize');
const { Record } = require('./models'); 

app.get('/api/records', async (req, res) => {
  const { page, search, sortBy } = req.query;
  const recordsPerPage = 20;
  const offset = (page - 1) * recordsPerPage;

  try {
    let whereCondition = {};
    if (search) {
      
      whereCondition = {
        [Op.or]: [
          { customer_name: { [Op.iLike]: `%${search}%` } }, 
          { location: { [Op.iLike]: `%${search}%` } } 
        ]
      };
    }

    const records = await Record.findAll({
      where: whereCondition,
      order: [[sortBy, 'ASC']],
      limit: recordsPerPage,
      offset: offset
    });

    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
