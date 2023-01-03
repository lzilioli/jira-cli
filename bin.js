#!/usr/bin/env node
const program = require('commander');
const pkg = require('./package.json');
const colors = require('colors');
const debug = require('debug')('jira-cli');

// JIRA API DOCS => https://jira-node.github.io
const {jira, getIssueUrl} = require('./get-jira')();

program
.version(pkg.version)
.command('find <issue>')
.action((issueNumber)=>{
	// TODO make prefix optional
	jira.findIssue(issueNumber)
	.then(function(issue) {
		debug(issue);
		logField('Summary  : ', colors.blue(issue.fields.summary));
		logField('Status   : ', colorStatus(issue.fields.status.name, issue.fields.status.statusCategory.name));
		logField('Assignee : ', colors.grey(issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned'));
		logField('URL      : ', colors.grey(getIssueUrl(issueNumber)));
	})
	.catch(function(err) {
		console.error(err.message);
	});
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

//////////
// Helpers
//////////

function getStatusColor(status){
	const statusMap = {
		'To Do': 'grey',
		'In Progress': 'blue',
		'Done': 'green',
	};
	const color = statusMap[status] || 'grey';
	return color;
}

function colorStatus(status, statusForColor){
	return colors[getStatusColor(statusForColor)](status);
}

function logField(title, data){
	console.log(colors.grey(title), data);
}
