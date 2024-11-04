#!/usr/bin/env node
const program = require('commander');
const pkg = require('./package.json');
const colors = require('colors');
const debug = require('debug')('jira-cli');

// JIRA API DOCS => https://jira-node.github.io
const { jira, getIssueUrl } = require('./get-jira')();

program
  .version(pkg.version);

// Existing 'find' command
program
  .command('find <issue>')
  .description('Find and display information about a JIRA issue')
  .action((issueNumber) => {
    // TODO make prefix optional
    jira.findIssue(issueNumber)
      .then(function (issue) {
        debug(issue);
        logField('Summary  : ', colors.blue(issue.fields.summary));
        logField('Status   : ', colorStatus(issue.fields.status.name, issue.fields.status.statusCategory.name));
        logField('Assignee : ', colors.grey(issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned'));
        logField('URL      : ', colors.grey(getIssueUrl(issueNumber)));
      })
      .catch(function (err) {
        console.error(err.message);
      });
  });

// New 'transition' command
program
  .command('transition <issue> <status>')
  .description('Transition a JIRA issue to a specified status')
  .action((issueNumber, status) => {
    // First, get the list of possible transitions for the issue
    jira.listTransitions(issueNumber)
      .then(function (response) {
        const transitions = response.transitions;

        // Find the transition that leads to the desired status
        const desiredTransition = transitions.find(transition => transition.to.name.toLowerCase() === status.toLowerCase());

        if (!desiredTransition) {
          console.error(colors.red(`Transition to status '${status}' not found for issue ${issueNumber}.`));
          console.log('Available transitions:');
          transitions.forEach(t => {
            console.log(`- ${colors.green(t.to.name)}`);
          });
          return;
        }

        // Perform the transition
        return jira.transitionIssue(issueNumber, { transition: { id: desiredTransition.id } })
          .then(function () {
            console.log(colors.green(`Issue ${issueNumber} transitioned to status '${status}'.`));
          });
      })
      .catch(function (err) {
        console.error(colors.red('Error:'), err.message);
      });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

//////////
// Helpers
//////////

function getStatusColor(status) {
  const statusMap = {
    'To Do': 'grey',
    'In Progress': 'blue',
    'Done': 'green',
  };
  const color = statusMap[status] || 'grey';
  return color;
}

function colorStatus(status, statusCategory) {
  return colors[getStatusColor(statusCategory)](status);
}

function logField(title, data) {
  console.log(colors.grey(title), data);
}
