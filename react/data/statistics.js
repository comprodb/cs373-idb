module.exports = {
	commits: 10,
	issues: 15,
	tests: 18,
	apiary: 'apiary',
	tracker: 'https://github.com/comprodb/cs373-idb/issues',
	repo: 'https://github.com/comprodb/cs373-idb',
	wiki: 'https://github.com/comprodb/cs373-idb/wiki',
	data_source_description: `To obtain the data, we relied on codeforces' api which provided
				access to competitors and problem sets.  The api allows data to be viewed in a web browser
				and to be programatically scraped with python's requests module,
				interating through the return json and storing into our database with the models.py classes`,
}