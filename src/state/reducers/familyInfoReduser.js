const familyInfoReduser = (list=[], action) => {
    switch(action.type){
        case "ADD_FAMILYINFO":
            return [ ...list, action.payload];
        case "EDIT_FAMILYINFO":
            let newArr = [...list]
            newArr[action.payload.id] = action.payload;
            return newArr;
        case "REMOVE_FAMILYINFO":
            let arr = [...list]
            arr.splice(action.payload, 1);
            return arr;
        default:
            return list;
    }
}
export default familyInfoReduser