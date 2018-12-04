#!/usr/bin/env node
const program = require('commander');
const pkg = require('./package.json');

// JIRA API DOCS => https://jira-node.github.io
const {jira, getIssueUrl} = require('./get-jira')();


program
.version(pkg.version)
.command('find <issue>')
.action((issueNumber)=>{
	// TODO make prefix optional
	jira.findIssue(issueNumber)
	.then(function(issue) {
		console.log('Summary : ' + issue.fields.summary);
		console.log('Status  : ' + issue.fields.status.name);
		console.log('Assignee: ' + issue.fields.assignee.displayName);
		console.log('URL     : ' + getIssueUrl(issueNumber));
	})
	.catch(function(err) {
		console.error(err.message);
	});
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
