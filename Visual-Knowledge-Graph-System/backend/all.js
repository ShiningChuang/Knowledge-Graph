var config = require('./config.json')

function parseNeo4jResponseJSON(res) {
    var columns = res.records[0]['keys'];
    var data = []
	console.log("!!!res")
	console.log(res.records == null)
	console.log(res)
	if (res.records[0]['keys'][1] == "axiom_num") {
		for (var i = 0; i < res.records.length; i++) {
			data.push(res.records[i]._fields)
		}
	}
	else if (res.records[0]['keys'][2] == "similarity") {
		for (var i = 0; i < res.records.length; i++) {
			data.push(res.records[i]._fields)
		}
	}
	else if (res.records[0]['keys'][1] == "communityId") {
		for (var i = 0; i < res.records.length; i++) {
			data.push(res.records[i]._fields)
		}
	}
	else if (res.records[0]['keys'][1] == "exists") {
		data.push(res.records[i]._fields[1])
	}
	else if (res.records.length == 0) {
		data.push(res)
	}
	else {
		for (var i = 0; i < res.records.length; i++) {
		    if (res.records[i]._fields.length == 2 && Object.keys(res.records[i]._fields[0]).length == 4) {
		        var temp_list = []
		        var temp_properties = res.records[i]._fields[0]['properties']
		        temp_properties['_id'] = res.records[i]._fields[0]['elementId']
		        temp_list.push(temp_properties)
		        temp_list.push(res.records[i]._fields[1])
		        data.push(temp_list)
		    } else if (res.records[i]._fields.length == 6) {
		        var temp_list = []
				
		        var temp_properties_1 = res.records[i]._fields[0]['properties']
		        temp_properties_1['_id'] = res.records[i]._fields[0]['elementId']
		        temp_list.push(temp_properties_1)
		        temp_list.push(res.records[i]._fields[1])
				
		        var temp_properties_2 = res.records[i]._fields[2]['properties']
		        temp_properties_2['_id'] = res.records[i]._fields[2]['elementId']
		        temp_list.push(temp_properties_2)
		        temp_list.push(res.records[i]._fields[3])
				
		        var temp_properties_3 = res.records[i]._fields[4]['properties']
		        temp_properties_3['_id'] = res.records[i]._fields[4]['elementId']
		        temp_list.push(temp_properties_3)
		        temp_list.push(res.records[i]._fields[5])
		        data.push(temp_list)
		    } else if (res.records[i]._fields.length == 10) {
				var temp_list = []

				var temp_properties_1 = res.records[i]._fields[0]['properties']
				temp_properties_1['_id'] = res.records[i]._fields[0]['elementId']
				temp_list.push(temp_properties_1)
				temp_list.push(res.records[i]._fields[1])
				
				var temp_properties_2 = res.records[i]._fields[2]['properties']
				temp_properties_2['_id'] = res.records[i]._fields[2]['elementId']
				temp_list.push(temp_properties_2)
				temp_list.push(res.records[i]._fields[3])
				
				var temp_properties_3 = res.records[i]._fields[4]['properties']
				temp_properties_3['_id'] = res.records[i]._fields[4]['elementId']
				temp_list.push(temp_properties_3)
				temp_list.push(res.records[i]._fields[5])
				
				var temp_properties_4 = res.records[i]._fields[6]['properties']
				temp_properties_4['_id'] = res.records[i]._fields[6]['elementId']
				temp_list.push(temp_properties_4)
				temp_list.push(res.records[i]._fields[7])
				
				var temp_properties_5 = res.records[i]._fields[8]['properties']
				temp_properties_5['_id'] = res.records[i]._fields[8]['elementId']
				temp_list.push(temp_properties_5)
				temp_list.push(res.records[i]._fields[9])
				
				data.push(temp_list)
				
			} else if (res.records[i]._fields.length == 1) {
		        data.push(res.records[i]._fields[0])
		    } else {
		        data.push(res.records[i]._fields)
		    }
		}
	}

    var result = {'columns': columns, 'data': data};
	console.log("!!!!!parseNeo4jResponseJSON-result:");
	console.log(result);
    return result;
};

function allnodesPromise(query) {
    return new Promise((resolve, reject) => {
        var neo4j = require('neo4j-driver')
        const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic(config.username, config.password),{disableLosslessIntegers:true})
        const session = driver.session()

        session.readTransaction(tx => tx.run(query)
        )
            .then(res => {
				// console.log("!!!!!res:");
				// console.log(res);
                return resolve(parseNeo4jResponseJSON(res))
            })
            .catch(e => {
                console.log(e)
            })


        // var neo4j = require('node-neo4j');
        // db = new neo4j(`http://${config.username}:${config.password}@localhost:7474`);
        // db.cypherQuery(query, function(err, result) {
        //     if (err) {
        //         reject(err);
        //     }
        //     resolve(result);
        //     console.log(result)
        // });
    });
}
module.exports.allnodesPromise = allnodesPromise

