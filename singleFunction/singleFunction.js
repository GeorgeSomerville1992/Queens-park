Your task is to implement a simple container of integer numbers. As a first step, consider implementing the following two operations:

ADD <value> should add the specified integer value to the container. Returns an empty string.
EXISTS <value> should check whether the specific integer value exists in the container. Returns "true" if the value exists, "false" otherwise.
The container is supposed to be empty at the beginning of execution.

Given a list of queries, return the list of answers for these queries. To pass to the next level you have to pass all tests at th

queries = [
    ["ADD", "1"],
    ["ADD", "2"],
    ["ADD", "5"],
    ["ADD", "2"],
    ["EXISTS", "2"],
    ["EXISTS", "5"],
    ["EXISTS", "1"],
    ["EXISTS", "4"],
    ["EXISTS", "3"],
    ["EXISTS", "0"]
]

solution(queries) = ["", "", "", "", "true", "true", "true", "false", "false", "false"]


===========

// ADD <value> should add the specified integer value to the container. Returns an empty string.
// EXISTS <value> should check whether the specific integer value exists in the container. Returns "true" if the value exists, "false" otherwise.

// queries = [
//     ["ADD", "1"],
//     ["ADD", "2"],
//     ["ADD", "5"],
//     ["ADD", "2"],
//     ["EXISTS", "2"],
//     ["EXISTS", "5"],
//     ["EXISTS", "1"],
//     ["EXISTS", "4"],
//     ["EXISTS", "3"],
//.     ["REMOVE", "2"]
//     ["EXISTS", "0"]
// ]

function solution(queries) {
    console.log('queres', queries, queries[0])
    // const addQueries = queries.filter((query) => query[0] === "ADD").map((query) => query[1]);
    const addQueries = []
    console.log('addQueries', addQueries);
    const output = queries.map((query) => {
        if(query[0] === "REMOVE") {
            if(addQueries.find(addQuery => addQuery === query[1])){
                addQueries.splice(addQueries.indexOf(query[1]), 1)
                return "true"
            } else {
                return "false"
            }
        }    
        
        if(query[0] === "ADD") {
            addQueries.push(query[1])
            return ""
        }
        if(query[0] === "EXISTS") {
            if(addQueries.find(addQuery => addQuery === query[1])){
                return "true"
            } else {
                return "false"
            }
        }
    })
    console.log('output ===>', output)
    return output;
}

====== stage 3

// ADD <value> should add the specified integer value to the container. Returns an empty string.
// EXISTS <value> should check whether the specific integer value exists in the container. Returns "true" if the value exists, "false" otherwise.

// queries = [
//     ["ADD", "1"],
//     ["ADD", "2"],
//     ["ADD", "5"],
//     ["ADD", "2"],
//     ["EXISTS", "2"],
//     ["EXISTS", "5"],
//     ["EXISTS", "1"],
//     ["EXISTS", "4"],
//     ["EXISTS", "3"],
//.     ["REMOVE", "2"]
//     ["EXISTS", "0"]
// ]

function solution(queries) {
    console.log('queres', queries, queries[0])
    // const addQueries = queries.filter((query) => query[0] === "ADD").map((query) => query[1]);
    const addQueries = []
    console.log('addQueries', addQueries);
    const output = queries.map((query) => {
        
        if(query[0] === "GET_NEXT") {
            // const foundNext = addQueries.find(addQuery => addQuery > query[1]);
            
            const foundGreater = addQueries.filter(addQuery => Number(addQuery) > Number(query[1])).sort((a, b) => a - b);
            console.log('the current value', query[1]);
            console.log('queries', addQueries);
            console.log('foundGreater --->', foundGreater)

            if(foundGreater.length > 0){
                return foundGreater[0]
            } else { 
                return ""
            }
        }
        
        if(query[0] === "REMOVE") {
            if(addQueries.find(addQuery => addQuery === query[1])){
                addQueries.splice(addQueries.indexOf(query[1]), 1)
                return "true"
            } else {
                return "false"
            }
        }    
        
        if(query[0] === "ADD") {
            addQueries.push(query[1])
            return ""
        }
        if(query[0] === "EXISTS") {
            if(addQueries.find(addQuery => addQuery === query[1])){
                return "true"
            } else {
                return "false"
            }
        }
    })
    console.log('output ===>', output)
    return output;
}

queries = [
    ["ADD", "1"],
    ["ADD", "2"],
    ["ADD", "2"],
    ["ADD", "4"],
    ["GET_NEXT", "1"],
    ["GET_NEXT", "2"],
    ["GET_NEXT", "3"],
    ["GET_NEXT", "4"],
    ["REMOVE", "2"],
    ["GET_NEXT", "1"],
    ["GET_NEXT", "2"],
    ["GET_NEXT", "3"],
    ["GET_NEXT", "4"]
]

// getNext returns closest number difference.AbortController.AbortController. 
// how do we make this 1/0 --->


