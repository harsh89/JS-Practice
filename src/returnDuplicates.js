export default function returnDuplicates(query) {

    const res = [];
    const queryArr = query.split(' ');
    const strSet = new Set();

    for(let str of queryArr) {
        if(strSet.has(str)) {
            res.push(str);
        } else {
            strSet.add(str)
        }
    }

    return res;
}

