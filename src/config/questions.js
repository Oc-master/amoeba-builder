const questions = {
  project: [{
    name: 'project',
    type: 'input',
    message: 'Please enter the project name (do not set to empty): ',
    validate(input) {
      const done = this.async();
      if (!input) {
        done('You need to provide a non-empty name');
        return undefined;
      }
      done(null, true);
    },
  }],
  operation: [{
    name: 'operation',
    type: 'list',
    message: 'Directory already exists, please choose one of the following choices: ',
    choices: [
      { name: 'Rename project', value: 'rename' },
      { name: 'Cover folder', value: 'cover' },
      { name: 'Exit process', value: 'exit' },
    ],
  }],
  info: [
    {
      name: 'description',
      type: 'input',
      message: 'Please enter the project description: ',
    },
    {
      name: 'author',
      type: 'input',
      message: 'Please enter the author: ',
    },
    {
      name: 'repository',
      type: 'input',
      message: 'Please enter the repository address: ',
    },
  ],
};

module.exports = {
  questions,
};
