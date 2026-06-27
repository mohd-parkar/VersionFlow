const createRepository = (req, res) => {
  res.send("Repository Created");
};

const getAllRepositories = (req, res) => {
  res.send("All Repositories fetched");
};

const fetchRepositoryById = (req, res) => {
  res.send("Repository Detail fetched");
};

const fetchRepositoryByName = (req, res) => {
  res.send("Repository Detail fetched");
};

const fetchRepositoryForCurrentUser = (req, res) => {
  res.send("Repository for logged in user");
};

const updateRepositoryById = (req, res) => {
  res.send("Repository updated");
};

const toggleVisibilityById = (req, res) => {
  res.send("Visibility toggled");
};

const deleteRepositoryById = (req, res) => {
  res.send("Repository deleted");
};


module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById,
};