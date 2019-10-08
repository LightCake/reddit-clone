const { communityServices } = require("../services");

const create = async (req, res) => {
  const { success, community, errors } = await communityServices.create(
    req.user,
    req.body
  );
  if (success) {
    res.status(201).send(community);
  }
  res.status(422).send(errors);
};

const search = async (req, res) => {
  const { name } = req.params;
  try {
    const communities = await communityServices.search(name);
    res.send(communities);
  } catch (e) {
    console.error(e);
    res.status(422).end();
  }
};

module.exports = {
  create,
  search
};
