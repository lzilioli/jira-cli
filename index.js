#!/usr/bin/env node
const program = require('commander');
const pkg = require('./package.json');
const colors = require('colors');

// JIRA API DOCS => https://jira-node.github.io
const {jira, getIssueUrl} = require('./get-jira')();

program
.version(pkg.version)
.command('find <issue>')
.action((issueNumber)=>{
	// TODO make prefix optional
	jira.findIssue(issueNumber)
	.then(function(issue) {
		logField('Summary  : ', colors.blue(issue.fields.summary));
		logField('Status   : ', colorStatus(issue.fields.status.name));
		logField('Assignee : ', colors.grey(issue.fields.assignee.displayName));
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
		'Pending Deployment': 'green',
		'Done': 'green',
		'Open': 'grey',
		'Priority Pending': 'grey'
	};
	const color = statusMap[status] || 'blue';
	return color;
}

function colorStatus(status){
	return colors[getStatusColor(status)](status);
}

function logField(title, data){
	console.log(colors.grey(title), data);
}
