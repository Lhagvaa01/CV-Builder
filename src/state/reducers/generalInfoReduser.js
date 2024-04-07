const generalInfoReduser = (list=[], action) => {
    switch(action.type){
        case "ADD_GENERALINFO":
            return [ ...list, action.payload];
        case "EDIT_GENERALINFO":
            let newArr = [...list]
            newArr[action.payload.id] = action.payload;
            return newArr;
        case "REMOVE_GENERALINFO":
            let arr = [...list]
            arr.splice(action.payload, 1);
            return arr;
        default:
            return list;
    }
}
export default generalInfoReduser